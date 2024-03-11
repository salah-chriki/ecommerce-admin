import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/:path*"],
  // ignoredRoutes: ["/((?!api|trpc))(_next.*|.+.[w]+$)", "/"],
  // debug: true,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
