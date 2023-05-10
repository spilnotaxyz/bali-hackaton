import { partnershipRouter } from "./routers/partnership/partnership.router";
import { proposalRouter } from "./routers/proposal/proposal.router";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  partnership: partnershipRouter,
  proposal: proposalRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
