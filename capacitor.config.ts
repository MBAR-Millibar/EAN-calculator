import type { CapacitorConfig } from "@capacitor/cli";

// The app bundles the static export from `pnpm build:mobile` (out/). Unlike
// MBAR Quest there is no server.url: loading ean.millibar.io in a WebView
// would fail App Review guideline 4.2 and break offline use.
const config: CapacitorConfig = {
  appId: "io.millibar.nitrox",
  appName: "Millibar Nitrox",
  webDir: "out",
  plugins: {
    SplashScreen: {
      // Hidden from JS once React mounts (components/native-shell.tsx);
      // auto-hide is the fallback if the bundle fails to load.
      launchAutoHide: true,
      launchShowDuration: 3000,
      backgroundColor: "#0072a5",
      showSpinner: false,
    },
  },
  ios: {
    // The page handles the safe areas itself (viewport-fit=cover)
    contentInset: "never",
    preferredContentMode: "mobile",
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
