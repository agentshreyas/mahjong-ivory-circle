const ANDROID_PACKAGE_NAME = "com.mahjongcircle.app";
const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_NAME}`;
const APP_STORE_URL = "https://apps.apple.com/in/app/mahjong-circle/id6790778933";

const DEEP_LINK_PATHS = new Set(["/event-detail", "/article"]);

const GET_APP_PATH = "/app";
const GET_APP_INTENT_PATH = "/";
const DESKTOP_FALLBACK_URL = "https://www.mahjongcircle.in/landing";

const BOT_PATTERN =
  /bot|crawler|spider|crawling|facebookexternalhit|WhatsApp|Slackbot|Twitterbot|Discordbot|TelegramBot|LinkedInBot|Embedly|Pinterest|SkypeUriPreview|Applebot|preview/i;

const ANDROID_PATTERN = /Android/i;
const IOS_PATTERN = /iPhone|iPad|iPod/i;

function buildIntentUrl(host: string, pathAndQuery: string): string {
  const fallback = encodeURIComponent(PLAY_STORE_URL);
  return `intent://${host}${pathAndQuery}#Intent;scheme=https;package=${ANDROID_PACKAGE_NAME};S.browser_fallback_url=${fallback};end`;
}

export function deepLinkRedirect(request: Request): Response | undefined {
  if (request.method !== "GET" && request.method !== "HEAD") return undefined;

  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const isGetApp = path === GET_APP_PATH;
  if (!isGetApp && !DEEP_LINK_PATHS.has(path)) return undefined;

  const userAgent = request.headers.get("user-agent") ?? "";
  if (BOT_PATTERN.test(userAgent)) return undefined;

  let location: string;
  if (ANDROID_PATTERN.test(userAgent)) {
    location = isGetApp
      ? buildIntentUrl(url.host, GET_APP_INTENT_PATH)
      : buildIntentUrl(url.host, `${url.pathname}${url.search}`);
  } else if (IOS_PATTERN.test(userAgent)) {
    location = APP_STORE_URL;
  } else if (isGetApp) {
    location = DESKTOP_FALLBACK_URL;
  } else return undefined;

  return new Response(null, {
    status: 302,
    headers: {
      location,
      "cache-control": "no-store",
      vary: "user-agent",
    },
  });
}
