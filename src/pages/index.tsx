import { type GetServerSidePropsContext, type NextPage } from "next";
import { serverSideHelpers } from "utils/serverSideHelpers";
import { api } from "~/utils/api";
import PartnershipCard from "~/components/partnershipCard";

const Home: NextPage = () => {
  const { data } =
    api.partnership.getPartnerships.useInfiniteQuery(
      { limit: 10 },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  const partnerships = data?.pages.flatMap((page) => page.partnerships) ?? [];

  return (
    <div className="2xl:container">
      <h2 className="my-8 self-start text-2xl text-white">Partnerships</h2>

      <div className="mb-12 grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {partnerships.map((partnership) => (
          <PartnershipCard key={partnership.id} partnership={partnership} />
        ))}
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
