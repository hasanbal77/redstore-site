import { put } from '@vercel/blob';

export default async function handler(req) {

if (req.method !== 'POST') {
return new Response('Method not allowed', { status: 405 });
}

try {
const formData = await req.formData();
const file = formData.get("file");

if (!file) {
return new Response(JSON.stringify({ error: "Dosya yok" }), { status: 400 });
}

const blob = await put(file.name, file, {
access: 'public',
});

return new Response(JSON.stringify({
url: blob.url
}), {
headers: { "Content-Type": "application/json" }
});

} catch (err) {
return new Response(JSON.stringify({
error: err.message
}), { status: 500 });
}
}
