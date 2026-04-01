// /api/verify-payment.js

let payments = {}; // shared temporary store

export default function handler(req, res) {
  try {
    const { reference } = req.query;

    if (!reference) {
      return res.status(400).json({
        success: false,
        message: "Missing reference"
      });
    }

    const payment = payments[reference];

    if (!payment) {
      return res.json({
        success: true,
        status: "PENDING"
      });
    }

    return res.json({
      success: true,
      status: payment.status,
      message: payment.message
    });

  } catch (error) {
    console.error("VERIFY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}
