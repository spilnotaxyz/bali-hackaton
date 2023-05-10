import {
  createProposalHandler,
  deleteProposalHandler,
  getProposalsHandler,
  uptateProposalHandler,
} from "./proposal.controller";
import {
  createProposalSchema,
  deleteProposalSchema,
  getProposalsSchema,
  updateProposalSchema,
} from "./proposal.schema";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const proposalRouter = createTRPCRouter({
  getProposals: publicProcedure
    .input(getProposalsSchema)
    .query(({ input }) => getProposalsHandler(input)),
  createProposal: publicProcedure
    .input(createProposalSchema)
    .query(({ input }) => createProposalHandler(input)),
  updateProposal: publicProcedure
    .input(updateProposalSchema)
    .query(({ input }) => uptateProposalHandler(input)),
  deleteProposal: publicProcedure
    .input(deleteProposalSchema)
    .query(({ input }) => deleteProposalHandler(input)),
});
