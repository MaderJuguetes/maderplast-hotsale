export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { email, firstName, lastName } = req.body;
    const payload = { email, firstName, lastName };
    const perfitRes = await fetch('https://api.myperfit.com/v2/maderplastmin/contacts?listId=4', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'maderplastmin-rsJ4S4p3S75IbDo782kxtzT9TWD7bEFl'
      },
      body: JSON.stringify(payload)
    });
    const data = await perfitRes.text();
    console.log('Perfit status:', perfitRes.status, 'body:', data);
    return res.status(perfitRes.status).send(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
