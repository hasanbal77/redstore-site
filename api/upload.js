import { put } from '@vercel/blob';

export default async function handler(req, res) {

if (req.method !== 'POST') {
return res.status(405).send('Method not allowed');
}

const file = req.body.file;

if (!file) {
return res.status(400).send('No file');
}

const buffer = Buffer.from(file, 'base64');

const blob = await put(`kimlik-${Date.now()}.jpg`, buffer, {
access: 'public',
contentType: 'image/jpeg'
});

return res.status(200).json({ url: blob.url });
}
