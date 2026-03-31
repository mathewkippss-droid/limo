export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { phone_number, amount, loan_amount, id_number } = req.body;

  try {
    // TODO: Call PayHero / M-Pesa API here

    // Fake response (for testing)
    return res.status(200).json({
      success: true,
      reference: 'REF_' + Date.now()
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Payment initiation failed'
    });
  }
}