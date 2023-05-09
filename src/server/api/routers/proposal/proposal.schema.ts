import { type TypeOf, number, object, string, boolean } from "zod";

export const getProposalsSchema = object({
  partnershipId: string().cuid(),
  limit: number().min(1).max(100).nullish(),
  cursor: string().cuid().nullish(),
});

export const createProposalSchema = object({
  name: string().max(200),
  comment: string().max(2000),
  occupation: string().max(200),
  twitterURI: string().url(),
  websiteURI: string().url(),
  partnershipId: string().cuid(),
});

export const updateProposalSchema = createProposalSchema
  .omit({ partnershipId: true })
  .merge(object({ id: string().cuid(), accepted: boolean() }))
  .partial();

export const deleteProposalSchema = object({ id: string().cuid() });

export type GetProposalsInput = TypeOf<typeof getProposalsSchema>;
export type CreateProposalInput = TypeOf<typeof createProposalSchema>;
export type UpdateProposalInput = TypeOf<typeof updateProposalSchema>;
export type DeleteProposalInput = TypeOf<typeof deleteProposalSchema>;
