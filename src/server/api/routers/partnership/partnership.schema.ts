import { Category } from "@prisma/client";
import { type TypeOf, number, object, string, union, literal } from "zod";

export const getPartnershipSchema = object({
  id: string().cuid(),
});

export const getPartnershipsSchema = object({
  limit: number().min(1).max(100).nullish(),
  cursor: string().cuid().nullish(),
});

export const createPartnershipSchema = object({
  signature: string(),
  ownerAddress: string(),
  title: string().max(200),
  description: string().max(2000),
  websiteURI: string().url(),
  twitterURI: string().url(),
  category: union([
    literal(Category.MARKETING),
    literal(Category.RESEARCH),
    literal(Category.AUDIT),
    literal(Category.ADVISOR),
    literal(Category.INVESTOR),
    literal(Category.COLLAB),
    literal(Category.PARTNERSHIPS),
    literal(Category.OTHER),
  ]),
});

export type GetPartnershipInput = TypeOf<typeof getPartnershipSchema>;
export type GetPartnershipsInput = TypeOf<typeof getPartnershipsSchema>;
export type CreatePartnershipInput = TypeOf<typeof createPartnershipSchema>;
