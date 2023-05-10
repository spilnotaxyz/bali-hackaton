import { type GetServerSidePropsContext, type NextPage } from "next";

import { serverSideHelpers } from "utils/serverSideHelpers";

import { api } from "~/utils/api";

import PartnershipCard from "~/components/partnershipCard";

const Home: NextPage = () => {
  const { data, isLoading, fetchNextPage } =
    api.partnership.getPartnerships.useInfiniteQuery(
      { limit: 10 },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );
  
  const partnerships = data?.pages.flatMap((page) => page.partnerships) ?? [];

  return (
    <div className="2xl:container">
      <h2 className="my-8 text-white text-2xl self-start">
        Partnerships
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center mb-12">
        {
          partnerships.map((partnership) => (
            <PartnershipCard key={partnership.id} partnership={partnership} />
          ))
        }
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const helpers = serverSideHelpers({ req, res });
  await helpers.partnership.getPartnerships.prefetchInfinite({ limit: 10 });

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
};
