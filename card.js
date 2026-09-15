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
  :root {
    color-scheme: dark;
    --white: #fff;
    --soft: rgba(255,255,255,.82);
    --pink: #fe2c55;
  }

  * {
    box-sizing: border-box;
  }

  body {
    min-height: 100svh;
    margin: 0;
    overflow-x: hidden;
    color: var(--white);
    background: #090909;
    font-family: Arial, "Yu Gothic", sans-serif;
  }

  .stage {
    display: grid;
    min-height: 100svh;
    place-items: center;
  }

  .feed {
    position: relative;
    display: flex;
    width: min(100vw, 430px);
    height: min(100svh, 860px);
    overflow: hidden;
    background: #303030;
  }

  .feed::after {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    content: "";
    background:
      linear-gradient(
        180deg,
        rgba(0,0,0,.54),
        transparent 18%,
        transparent 63%,
        rgba(0,0,0,.78)
      );
  }

  .media {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: linear-gradient(140deg, #586269, #171717);
  }

  .empty-media {
    display: grid;
    place-items: center;
    padding: 32px;
    color: var(--soft);
    text-align: center;
  }

  .topbar,
  .side-actions,
  .post-copy,
  .progress,
  .tap-hint {
    position: absolute;
    z-index: 2;
  }

  .topbar {
    top: max(18px, env(safe-area-inset-top));
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 27px;
    padding: 13px 18px;
    font-size: 15px;
    font-weight: 800;
  }

  .topbar .live {
    position: absolute;
    left: 18px;
    font-size: 12px;
    letter-spacing: .06em;
  }

  .topbar .active {
    position: relative;
  }

  .topbar .active::after {
    position: absolute;
    right: 0;
    bottom: -10px;
    left: 0;
    height: 3px;
    border-radius: 2px;
    content: "";
    background: var(--white);
  }

  .side-actions {
    right: 12px;
    bottom: 94px;
    display: grid;
    gap: 19px;
    justify-items: center;
  }

  .action {
    display: grid;
    gap: 4px;
    justify-items: center;
    min-width: 50px;
    color: var(--white);
    font-size: 13px;
    font-weight: 800;
    text-shadow: 0 1px 4px #000;
  }

  .action .icon {
    display: grid;
    width: 46px;
    height: 46px;
    place-items: center;
    font-size: 34px;
    line-height: 1;
  }

  .action .count {
    font-size: 13px;
  }

  .profile {
    position: relative;
    width: 47px;
    height: 47px;
    margin-bottom: 7px;
    overflow: visible;
    border: 2px solid var(--white);
    border-radius: 50%;
    background: #555;
  }

  .profile img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  .profile::after {
    position: absolute;
    right: -5px;
    bottom: -10px;
    display: grid;
    width: 21px;
    height: 21px;
    place-items: center;
    border-radius: 50%;
    content: "+";
    color: #fff;
    background: var(--pink);
    font-size: 20px;
    line-height: 18px;
  }

  .post-copy {
    right: 78px;
    bottom: 26px;
    left: 18px;
    text-shadow: 0 1px 4px #000;
  }

  .post-copy h1 {
    margin: 0 0 9px;
    font-size: 18px;
    line-height: 1.3;
  }

  .post-copy p {
    display: -webkit-box;
    overflow: hidden;
    margin: 0;
    color: var(--soft);
    font-size: 14px;
    line-height: 1.45;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .music {
    margin-top: 11px;
    font-size: 13px;
    font-weight: 700;
  }

  .progress {
    right: 18px;
    bottom: 12px;
    left: 18px;
    height: 3px;
    border-radius: 3px;
    background: rgba(255,255,255,.42);
  }

  .progress::before {
    display: block;
    width: 23%;
    height: 100%;
    border-radius: inherit;
    content: "";
    background: var(--white);
  }

  .play {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    display: grid;
    width: 74px;
    height: 74px;
    place-items: center;
    border-radius: 50%;
    color: #fff;
    background: rgba(0,0,0,.46);
    transform: translate(-50%, -50%);
  }

  .play::before {
    margin-left: 5px;
    border-top: 13px solid transparent;
    border-bottom: 13px solid transparent;
    border-left: 20px solid #fff;
    content: "";
  }

  .tap-hint {
    top: 50%;
    left: 50%;
    padding-top: 53px;
    color: rgba(255,255,255,.84);
    font-size: 12px;
    transform: translate(-50%, 25px);
  }

  @media (min-width: 431px) {
    .feed {
      border-radius: 8px;
      box-shadow: 0 18px 60px rgba(0,0,0,.55);
    }
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
          : `<div class="media empty-media">リンク先を開くには画面をタップしてください</div>`
      }

      <div class="topbar">
        <span class="live">LIVE</span>
        <span>フォロー中</span>
        <span class="active">おすすめ</span>
      </div>

      <div class="play" aria-hidden="true"></div>
      <span class="tap-hint">タップしてリンクを開く</span>

      <aside class="side-actions" aria-hidden="true">
        <div class="profile">
          ${safeImage ? `<img src="${safeImage}" alt="">` : ""}
        </div>

        <div class="action">
          <span class="icon">♥</span>
          <span class="count">8,483</span>
        </div>

        <div class="action">
          <span class="icon">☁</span>
          <span class="count">1,494</span>
        </div>

        <div class="action">
          <span class="icon">▮</span>
          <span class="count">5,782</span>
        </div>

        <div class="action">
          <span class="icon">↗</span>
          <span class="count">1,093</span>
        </div>
      </aside>

      <div class="post-copy">
        <h1>@${safeTitle}</h1>
        <p>${safeDescription || "わかりやすい解説あります"}</p>
        <div class="music">♫ オリジナル音源</div>
      </div>

      <div class="progress" aria-hidden="true"></div>
    </a>
  </main>
</body>
</html>`);
}
