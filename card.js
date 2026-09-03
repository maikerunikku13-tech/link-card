function escapeHtml(value) {
  return String(value || "").replace(/[&<>\"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  })[character]);
}

export default function handler(request, response) {
  const { title, description, target, image } = request.query;
  const safeTitle = escapeHtml(title || "Link Card");
  const safeDescription = escapeHtml(description || "");
  const safeTarget = escapeHtml(target || "https://example.com");
  const safeImage = escapeHtml(image || "");
  const pageUrl = `https://${request.headers.host}${request.url}`;
  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.status(200).send(`<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${safeTitle}</title>
<meta name="description" content="${safeDescription}">
<meta property="og:type" content="website">
<meta property="og:url" content="${escapeHtml(pageUrl)}">
<meta property="og:title" content="${safeTitle}">
<meta property="og:description" content="${safeDescription}">
<meta property="og:image" content="${safeImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${safeTitle}">
<meta name="twitter:description" content="${safeDescription}">
<meta name="twitter:image" content="${safeImage}">
<style>body{margin:0;padding:32px 16px;color:#20231f;background:#f3efe7;font-family:sans-serif}.card{max-width:640px;margin:auto;overflow:hidden;border:1px solid #d8d6cd;border-radius:8px;background:#fff}.card img{display:block;width:100%;max-height:420px;object-fit:cover}.copy{padding:20px}.copy h1{margin:0;font-size:24px}.copy p{color:#70756d;line-height:1.6}.copy a{color:#b84924}</style>
</head>
<body><article class="card">${safeImage ? `<img src="${safeImage}" alt="${safeTitle}">` : ""}<div class="copy"><h1>${safeTitle}</h1><p>${safeDescription}</p><a href="${safeTarget}">リンク先を開く</a></div></article></body>
</html>`);
}
