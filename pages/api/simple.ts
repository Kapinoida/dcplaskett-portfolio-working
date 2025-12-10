export default function handler(req, res) {
  console.log('Simple API Hit');
  res.status(200).json({ name: 'Simple API' });
}
