export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;

    const perfitRes = await fetch('https://api.myperfit.com/v2/maderplastmin/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'maderplastmin-rsJ4S4p3S75IbDo782kxtzT9TWD7bEFl'
      },
      body: JSON.stringify(body)
    });

    const data = await perfitRes.text();
    return res.status(perfitRes.status).send(data);

  } catch (err) {
    console.error('Perfit error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
