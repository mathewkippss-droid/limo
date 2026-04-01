export default async function handler(req, res) {
  try {
    console.log("🔥 CALLBACK HIT");

    // Handle both parsed and raw body
    let body = req.body;

    if (!body) {
      body = await new Promise((resolve) => {
        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', () => resolve(JSON.parse(data || '{}')));
      });
    }

    console.log("📩 CALLBACK DATA:", JSON.stringify(body, null, 2));

    // ALWAYS respond fast
    return res.status(200).json({
      success: true,
      message: "Callback received"
    });

  } catch (error) {
    console.error("❌ CALLBACK ERROR:", error);

    // STILL return 200 to avoid retries
    return res.status(200).json({
      success: false
    });
  }
}
