# Add Vercel Skew Protection to Qwik App ⚡️

add this to layout.tsx
```javascript
export const onRequest: RequestHandler = async (resEv) => {
  if (process.env.VERCEL_SKEW_PROTECTION_ENABLED) {
    // document request
    if (resEv.request.headers.has("Sec-Fetch-Dest")) {
      console.log("Sec-Fetch-Dest", resEv.headers.get("Sec-Fetch-Dest"));
      resEv.headers.set(
        "SET-COOKIE",
        `__vdpl=${process.env.VERCEL_DEPLOYMENT_ID}; Path=${resEv.basePathname || "/"}; SameSite=Strict; Secure; HttpOnly`
      );
    }
  }
};
```