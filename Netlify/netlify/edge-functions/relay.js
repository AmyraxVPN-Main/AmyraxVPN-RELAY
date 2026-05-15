const HOP_BY_HOP = new Set([
  "host",
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "forwarded",
  "x-forwarded-host",
  "x-forwarded-proto",
  "x-forwarded-port",
]);

const FALLBACK_URL  = "https://amyrax125.github.io/NETLIFY/";
const NO_BODY_METHS = new Set(["GET", "HEAD"]);
const REAL_IP_HDRS  = ["x-real-ip", "x-forwarded-for"];
const NF_PREFIXES   = ["x-nf-", "x-netlify-"];

export default async function relay(request, _context) {
  try {
    const { pathname, search } = new URL(request.url);
    const xHost = request.headers.get("x-host");

    // ── Root path with no x-host → serve fallback page ──────────────────
    if (pathname === "/" && !xHost) {
      const upgrade = (request.headers.get("upgrade") ?? "").toLowerCase();
      if (upgrade !== "websocket") {
        const res  = await fetch(FALLBACK_URL);
        const html = await res.text();
        return new Response(html, {
          headers: { "content-type": "text/html; charset=UTF-8" },
        });
      }
    }

    // ── Require x-host ────────────────────────────────────────────────────
    if (!xHost) {
      return new Response("Error: x-host header is missing.", { status: 400 });
    }

    // ── Build upstream URL ────────────────────────────────────────────────
    let targetUrl;
    if (xHost.startsWith("http://") || xHost.startsWith("https://")) {
      targetUrl = xHost + pathname + search;
    } else {
      const useHttps =
        !xHost.includes(":") ||
        xHost.includes(":443") ||
        /^s\d+\./.test(xHost);
      targetUrl = (useHttps ? "https://" : "http://") + xHost + pathname + search;
    }

    // ── Filter & forward request headers ─────────────────────────────────
    const outHeaders = new Headers();
    let   clientIp   = null;

    for (const [name, value] of request.headers) {
      const lower = name.toLowerCase();
      if (HOP_BY_HOP.has(lower))                            continue;
      if (NF_PREFIXES.some((p) => lower.startsWith(p)))     continue;
      if (lower === "x-host")                                continue;
      if (lower === REAL_IP_HDRS[0]) { clientIp = value;    continue; }
      if (lower === REAL_IP_HDRS[1]) {
        if (!clientIp) clientIp = value;
        continue;
      }
      outHeaders.set(lower, value);
    }
    if (clientIp) outHeaders.set("x-forwarded-for", clientIp);

    // ── v1.0.2 FIX: buffer body to resolve xPaddingBytes / HTTP 000 ──────
    // Netlify Edge Functions (Deno) can drop the connection when a chunked
    // or padded XHTTP body is piped as a raw ReadableStream. Reading it into
    // an ArrayBuffer first guarantees the full payload reaches the upstream.
    const method  = request.method;
    const hasBody = !NO_BODY_METHS.has(method);
    const body    = hasBody && request.body
      ? await request.arrayBuffer()
      : null;

    // ── Fetch upstream ────────────────────────────────────────────────────
    const upstream = await fetch(targetUrl, {
      method,
      headers:  outHeaders,
      redirect: "manual",
      body,
    });

    // ── Build response headers (strip transfer-encoding) ──────────────────
    const resHeaders = new Headers();
    for (const [name, value] of upstream.headers) {
      if (name.toLowerCase() === "transfer-encoding") continue;
      resHeaders.set(name, value);
    }

    return new Response(upstream.body, {
      status:  upstream.status,
      headers: resHeaders,
    });

  } catch {
    return new Response("Bad Gateway: Relay Failed", { status: 502 });
  }
}
