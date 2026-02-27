import { put } from '@vercel/blob';

export default async function handler(req, res) {
if (req.method !== 'POST') {
return res.status(405).json({ error: 'Method not allowed' });
}

const file = req.body;

if (!file) {
return res.status(400).json({ error: 'No file uploaded' });
}

try {
const blob = await put(`kimlik-${Date.now()}.jpg`, file, {
access: 'public',
});

return res.status(200).json({ url: blob.url });

} catch (error) {
return res.status(500).json({ error: 'Upload failed' });
}
}
