import { Partnership } from "@prisma/client";
import Link from "next/link";
import { Twitter } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Badge } from '~/components/ui/badge';
import { Separator } from "~/components/ui/separator";

import { cn } from "~/lib/utils"

type PartnershipCardProps = React.HTMLAttributes<HTMLDivElement> & {
  partnership: Partnership;
}

function TwitterButton({ uri }: { uri: string }) {
  return (
    <a href={uri} target="_blank" className="rounded-full bg-gray-100 p-2 text-black">
      <Twitter size={16} />
    </a>
  );
}

export default function PartnershipCard({ partnership, className, ...props }: PartnershipCardProps) {
  return (
    <Card className={cn("w-72 bg-gradient-to-b from-slate-900 to-slate-950 text-white", className)} {...props}>
      <CardHeader>
        <CardTitle className="mb-2 hover:text-gray-200">
          <Link href={`partnership/${partnership.id}`}>{ partnership.title }</Link>
        </CardTitle>
        <CardDescription>
          <Badge variant="secondary">{ partnership.category }</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{ partnership.description }</p>
      </CardContent>
      <Separator className="mx-6 w-auto bg-gray-500" />
      <CardFooter className="py-3">
        { partnership.twitterURI && <TwitterButton uri={partnership.twitterURI} /> }
      </CardFooter>
    </Card>
  );
}
