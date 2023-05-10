import { type Partnership, type Proposal } from ".prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import SocialButtons from "~/components/socialButtons";

import { formatDate } from "~/utils/format";
import {
  type Address,
  useAccount,
  useSignMessage,
  useWaitForTransaction,
} from "wagmi";
import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  usePartnershipSafeMint,
  usePreparePartnershipSafeMint,
} from "lib/wagmi.hooks";
import { api } from "~/utils/api";
import { uploadPartnershipToIPFS } from "lib/ipfs";

export default function ProposalList({
  proposals,
  partnership,
  refetchProposals,
}: {
  proposals: Proposal[];
  partnership: Partnership;
  refetchProposals: () => Promise<void>;
}) {
  if (proposals.length === 0) {
    return (
      <div className="text-md my-4 text-gray-200">No proposals so far</div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Occupation</TableHead>
          <TableHead>Comment</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Socials</TableHead>
          <TableHead>URI</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Decline</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {proposals.map((proposal) => (
          <ProposalRow
            key={proposal.id}
            partnership={partnership}
            proposal={proposal}
            refetchProposals={refetchProposals}
          />
        ))}
      </TableBody>
    </Table>
  );
}

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT as Address;

function ProposalRow({
  proposal,
  partnership,
  refetchProposals,
}: {
  proposal: Proposal;
  partnership: Partnership;
  refetchProposals: () => Promise<void>;
}) {
  const [mounted, setMounter] = useState(false);
  const { address: accountAddress } = useAccount();

  const signature = proposal.signature;
  const isPartnershipOwner = accountAddress === partnership.ownerAddress;
  const isProposalOwner = accountAddress === proposal.partnerAddress;

  useEffect(() => {
    setMounter(true);
  }, []);

  const { mutate: mutateProposal } = api.proposal.updateProposal.useMutation({
    onSuccess: async () => {
      await refetchProposals();
    },
  });

  const { mutate: deleteProposal } = api.proposal.deleteProposal.useMutation({
    onSuccess: async () => {
      await refetchProposals();
    },
  });

  const { signMessage } = useSignMessage({
    message:
      accountAddress &&
      ethers.utils.arrayify(
        ethers.utils.solidityKeccak256(
          ["address", "address"],
          [partnership.ownerAddress, proposal.partnerAddress]
        )
      ),
    onSuccess: (signature) => {
      mutateProposal({ id: proposal.id, signature });
    },
  });

  const [ipfsLink, setIpfsLink] = useState("");

  const { config } = usePreparePartnershipSafeMint({
    address: contractAddress,
    args: [
      partnership.ownerAddress as Address,
      proposal.partnerAddress as Address,
      signature as Address,
      "http://localhost:3000/partnerships/clhh170s90000smpcnwrzxgzv",
    ],
    enabled: !!signature && !!isProposalOwner && mounted,
  });

  const { write: mint, data: mintTsResponse } = usePartnershipSafeMint(config);

  const onMint = async () => {
    try {
      const link = await uploadPartnershipToIPFS(partnership, proposal);
      if (!link) throw Error("No link");

      setIpfsLink(link);
      mint?.();
    } catch (err) {
      console.log("Minting error:", err);
    }
  };

  useWaitForTransaction({
    hash: mintTsResponse?.hash,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSuccess: (...rest) => {
      console.log("minted", rest);
      mutateProposal({ id: proposal.id, ipfsURI: ipfsLink });
      setIpfsLink("");
    },
  });

  if (!mounted) return null;

  return (
    <TableRow>
      <TableCell>{proposal.name}</TableCell>
      <TableCell>{proposal.occupation}</TableCell>
      <TableCell>{proposal.comment}</TableCell>
      <TableCell className="w-32">{formatDate(proposal.createdAt)}</TableCell>
      <TableCell className="w-24">
        <SocialButtons record={proposal} />
      </TableCell>
      <TableCell>
        {proposal.ipfsURI ? (
          <a
            href={proposal.ipfsURI}
            target="_blank"
            className="rounded-full bg-gray-100 p-2 text-black"
          >
            link
          </a>
        ) : (
          "unknown"
        )}
      </TableCell>
      <TableCell>
        {isPartnershipOwner && (
          <Button
            variant="outline"
            disabled={!!signature}
            onClick={() => signMessage()}
          >
            {signature ? "Accepted" : "Accept"}
          </Button>
        )}
        {isProposalOwner && signature && (
          <Button
            variant="outline"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={onMint}
            disabled={!!proposal.ipfsURI}
          >
            {proposal.ipfsURI ? "Minted" : "Mint"}
          </Button>
        )}
      </TableCell>
      <TableCell>
        {isPartnershipOwner && !proposal.ipfsURI && (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          <Button
            variant="destructive"
            onClick={() => deleteProposal({ id: proposal.id })}
          >
            Delete
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
