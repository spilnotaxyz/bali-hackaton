import { type GetServerSidePropsContext } from "next";
import { type Proposal, type Partnership } from ".prisma/client";
import { useRouter } from "next/router";
import { serverSideHelpers } from "utils/serverSideHelpers";
import { api } from "~/utils/api";
import CategoryImage from "~/components/categoryImages";
import SocialButtons from "~/components/socialButtons";
import ProposalList from "~/components/proposalList";
import { formatDate, shortenAddress } from "~/utils/format";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import ProposalModal from "~/components/proposalModal";
import { buttonVariants } from "~/components/ui/button";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { cn } from "~/lib/utils";

function PartnershipDetails({ partnership }: { partnership: Partnership }) {
  return (
    <>
      <h3 className="text-3xl">{partnership?.title}</h3>
      <div className="my-5 flex max-w-2xl justify-between">
        <Trait name="Project" value={partnership?.projectName} />
        <Trait name="Category" value={partnership?.category} />
        <Trait name="Created" value={formatDate(partnership?.createdAt)} />
        <Trait name="Owner">
          <a
            href={`https://sepolia.etherscan.io/address/${partnership?.ownerAddress}`}
            target="_blank"
            className="text-md text-gray-200"
          >
            {shortenAddress(partnership?.ownerAddress)}
          </a>
        </Trait>
        <Trait name="Socials">
          <SocialButtons record={partnership} />
        </Trait>
      </div>
      <p className="text-sm">{partnership?.description}</p>
    </>
  );
}

function Trait({
  name,
  value,
  children,
}: {
  name: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mr-6 flex flex-col items-center justify-evenly">
      <span className="mb-2 text-xs uppercase text-gray-400">{name}</span>
      <span className="text-md text-center">{value || children}</span>
    </div>
  );
}

const PartnershipPage = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const router = useRouter();
  const { data: partnership, isLoading } =
    api.partnership.getPartnership.useQuery(
      { id: router.query.id as string },
      { enabled: !!router.query.id }
    );

  const { data: proposalsData, refetch: refetchProposals } =
    api.proposal.getProposals.useQuery(
      { partnershipId: router.query.id as string },
      { enabled: !!partnership }
    );

  const [isOpen, setIsOpen] = useState(false);
  const { isConnected } = useAccount();
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null
  );

  useEffect(() => {
    if (selectedProposal) setIsOpen(true);
  }, [selectedProposal]);

  if (isLoading) {
    return;
  } else if (!partnership) {
    void router.push("/404");
    return;
  }

  return (
    <div className="mx-4 mt-10 w-full max-w-6xl">
      <div className="flex flex-wrap justify-center">
        <CategoryImage
          category={partnership.category}
          className="mb-8 mr-6 h-60 basis-96 overflow-hidden rounded-lg"
        />
        <div className="mb-6 flex-1 px-6">
          <PartnershipDetails partnership={partnership} />
          <Dialog
            open={isOpen}
            onOpenChange={(isOpen) => {
              setIsOpen(isOpen);
              if (!isOpen) setSelectedProposal(null);
            }}
          >
            <DialogTrigger
              disabled={mounted && !isConnected}
              className={cn("mt-8", buttonVariants())}
            >
              Create Proposal
            </DialogTrigger>
            {mounted && !isConnected && (
              <p className="mt-2 font-bold text-red-400">
                You need to connect your wallet in order to use this
                functionality!
              </p>
            )}
            {isOpen && (
              <ProposalModal
                canEdit={!selectedProposal}
                proposal={selectedProposal}
                partnershipId={partnership.id}
                closeModal={() => {
                  setIsOpen(false);
                  setSelectedProposal(null);
                }}
                onCreate={async () => {
                  await refetchProposals();
                }}
              />
            )}
          </Dialog>
        </div>
      </div>
      <div className="my-5 basis-full">
        <h3 className="text-3xl">Proposals</h3>
        <ProposalList
          partnership={partnership}
          refetchProposals={async () => {
            await refetchProposals();
          }}
          proposals={proposalsData?.proposals || []}
        />
      </div>
    </div>
  );
};

export default PartnershipPage;

export const getServerSideProps = async ({
  req,
  res,
  params,
}: GetServerSidePropsContext<{ id: string }>) => {
  const id = params?.id as string;
  const helpers = serverSideHelpers({ req, res });
  await helpers.partnership.getPartnership.prefetch({ id });
  await helpers.proposal.getProposals.prefetch({ partnershipId: id });

  return {
    props: {
      id,
      trpcState: helpers.dehydrate(),
    },
  };
};
