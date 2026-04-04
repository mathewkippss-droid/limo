import { payments } from "./store";

export default async function handler(req, res) {
  try {
    const payload = req.body;

    console.log("PAYHERO CALLBACK:", payload);

    const reference = payload.external_reference;
    const status = payload.status; 
    // e.g. SUCCESS / FAILED / CANCELLED

    if (payments[reference]) {
      payments[reference].status = status;
      payments[reference].updatedAt = Date.now();
    }

    return res.status(200).json({ received: true });

  } catch (error) {
    console.error("Callback error:", error);
    return res.status(500).json({ error: "Callback failed" });
  }
}
