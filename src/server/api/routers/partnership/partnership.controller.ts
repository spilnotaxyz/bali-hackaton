import { TRPCError } from "@trpc/server";
import {
  type CreatePartnershipInput,
  type GetPartnershipInput,
  type GetPartnershipsInput,
} from "~/server/api/routers/partnership/partnership.schema";
import {
  createPartnership,
  findAllPartnerships,
  findUniquePartnership,
} from "~/server/api/routers/partnership/partnership.service";

export const getPartnershipHandler = async ({ id }: GetPartnershipInput) => {
  const partnership = await findUniquePartnership({ where: { id } });

  if (!partnership) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Partnership with that ID not found",
    });
  }

  return partnership;
};

export const getPartnershipsHandler = async (input: GetPartnershipsInput) => {
  const cursor = input.cursor;
  const limit = input.limit ?? 10;

  const partnerships = await findAllPartnerships({
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      category: true,
      createdAt: true,
    },
  });

  let nextCursor: typeof cursor | undefined = undefined;

  if (partnerships.length > limit) {
    const nextPartnership = partnerships.pop();

    nextCursor = nextPartnership?.id;
  }
  return {
    nextCursor,
    partnerships,
  };
};

export const createPartnershipHandler = (input: CreatePartnershipInput) =>
  createPartnership({
    data: input,
    select: {
      title: true,
      category: true,
      createdAt: true,
    },
  });
