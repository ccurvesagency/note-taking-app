import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
const isProtected = createRouteMatcher(["/dashboard(.*)", "/lectures(.*)", "/api/lectures(.*)", "/api/uploads(.*)"]);
export default clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) await auth.protect();
});
export const config = { matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|woff2?|ico|ttf|webp|mp4|webm)).*)", "/(api|trpc)(.*)"] };
