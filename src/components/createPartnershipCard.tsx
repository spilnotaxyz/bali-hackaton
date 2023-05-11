import { type FC } from "react";
import { Card, CardContent } from "./ui/card";
import { Plus } from "lucide-react";

const CreatePartnershipCard: FC = () => {
  return (
    <Card className="flex h-full w-72 items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <CardContent className="flex flex-col items-center p-0">
        <Plus className="h-24 w-24" />
        <span className="text-xl">
          Create
          <br /> Partnership
        </span>
      </CardContent>
    </Card>
  );
};
export default CreatePartnershipCard;
