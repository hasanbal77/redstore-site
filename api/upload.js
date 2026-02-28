import { put } from '@vercel/blob';

export default async function handler(req, res) {

if (req.method !== 'POST') {
return res.status(405).json({ error: 'Method not allowed' });
}

try {
const { filename, file } = req.body;

if (!filename || !file) {
return res.status(400).json({ error: 'Missing file data' });
}

const buffer = Buffer.from(file, 'base64');

const blob = await put(`kimlik/${filename}`, buffer, {
access: 'public',
contentType: 'application/pdf'
});

return res.status(200).json({ url: blob.url });

} catch (error) {
console.error(error);
return res.status(500).json({ error: 'Upload failed' });
}
}
