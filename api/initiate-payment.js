export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Parse body safely
    let body = req.body;
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const {
      phone_number,
      amount,
      loan_amount,
      id_number
    } = body;

    // Basic validation
    if (!phone_number || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing phone number or amount"
      });
    }

    // Format phone (ensure +254)
    let formattedPhone = phone_number;
    if (!formattedPhone.startsWith("254")) {
      formattedPhone = "254" + formattedPhone;
    }

    // 🔥 PAYHERO API CALL
    const payheroResponse = await fetch("https://backend.payhero.co.ke/api/v2/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.PAYHERO_API_KEY}`
      },
      body: JSON.stringify({
        phone_number: formattedPhone,
        amount: amount,
        external_reference: `FULIZA-${Date.now()}`,
        description: `Fuliza Boost Ksh ${loan_amount}`
      })
    });

    const data = await payheroResponse.json();

    // Log for debugging (check in Vercel logs)
    console.log("PayHero response:", data);

    // Handle PayHero response
    if (!payheroResponse.ok) {
      return res.status(500).json({
        success: false,
        message: data.message || "Payment initiation failed",
        raw: data
      });
    }

    // Return success to frontend
    return res.status(200).json({
      success: true,
      reference: data.reference || data.checkout_request_id,
      message: "STK push sent successfully",
      raw: data
    });

  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
