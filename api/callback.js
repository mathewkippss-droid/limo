export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const data = req.body;

    console.log("🔔 PAYHERO CALLBACK RECEIVED:");
    console.log(JSON.stringify(data, null, 2));

    // Example: extract useful fields
    const {
      status,
      amount,
      phone_number,
      external_reference
    } = data;

    // You can store this in DB later
    console.log("STATUS:", status);
    console.log("AMOUNT:", amount);
    console.log("PHONE:", phone_number);
    console.log("REFERENCE:", external_reference);

    return res.status(200).json({
      success: true,
      message: "Callback received"
    });

  } catch (error) {
    console.error("Callback error:", error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
