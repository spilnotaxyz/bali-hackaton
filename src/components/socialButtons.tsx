import { Partnership, Proposal } from "@prisma/client";
import { Twitter, Globe } from "lucide-react";

export function TwitterButton({ uri }: { uri: string }) {
  return (
    <a href={uri} target="_blank" className="rounded-full bg-gray-100 p-2 text-black">
      <Twitter size={16} />
    </a>
  );
}

export function WebButton({ uri }: { uri: string }) {
  return (
    <a href={uri} target="_blank" className="rounded-full bg-gray-100 p-2 text-black">
      <Globe size={16} />
    </a>
  );
}

export default function SocialButtons({ record }: { record: Partial<Partnership | Proposal>}) {
  return (
    <span className="inline-flex space-x-1">
      { record.twitterURI && <TwitterButton uri={record.twitterURI} /> }
      { record.websiteURI && <WebButton uri={record.websiteURI} /> }
    </span>
  );
}