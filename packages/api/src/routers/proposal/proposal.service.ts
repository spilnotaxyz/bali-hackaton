import { type Prisma } from "@bali/db";
import { prisma } from "@bali/db";

export const findAllProposals = (
  args: Pick<
    Prisma.ProposalFindManyArgs,
    "take" | "where" | "orderBy" | "cursor"
  >
) => prisma.proposal.findMany(args);

export const createProposal = (args: Prisma.ProposalCreateArgs) =>
  prisma.proposal.create(args);

export const updateProposal = (args: Prisma.ProposalUpdateArgs) =>
  prisma.proposal.update(args);

export const deleteProposal = (args: Prisma.ProposalDeleteArgs) =>
  prisma.proposal.delete(args);
