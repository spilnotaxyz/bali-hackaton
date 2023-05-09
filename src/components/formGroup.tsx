import { type ReactNode, useId, type FC } from "react";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

export type FormGroupProps = {
  renderControl: (id: string) => ReactNode;
  label: string;
  note?: string;
  className?: string;
};

const FormGroup: FC<FormGroupProps> = ({
  renderControl,
  label,
  note,
  className,
}) => {
  const id = useId();

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id} className="text-xs text-slate-300">
        {label}
      </Label>
      {renderControl(id)}
      {note && <p className="mt-1 text-xs text-slate-300">{note}</p>}
    </div>
  );
};
export default FormGroup;
