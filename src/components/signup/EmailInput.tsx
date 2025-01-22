type EmailInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const EmailInput = ({ value, onChange }: EmailInputProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        type="email"
        id="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500"
        placeholder="Enter your email"
        required
      />
    </div>
  );
};