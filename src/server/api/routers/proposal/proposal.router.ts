import {
  createProposalHandler,
  deleteProposalHandler,
  getProposalsHandler,
  uptateProposalHandler,
} from "~/server/api/routers/proposal/proposal.controller";
import {
  createProposalSchema,
  deleteProposalSchema,
  getProposalsSchema,
  updateProposalSchema,
} from "~/server/api/routers/proposal/proposal.schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const proposalRouter = createTRPCRouter({
  getProposals: publicProcedure
    .input(getProposalsSchema)
    .query(({ input }) => getProposalsHandler(input)),
  createProposal: publicProcedure
    .input(createProposalSchema)
    .mutation(({ input }) => createProposalHandler(input)),
  updateProposal: publicProcedure
    .input(updateProposalSchema)
    .mutation(({ input }) => uptateProposalHandler(input)),
  deleteProposal: publicProcedure
    .input(deleteProposalSchema)
    .mutation(({ input }) => deleteProposalHandler(input)),
});
