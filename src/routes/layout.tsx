import { component$, h, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async (resEv) => {
  // const headers: any = [];
  // resEv.request.headers.forEach((value, key) => {
  //   headers.push({ key, value });
  // });
  // console.log("resEv.headers", headers);
  // console.log(
  //   "process.env.VERCEL_SKEW_PROTECTION_ENABLED",
  //   process.env.VERCEL_SKEW_PROTECTION_ENABLED
  // );
  // console.log(
  //   "process.env.VERCEL_DEPLOYMENT_ID",
  //   process.env.VERCEL_DEPLOYMENT_ID
  // );
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
    if (resEv.request.headers.has("Sec-Fetch-Dest")) {
      console.log("Sec-Fetch-Dest", resEv.headers.get("Sec-Fetch-Dest"));
      resEv.headers.set(
        "SET-COOKIE",
        `__vdpl=${process.env.VERCEL_DEPLOYMENT_ID}; Path=${resEv.basePathname || "/"}; SameSite=Strict; Secure; HttpOnly`
      );
    }
  }
};

export default component$(() => {
  return <Slot />;
});
