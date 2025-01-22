import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SprintSelectProps = {
  defaultSprint?: string;
  onChange: (value: string) => void;
};

export const SprintSelect = ({ defaultSprint, onChange }: SprintSelectProps) => {
  const getDefaultSprintValue = () => {
    switch (defaultSprint) {
      case "Health":
        return "H4025";
      case "Financial":
        return "F4025";
      case "Relationships":
        return "R4025";
      default:
        return undefined;
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="sprint" className="block text-sm font-medium text-gray-700">
        Choose Your Sprint
      </label>
      <Select defaultValue={getDefaultSprintValue()} onValueChange={onChange}>
        <SelectTrigger id="sprint" className="w-full">
          <SelectValue placeholder="Select a sprint" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="F4025">F40: Financial Sprint</SelectItem>
          <SelectItem value="H4025">H40: Health Sprint</SelectItem>
          <SelectItem value="R4025">R40: Relational Sprint</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};