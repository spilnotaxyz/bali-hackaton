import { Partnership } from "@bali/db";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { TwitterButton, WebButton } from "./socialButtons";

import { cn } from "~/lib/utils";

type PartnershipCardProps = React.HTMLAttributes<HTMLDivElement> & {
  partnership: Partnership;
};

export default function PartnershipCard({
  partnership,
  className,
  ...props
}: PartnershipCardProps) {
  const hasSocials = partnership.twitterURI || partnership.websiteURI;
  return (
    <Card
      className={cn(
        "w-72 bg-gradient-to-b from-slate-900 to-slate-950 text-white",
        className
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle className="mb-2 hover:text-gray-200">
          <Link href={`partnership/${partnership.id}`}>
            {partnership.title}
          </Link>
        </CardTitle>
        <CardDescription>
          <Badge variant="secondary">{partnership.category}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{partnership.description}</p>
      </CardContent>
      {hasSocials && <Separator className="mx-6 w-auto bg-gray-500" />}
      <CardFooter className="py-3">
        {partnership.twitterURI && (
          <TwitterButton uri={partnership.twitterURI} />
        )}
        {partnership.websiteURI && <WebButton uri={partnership.websiteURI} />}
      </CardFooter>
    </Card>
  );
}
