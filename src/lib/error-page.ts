export function renderErrorPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>This page didn't load — Mahjong Circle</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #f8f6f1;
      color: #1a1a1a;
    }
    .wrap { text-align: center; max-width: 480px; padding: 2rem; }
    h1 { font-size: 1.25rem; font-weight: 500; margin: 0 0 0.5rem; }
    p { font-size: 0.875rem; color: #6b6b6b; margin: 0 0 1.5rem; }
    a { color: #db0011; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>This page didn't load</h1>
    <p>Something went wrong on our end. You can try <a href="/">going home</a>.</p>
  </div>
</body>
</html>`;
}
