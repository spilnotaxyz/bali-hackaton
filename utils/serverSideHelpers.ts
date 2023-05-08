import { createServerSideHelpers } from "@trpc/react-query/server";
import { createTRPCContext } from "~/server/api/trpc";
import { appRouter } from "~/server/api/root";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import superjson from "superjson";

export const serverSideHelpers = ({
  req,
  res,
}: Pick<GetServerSidePropsContext, "req" | "res">) =>
  createServerSideHelpers({
    router: appRouter,
    ctx: createTRPCContext({
      req: req as NextApiRequest,
      res: res as NextApiResponse,
    }),
    transformer: superjson,
  });
