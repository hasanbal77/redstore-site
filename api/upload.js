export default async function handler(req, res) {
try {
if (req.method !== "POST") {
return res.status(405).json({ ok: false, error: "Method not allowed" });
}

const data = req.body;
// Burada ileride: mail gönderme / sheet / db yazma yapılır.
// Şimdilik sadece başarılı dönüyoruz.
return res.status(200).json({ ok: true, received: data });
} catch (e) {
return res.status(500).json({ ok: false, error: String(e?.message || e) });
}
}
