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
      <input
        type="email"
        id="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50"
        placeholder="Enter your email"
        required
      />
    </div>
  );
};