import { forwardRef, useId } from "react";
import { type UseFormRegisterReturn } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

export type TextFieldProps = Omit<UseFormRegisterReturn<any>, "ref"> & {
  label: string;
  note?: string;
  error?: string;
  className?: string;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, note, className, ...rest }, ref) => {
    const id = useId();

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <Label htmlFor={id} className="text-xs text-slate-300">
          {label}
        </Label>
        <Input id={id} ref={ref} {...rest} />
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
        {note && <p className="mt-1 text-xs text-slate-300">{note}</p>}
      </div>
    );
  }
);

TextField.displayName = "TextField";
export default TextField;
