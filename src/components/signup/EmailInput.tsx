import { Input } from "@/components/ui/input";

type EmailInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const EmailInput = ({ value, onChange }: EmailInputProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="email" className="block text-sm font-medium text-white">
        Email
      </label>
      <Input
        type="email"
        id="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
        placeholder="Enter your email"
        required
      />
    </div>
  );
};