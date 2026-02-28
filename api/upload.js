import { put } from "@vercel/blob";

export const config = {
api: {
bodyParser: false,
},
};

export default async function handler(req, res) {
try {
if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}

const filename = req.headers["x-vercel-filename"];

if (!filename) {
return res.status(400).json({ error: "No filename provided" });
}

const blob = await put(filename, req, {
access: "public",
});

return res.status(200).json({ url: blob.url });

} catch (err) {
console.error(err);
return res.status(500).json({ error: "Upload failed" });
}
}
