import {
  createPartnershipHandler,
  getPartnershipHandler,
  getPartnershipsHandler,
} from "./partnership.controller";
import {
  createPartnershipSchema,
  getPartnershipSchema,
  getPartnershipsSchema,
} from "./partnership.schema";

import { createTRPCRouter, publicProcedure } from "../../trpc";

export const partnershipRouter = createTRPCRouter({
  getPartnerShip: publicProcedure
    .input(getPartnershipSchema)
    .query(({ input }) => getPartnershipHandler(input)),
  getPartnerships: publicProcedure
    .input(getPartnershipsSchema)
    .query(({ input }) => getPartnershipsHandler(input)),
  createPartnerShip: publicProcedure
    .input(createPartnershipSchema)
    .query(({ input }) => createPartnershipHandler(input)),
});
