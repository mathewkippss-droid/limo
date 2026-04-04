import { payments } from "./store";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    let body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { phone_number, amount } = body;

    if (!phone_number || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing phone or amount"
      });
    }

    let phone = phone_number.replace(/\D/g, "");
    if (phone.startsWith("0")) phone = "254" + phone.substring(1);

    const reference = "INV-" + Date.now();

    const AUTH_TOKEN = "QWpBeXNOMFpSWDZIalBBTVVXb206UkNmczh0UkN1RmRZTFdMdFBaaHU0UlkxQjVEODQ0ZWNqeHgzaml4WQ==";

    const response = await fetch("https://backend.payhero.co.ke/api/v2/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${AUTH_TOKEN}`
      },
      body: JSON.stringify({
        amount: amount,
        phone_number: phone,
        channel_id: 5284,
        provider: "m-pesa",
        external_reference: reference,
        customer_name: "Test User",
        callback_url: "https://fulizaincrease-iota.vercel.app/api/callback"
      })
    });

    const data = await response.json();

    // ✅ STORE PAYMENT (VERY IMPORTANT)
    payments[reference] = {
      status: "PENDING",
      amount,
      phone,
      createdAt: Date.now()
    };

    return res.status(200).json({
      success: true,
      reference: reference, // 👈 frontend needs THIS
      payhero: data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
