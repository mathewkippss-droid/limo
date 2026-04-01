// /api/callback.js

let payments = {}; // shared temporary store

export default async function handler(req, res) {
  try {
    console.log("🔥 CALLBACK HIT");

    let body = {};

    // Handle raw + JSON
    if (req.body && Object.keys(req.body).length > 0) {
      body = req.body;
    } else {
      body = await new Promise((resolve) => {
        let data = "";

        req.on("data", chunk => data += chunk);

        req.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            const params = new URLSearchParams(data);
            const obj = {};
            for (const [key, value] of params.entries()) {
              obj[key] = value;
            }
            resolve(obj);
          }
        });
      });
    }

    console.log("📩 CALLBACK DATA:", JSON.stringify(body, null, 2));

    const response = body.response || {};

    const reference = response.ExternalReference;

    if (reference) {
      payments[reference] = {
        status: response.Status === "Success" ? "COMPLETED" : "FAILED",
        message: response.ResultDesc || "Unknown result"
      };

      console.log("💾 SAVED:", payments[reference]);
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("❌ CALLBACK ERROR:", error);

    return res.status(200).json({ success: false });
  }
}
