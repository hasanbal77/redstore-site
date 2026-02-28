import { put } from "@vercel/blob";

// Edge runtime: request.formData() çalışır, multipart parsing derdi biter
export const config = {
runtime: "edge",
};

export default async function handler(req) {
try {
if (req.method !== "POST") {
return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), {
status: 405,
headers: { "Content-Type": "application/json" },
});
}

const form = await req.formData();
const file = form.get("file");

if (!file || typeof file === "string") {
return new Response(JSON.stringify({ ok: false, error: 'No file found (field name must be "file")' }), {
status: 400,
headers: { "Content-Type": "application/json" },
});
}

// Dosya boyutu limiti (10MB)
if (file.size > 10 * 1024 * 1024) {
return new Response(JSON.stringify({ ok: false, error: "File too large (max 10MB)" }), {
status: 413,
headers: { "Content-Type": "application/json" },
});
}

const filename = file.name || `upload-${Date.now()}`;
const arrayBuffer = await file.arrayBuffer();

const blob = await put(`kimlik/${Date.now()}-${filename}`, arrayBuffer, {
access: "public",
contentType: file.type || "application/octet-stream",
});

return new Response(JSON.stringify({ ok: true, url: blob.url }), {
status: 200,
headers: { "Content-Type": "application/json" },
});
} catch (e) {
return new Response(JSON.stringify({ ok: false, error: String(e?.message || e) }), {
status: 500,
headers: { "Content-Type": "application/json" },
});
}
}
