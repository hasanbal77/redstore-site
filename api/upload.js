import { put } from "@vercel/blob";

export const config = { runtime: "edge" };

export default async function handler(req) {
if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

try {
const formData = await req.formData();
const file =
formData.get("kimlikOn") ||
formData.get("kimlikArka") ||
formData.get("file") ||
formData.get("document");

if (!file) {
return new Response(JSON.stringify({ error: "Dosya yok (input name uyuşmuyor)" }), {
status: 400,
headers: { "Content-Type": "application/json" },
});
}

const blob = await put(file.name, file, { access: "public" });
return new Response(JSON.stringify({ url: blob.url }), {
status: 200,
headers: { "Content-Type": "application/json" },
});
} catch (e) {
return new Response(JSON.stringify({ error: e?.message || String(e) }), {
status: 500,
headers: { "Content-Type": "application/json" },
});
}
}
