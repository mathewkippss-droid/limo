export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const { phone_number, amount } = body;

    console.log("Incoming request:", body);

    if (!phone_number || !amount) {
      return res.status(400).json({
        success: false,
        message: "Phone number and amount are required"
      });
    }

    // Ensure correct format: 2547XXXXXXXX
    let phone = phone_number.replace(/\D/g, "");
    if (phone.startsWith("0")) phone = "254" + phone.substring(1);
    if (!phone.startsWith("254")) phone = "254" + phone;

    console.log("Formatted phone:", phone);

    // 🔥 PAYHERO REQUEST
    const response = await fetch("https://backend.payhero.co.ke/api/v2/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.PAYHERO_API_KEY
      },
      body: JSON.stringify({
        phone_number: phone,
        amount: amount,
        external_reference: "TEST-" + Date.now(),
        description: "Test Payment"
      })
    });

    const data = await response.json();

    console.log("PayHero response:", data);

    return res.status(200).json({
      success: true,
      payhero: data
    });

  } catch (error) {
    console.error("ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
