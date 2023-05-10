import { Megaphone, Microscope, Search, User2, Landmark, Users, Boxes, Bitcoin } from "lucide-react";
import { type Category } from "@prisma/client";
import { cn } from "~/lib/utils";

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

const colors = {
  MARKETING: 'from-amber-500 to-amber-600',
  RESEARCH: 'from-lime-500 to-lime-600',
  AUDIT: 'from-orange-500 to-orange-600',
  ADVISOR: 'from-emerald-500 to-emerald-600',
  INVESTOR: 'from-sky-500 to-sky-600',
  COLLAB: 'from-yellow-500 to-yellow-600',
  PARTNERSHIPS: 'from-indigo-500 to-indigo-600',
  OTHER: 'from-fuchsia-500 to-fuchsia-600',
}

export default function CategoryImage({ category, className }: { category: Category, className?: string }) {
  const Element = images[category];
  const gradient = colors[category];
  return (
    <div className={cn(
      "w-full h-full flex items-center justify-center bg-gradient-to-r ",
      gradient,
      className
    )}>
      <Element size={96} className="text-slate-800" />
    </div>
  );
}