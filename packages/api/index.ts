import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";

import { type AppRouter } from "./src/root";

export { type AppRouter, appRouter } from "./src/root";
export { createTRPCContext } from "./src/trpc";

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export type {
  CategoryUpdate,
  GroupUpdate,
  POBGroupUpdates,
  POBUpdateCategory,
} from "./src/router/pobUpdate/pobUpdate.controller";
export type {
  Project,
  SocialLink,
  TeamMate,
  TeamMateWithSocialLinks,
} from "./src/router/project/project.controller";
