import { payments } from "./store";

export default function handler(req, res) {
  const { reference } = req.query;

  if (!reference) {
    return res.status(400).json({
      success: false,
      message: "Missing reference"
    });
  }

  const payment = payments[reference];

  if (!payment) {
    return res.status(404).json({
      success: false,
      message: "Payment not found"
    });
  }

  return res.status(200).json({
    success: true,
    status: payment.status || "PENDING"
  });
}
