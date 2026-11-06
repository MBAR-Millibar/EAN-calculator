// BUILD_TARGET=mobile produces a static export in out/ that Capacitor bundles
// into the iOS and Android apps (see capacitor.config.ts).
import { readFileSync } from "node:fs"

const isMobile = process.env.BUILD_TARGET === "mobile"
const { version } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The app only needs the pages (.tsx). Dropping .ts routes keeps the
  // server-only API handlers (app/api, WEB-33) and the sitemap out of the
  // static export: the app calls lib/ean-calculations.ts directly.
  // "jsx" is a placeholder (there are none): Next.js 15.5 fails to resolve
  // app pages when pageExtensions has a single entry.
  ...(isMobile && { output: "export", pageExtensions: ["tsx", "jsx"] }),
  env: {
    NEXT_PUBLIC_BUILD_TARGET: isMobile ? "mobile" : "web",
    NEXT_PUBLIC_APP_VERSION: version,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
