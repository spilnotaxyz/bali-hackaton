import { Megaphone, Microscope, Search, User2, Landmark, Users, Boxes, Bitcoin } from "lucide-react";
import { type Category } from "@prisma/client";
import { cn } from "~/lib/utils";

export default function CategoryImage({ category, className }: { category: Category, className?: string }) {
  const images = {
    MARKETING: Megaphone,
    RESEARCH: Microscope,
    AUDIT: Search,
    ADVISOR: User2,
    INVESTOR: Landmark,
    COLLAB: Users,
    PARTNERSHIPS: Boxes,
    OTHER: Bitcoin,
  };

  const Element = images[category];
  return (
    <div className={cn(
      "w-full h-full flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-600",
      className
    )}>
      <Element size={96} className="text-slate-800" />
    </div>
  );
}