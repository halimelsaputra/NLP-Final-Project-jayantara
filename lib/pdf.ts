// Helper untuk memuat pdf.js dengan konfigurasi worker CDN agar compatible dengan Next.js bundler
export async function loadPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  if (!pdfjs.GlobalWorkerOptions.workerSrc) {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version || "4.4.168"}/build/pdf.worker.min.mjs`;
  }
  return pdfjs;
}
