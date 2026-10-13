/**
 * True in the static build bundled into the iOS and Android apps
 * (`pnpm build:mobile`). Inlined at build time, so web-only code behind
 * `!IS_MOBILE_APP` is dropped from the app bundle and vice versa.
 */
export const IS_MOBILE_APP = process.env.NEXT_PUBLIC_BUILD_TARGET === "mobile";

/** Light haptic tap on native platforms; does nothing on the web. */
export function hapticTap() {
  if (!IS_MOBILE_APP) return;
  import("@capacitor/haptics")
    .then(({ Haptics, ImpactStyle }) => Haptics.impact({ style: ImpactStyle.Light }))
    .catch(() => {});
}
