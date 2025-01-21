import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormInputProps = {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
};

export const FormInput = ({ id, label, type = "text", required = false }: FormInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} type={type} required={required} />
    </div>
  );
};