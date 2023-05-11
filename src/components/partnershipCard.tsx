import { type Partnership } from ".prisma/client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import SocialButtons from "~/components/socialButtons";
import CategoryImage from "~/components/categoryImages";

import { cn } from "~/lib/utils";
import { formatDate } from "~/utils/format";

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
    <Card className={cn("w-72 text-white", className)} {...props}>
      <CardHeader className="!pb-2">
        <CategoryImage
          category={partnership.category}
          className="-m-6 mb-4 h-48 w-auto overflow-hidden rounded-t-md"
        />
        <div className="flex items-start justify-between ">
          <p className="text-xs text-muted-foreground">
            {formatDate(partnership.createdAt)}
          </p>
          <Badge variant={"outline"}>{partnership.category}</Badge>
        </div>
        <CardTitle className="hover:text-gray-200">
          <Link href={`partnerships/${partnership.id}`}>
            {partnership.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {partnership.description}
        </p>
      </CardContent>
      {hasSocials && <Separator className="mx-6 w-auto bg-gray-500" />}
      <CardFooter className="py-3">
        <SocialButtons record={partnership} />
      </CardFooter>
    </Card>
  );
}
