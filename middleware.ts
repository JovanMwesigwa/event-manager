// pages/_middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Define public routes where authentication is not required
  publicRoutes: ["/", "/events/(.*)"],
});

export const config = {
  // Matcher to specify which paths the middleware should handle
  matcher: ["/api/(.*)", "/events", "/events/([a-zA-Z0-9-]+)"], // Adjust the regex as needed
};
