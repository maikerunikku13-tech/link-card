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
  const { title, target, image } = request.query;

  const safeTitle = escapeHtml(title || "Link Card");
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
<meta property="og:type" content="website">
<meta property="og:url" content="${escapeHtml(pageUrl)}">
<meta property="og:title" content="${safeTitle}">
<meta property="og:image" content="${safeImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${safeTitle}">
<meta name="twitter:image" content="${safeImage}">

<style>
* {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  background: #000;
}

.stage {
  width: 100vw;
  height: 100svh;
}

.feed {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
}

.media {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.play {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: rgba(0, 0, 0, .55);
  transform: translate(-50%, -50%);
}

.play::after {
  position: absolute;
  top: 50%;
  left: 50%;
  border-top: 14px solid transparent;
  border-bottom: 14px solid transparent;
  border-left: 22px solid #fff;
  content: "";
  transform: translate(-35%, -50%);
}
</style>
</head>

<body>
<main class="stage">
<a
  class="feed"
  href="${safeTarget}"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="${safeTitle}を開く"
>
${
  safeImage
    ? `<img class="media" src="${safeImage}" alt="${safeTitle}">`
    : `<div class="media"></div>`
}
<span class="play" aria-hidden="true"></span>
</a>
</main>
</body>
</html>`);
}

