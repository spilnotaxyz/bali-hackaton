import { type Partnership } from ".prisma/client";
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
import SocialButtons from "~/components/socialButtons";
import CategoryImage from "~/components/categoryImages";

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
  console.log(partnership);
  return (
    <Card
      className={cn(
        "w-72 bg-gradient-to-b from-slate-900 to-slate-950 text-white",
        className
      )}
      {...props}
    >
      <CardHeader>
        <CategoryImage
          category={partnership.category}
          className="-m-6 mb-4 h-48 w-auto overflow-hidden rounded-t-md"
        />
        <CardTitle className="mb-4 hover:text-gray-200">
          <Link href={`partnerships/${partnership.id}`}>
            {partnership.title}
          </Link>
        </CardTitle>
        <CardDescription>
          <Badge variant={"secondary"}>{partnership.category}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm">{partnership.description}</p>
      </CardContent>
      {hasSocials && <Separator className="mx-6 w-auto bg-gray-500" />}
      <CardFooter className="py-3">
        <SocialButtons record={partnership} />
      </CardFooter>
    </Card>
  );
}
