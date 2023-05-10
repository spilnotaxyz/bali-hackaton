import { useId } from "react";
import { Controller, type Control } from "react-hook-form";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";

export type SelectFieldProps = {
  name: string;
  control: Control<any>;
  options: { value: string; label: string }[];
  label: string;
  note?: string;
  error?: string;
  className?: string;
};

const SelectField = ({
  name,
  options,
  label,
  error,
  note,
  className,
  control,
}: SelectFieldProps) => {
  const id = useId();

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id} className="text-xs text-slate-300">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref, ...rest } }) => (
          <Select onValueChange={onChange} value={value as string} {...rest}>
            <SelectTrigger id={id}>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {options.map(({ value, label }) => (
                <SelectItem value={value} key={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      {note && <p className="mt-1 text-xs text-slate-300">{note}</p>}
    </div>
  );
};

export default SelectField;
