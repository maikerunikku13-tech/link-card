function escapeHtml(value) {
  return String(value || "").replace(/[&<>\"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
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
<style>
body {
  margin: 0;
  padding: 32px 16px;
  color: #20231f;
  background: #f3efe7;
  font-family: sans-serif;
}
.card {
  display: block;
  max-width: 640px;
  margin: auto;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  border: 1px solid #d8d6cd;
  border-radius: 8px;
  background: #fff;
}
.image-wrap {
  position: relative;
}
.card img {
  display: block;
  width: 100%;
  max-height: 420px;
  object-fit: cover;
}
.play {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 78px;
  height: 58px;
  border-radius: 50%;
  background: rgba(0, 0, 0, .62);
  transform: translate(-50%, -50%);
}
.play::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  border-top: 13px solid transparent;
  border-bottom: 13px solid transparent;
  border-left: 20px solid #fff;
  transform: translate(-38%, -50%);
}
.copy {
  padding: 20px;
}
.copy h1 {
  margin: 0;
  font-size: 24px;
}
.copy p {
  color: #70756d;
  line-height: 1.6;
}
</style>
</head>
<body>
<a class="card"
   href="${safeTarget}"
   target="_blank"
   rel="noopener noreferrer"
   aria-label="${safeTitle}を開く">
  ${safeImage ? `<div class="image-wrap"><img src="${safeImage}" alt="${safeTitle}"><span class="play" aria-hidden="true"></span></div>` : ""}
  <div class="copy">
    <h1>${safeTitle}</h1>
    <p>${safeDescription}</p>
  </div>
</a>
</body>
</html>`);
}
