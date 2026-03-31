export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const {
      phone_number,
      amount
    } = req.body;

    if (!phone_number || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const response = await fetch("https://backend.payhero.co.ke/api/v2/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${process.env.PAYHERO_AUTH_TOKEN}`
      },
      body: JSON.stringify({
        amount: amount,
        phone_number: phone_number,
        channel_id: 4356,
        provider: "m-pesa",
        external_reference: "INV-" + Date.now(),
        customer_name: "Test User",
        callback_url: "https://fulizaincrease-iota.vercel.app/api/callback"
      })
    });

    const data = await response.json();

    return res.status(200).json({
      success: true,
      payhero: data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
