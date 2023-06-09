import { type Prisma } from ".prisma/client";
import { prisma } from "~/server/db";

export const findUniquePartnership = (
  args: Pick<Prisma.PartnershipFindUniqueArgs, "where">
) => prisma.partnership.findUnique(args);

export const findAllPartnerships = (
  args: Pick<
    Prisma.PartnershipFindManyArgs,
    "take" | "where" | "orderBy" | "cursor" | "select"
  >
) => prisma.partnership.findMany(args);

export const createPartnership = (input: Prisma.PartnershipCreateArgs) =>
  prisma.partnership.create(input);
