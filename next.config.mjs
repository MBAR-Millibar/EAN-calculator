// BUILD_TARGET=mobile produces a static export in out/ that Capacitor bundles
// into the iOS and Android apps (see capacitor.config.ts).
import { readFileSync } from "node:fs"

const isMobile = process.env.BUILD_TARGET === "mobile"
const { version } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"))

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isMobile && { output: "export" }),
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
