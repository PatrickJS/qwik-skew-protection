# Add Vercel Skew Protection to Qwik App ⚡️

add this to layout.tsx
```javascript
export const onRequest: RequestHandler = async (resEv) => {
  if (process.env.VERCEL_SKEW_PROTECTION_ENABLED) {
    resEv.headers.set(
      "SET-COOKIE",
      `__vdpl=${process.env.VERCEL_DEPLOYMENT_ID}; Path=${resEv.basePathname || "/"}; SameSite=Strict; Secure; HttpOnly`
    );
  }
};
```