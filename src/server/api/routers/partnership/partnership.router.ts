import {
  createPartnershipHandler,
  getPartnershipHandler,
  getPartnershipsHandler,
} from "~/server/api/routers/partnership/partnership.controller";
import {
  createPartnershipSchema,
  getPartnershipSchema,
  getPartnershipsSchema,
} from "~/server/api/routers/partnership/partnership.schema";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const partnershipRouter = createTRPCRouter({
  getPartnership: publicProcedure
    .input(getPartnershipSchema)
    .query(({ input }) => getPartnershipHandler(input)),
  getPartnerships: publicProcedure
    .input(getPartnershipsSchema)
    .query(({ input }) => getPartnershipsHandler(input)),
  createPartnership: publicProcedure
    .input(createPartnershipSchema)
    .mutation(({ input }) => createPartnershipHandler(input)),
});
