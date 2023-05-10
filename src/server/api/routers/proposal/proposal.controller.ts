import {
  type UpdateProposalInput,
  type CreateProposalInput,
  type GetProposalsInput,
  type DeleteProposalInput,
} from "~/server/api/routers/proposal/proposal.schema";
import {
  createProposal,
  deleteProposal,
  findAllProposals,
  updateProposal,
} from "~/server/api/routers/proposal/proposal.service";

export const getProposalsHandler = async (input: GetProposalsInput) => {
  const partnershipId = input.partnershipId;
  const cursor = input.cursor;
  const limit = input.limit ?? 10;

  const proposals = await findAllProposals({
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
    where: {
      partnershipId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  let nextCursor: typeof cursor | undefined = undefined;

  if (proposals.length > limit) {
    const nextProposal = proposals.pop();

    nextCursor = nextProposal?.id;
  }
  return {
    nextCursor,
    proposals,
  };
};

export const createProposalHandler = async (input: CreateProposalInput) =>
  createProposal({
    data: input,
    select: {
      id: true,
      name: true,
      comment: true,
      signature: true,
      createdAt: true,
      occupation: true,
      twitterURI: true,
      partnerAddress: true,
    },
  });

export const uptateProposalHandler = ({ id, ...data }: UpdateProposalInput) =>
  updateProposal({
    where: { id },
    data: { ...data },
    select: {
      id: true,
      name: true,
      comment: true,
      signature: true,
      createdAt: true,
      occupation: true,
      twitterURI: true,
      partnerAddress: true,
    },
  });

export const deleteProposalHandler = ({ id }: DeleteProposalInput) =>
  deleteProposal({ where: { id } });
