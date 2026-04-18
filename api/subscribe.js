export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { email, firstName, lastName } = req.body;

    // Primero crear/actualizar contacto
    const contactRes = await fetch('https://api.myperfit.com/v2/maderplastmin/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'maderplastmin-rsJ4S4p3S75IbDo782kxtzT9TWD7bEFl'
      },
      body: JSON.stringify({ email, firstName, lastName })
    });
    const contactData = await contactRes.json();
    console.log('Contact:', contactRes.status, JSON.stringify(contactData));

    // Luego agregar a la lista 4
    const listRes = await fetch(`https://api.myperfit.com/v2/maderplastmin/lists/4/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'maderplastmin-rsJ4S4p3S75IbDo782kxtzT9TWD7bEFl'
      },
      body: JSON.stringify({ email })
    });
    const listData = await listRes.text();
    console.log('List:', listRes.status, listData);

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
