import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async (resEv) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  resEv.cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const onRequest: RequestHandler = async (resEv) => {
  if (process.env.VERCEL_SKEW_PROTECTION_ENABLED) {
    resEv.headers.set(
      "SET-COOKIE",
      `__vdpl=${process.env.VERCEL_DEPLOYMENT_ID}; Path=${resEv.basePathname || "/"}; SameSite=Strict; Secure; HttpOnly`
    );
  }
};

export default component$(() => {
  return <Slot />;
});
