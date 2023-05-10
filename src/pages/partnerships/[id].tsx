import { type GetServerSidePropsContext, type GetServerSideProps, type NextPage } from "next";
import { Proposal, type Partnership } from "@prisma/client";
import { useRouter } from "next/router";

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
import { cn } from '~/lib/utils'

function PartnershipDetails({ partnership }: { partnership: Partnership }) {
  return (
    <>
      <h3 className="text-3xl">{ partnership?.title }</h3>
      <div className="flex max-w-2xl justify-between my-5">
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
      <p className="text-sm">{ partnership?.description }</p>
    </>
  );
}

function Trait({ name, value, children }: { name: string, value?: string, children?: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-evenly items-center mr-6">
      <span className="text-xs mb-2 text-gray-400 uppercase">{ name }</span>
      <span className="text-md text-center">{ value || children }</span>
    </div>
  );
}

const PartnershipPage = () => {
  const router = useRouter();
  const { data: partnership, isLoading } = api.partnership.getPartnership.useQuery(
    { id: router.query.id as string },
    { enabled: !!router.query.id }
  );

  const proposals = api.proposal.getProposals.useQuery(
    { partnershipId: router.query.id as string },
    { enabled: !!partnership }
  ).data?.proposals ?? [];

  const [isOpen, setIsOpen] = useState(false);
  const { isConnected} = useAccount()
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  useEffect(() => {
    if (selectedProposal) setIsOpen(true);
  }, [selectedProposal])

  if (isLoading) {
    return;
  } else if (!partnership) {
    router.push('/404');
    return;
  }

  return (
    <div className="max-w-6xl w-full mt-10 mx-4">
      <div className="flex flex-wrap justify-center">
        <CategoryImage category={partnership.category} className="basis-96 h-60 mb-8 mr-6 rounded-lg overflow-hidden" />
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
              disabled={!isConnected}
              className={cn("mt-8", buttonVariants())}
            >
              Create Proposal
            </DialogTrigger>
            {!isConnected && (
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
                onCreate={(proposal) => proposals.push(proposal)}
              />
            )}
          </Dialog>
        </div>
      </div>
      <div className="basis-full my-5">
        <h3 className="text-3xl">Proposals</h3>
        <ProposalList proposals={proposals} />
      </div>
    </div>
  );
};

export default PartnershipPage;