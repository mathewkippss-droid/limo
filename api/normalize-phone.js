export default function handler(req, res) {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: 'Phone required' });
  }

  // Simple normalization
  let normalized = phone.replace(/\D/g, '');

  if (normalized.startsWith('0')) {
    normalized = '254' + normalized.slice(1);
  }

  if (!normalized.startsWith('254')) {
    normalized = '254' + normalized;
  }

  return res.status(200).json({
    normalized_phone: '+' + normalized
  });
}