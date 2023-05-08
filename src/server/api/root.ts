import { createTRPCRouter } from "~/server/api/trpc";
import { partnershipRouter } from "~/server/api/routers/partnership/partnership.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  partnership: partnershipRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
