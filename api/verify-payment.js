export default async function handler(req, res) {
  const { reference } = req.query;

  if (!reference) {
    return res.status(400).json({ message: 'Missing reference' });
  }

  try {
    // TODO: Check payment status from PayHero

    // Fake success (for testing)
    return res.status(200).json({
      success: true,
      status: 'COMPLETED'
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Verification failed'
    });
  }
}