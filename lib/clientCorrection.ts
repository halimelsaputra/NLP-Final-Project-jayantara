import type { CorrectionResponse } from "@/lib/types";

export const RULES: Array<[RegExp, string]> = [
  // Kata ganti & slang umum
  [/\bgw\b/gi, "saya"],
  [/\bgue\b/gi, "saya"],
  [/\baku\b/gi, "saya"],
  [/\bayk\b/gi, "saya"],
  [/\bsy\b/gi, "saya"],
  [/\blu\b/gi, "kamu"],
  [/\blo\b/gi, "kamu"],
  [/\belo\b/gi, "kamu"],
  [/\bkm\b/gi, "kamu"],
  [/\bkmu\b/gi, "kamu"],
  [/\bmrk\b/gi, "mereka"],

  // Partikel & kata hubung
  [/\byg\b/gi, "yang"],
  [/\bdgn\b/gi, "dengan"],
  [/\bdg\b/gi, "dengan"],
  [/\bkrn\b/gi, "karena"],
  [/\bkarna\b/gi, "karena"],
  [/\bklo\b/gi, "kalau"],
  [/\bkalo\b/gi, "kalau"],
  [/\btp\b/gi, "tetapi"],
  [/\btpi\b/gi, "tetapi"],
  [/\bjd\b/gi, "jadi"],
  [/\bjdi\b/gi, "jadi"],
  [/\btrus\b/gi, "terus"],
  [/\blg\b/gi, "lagi"],
  [/\blgi\b/gi, "lagi"],
  [/\bjg\b/gi, "juga"],
  [/\bjga\b/gi, "juga"],
  [/\butk\b/gi, "untuk"],
  [/\bbuat\b/gi, "untuk"],
  [/\bsdg\b/gi, "sedang"],
  [/\bsdng\b/gi, "sedang"],
  [/\bdr\b/gi, "dari"],
  [/\bttg\b/gi, "tentang"],

  // Kata depan / preposisi terpisah
  [/\bdikampus\b/gi, "di kampus"],
  [/\bdirumah\b/gi, "di rumah"],
  [/\bdisini\b/gi, "di sini"],
  [/\bdisana\b/gi, "di sana"],
  [/\bdimana\b/gi, "di mana"],
  [/\bkemana\b/gi, "ke mana"],
  [/\bdarimana\b/gi, "dari mana"],
  [/\bkesini\b/gi, "ke sini"],
  [/\bkesana\b/gi, "ke sana"],
  [/\bdiatas\b/gi, "di atas"],
  [/\bdibawah\b/gi, "di bawah"],

  // Kata kerja & keterangan informal
  [/\bnungguin\b/gi, "menunggu"],
  [/\bngeliat\b/gi, "melihat"],
  [/\bngasih\b/gi, "memberi"],
  [/\bngomong\b/gi, "berbicara"],
  [/\bngapain\b/gi, "sedang apa"],
  [/\bbikin\b/gi, "membuat"],
  [/\bgak\b/gi, "tidak"],
  [/\bnggak\b/gi, "tidak"],
  [/\benggak\b/gi, "tidak"],
  [/\btdk\b/gi, "tidak"],
  [/\bgaada\b/gi, "tidak ada"],
  [/\bgimana\b/gi, "bagaimana"],
  [/\bkenapa\b/gi, "mengapa"],
  [/\budah\b/gi, "sudah"],
  [/\bsdh\b/gi, "sudah"],
  [/\bblm\b/gi, "belum"],
  [/\bblom\b/gi, "belum"],
  [/\bbgt\b/gi, "sangat"],
  [/\bbngt\b/gi, "sangat"],
  [/\bbanget\b/gi, "sangat"],
  [/\bsmua\b/gi, "semua"],
  [/\bbener\b/gi, "benar"],
  [/\bcuman\b/gi, "hanya"],
  [/\bcuma\b/gi, "hanya"],
  [/\btau\b/gi, "tahu"],
  [/\bmakasih\b/gi, "terima kasih"],
  [/\bgpp\b/gi, "tidak apa-apa"],
  [/\botw\b/gi, "dalam perjalanan"],
];

export function correctClientText(text: string): CorrectionResponse {
  let out = text;
  for (const [re, rep] of RULES) {
    out = out.replace(re, rep);
  }

  // Kapitalisasi awal kalimat dan setelah titik / tanda tanya / seru
  out = out.replace(
    /(^\s*|[.!?]\s+)([a-z])/g,
    (_m, p1: string, p2: string) => p1 + p2.toUpperCase()
  );

  let confidence = 0.98;
  if (out !== text) {
    const changes = Math.abs(out.length - text.length) + 2;
    confidence = Math.max(0.72, Math.min(0.96, 0.95 - changes / Math.max(text.length, 1)));
  }

  return {
    original: text,
    corrected: out,
    confidence: Math.round(confidence * 100) / 100,
  };
}
