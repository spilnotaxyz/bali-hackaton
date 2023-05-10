import { Proposal } from "@prisma/client";
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

export default function ProposalList({ proposals }: { proposals: Proposal[] }) {
  if (proposals.length === 0) {
    return (
      <div className="my-4 text-md text-gray-200">No proposals so far</div>
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {proposals.map((proposal) => <ProposalRow key={proposal.id} {...proposal} />)}
      </TableBody>
    </Table>
  );
}

function ProposalRow(proposal: Proposal) {
  return (
    <TableRow>
      <TableCell>{proposal.name}</TableCell>
      <TableCell>{proposal.occupation}</TableCell>
      <TableCell>{proposal.comment}</TableCell>
      <TableCell className="w-32">{formatDate(proposal.createdAt)}</TableCell>
      <TableCell className="w-24"><SocialButtons record={proposal} /></TableCell>
    </TableRow>
  );
}