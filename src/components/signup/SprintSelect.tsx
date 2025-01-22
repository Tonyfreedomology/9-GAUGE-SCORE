import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SprintSelectProps = {
  defaultSprint?: string;
  onChange: (value: string) => void;
};

export const SprintSelect = ({ defaultSprint, onChange }: SprintSelectProps) => {
  const getDefaultSprintValue = () => {
    switch (defaultSprint) {
      case "Health":
        return "H40";
      case "Financial":
        return "F40";
      case "Relationships":
        return "R40";
      default:
        return undefined;
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="sprint" className="block text-sm font-medium text-white">
        Choose Your Sprint
      </label>
      <Select defaultValue={getDefaultSprintValue()} onValueChange={onChange}>
        <SelectTrigger id="sprint" className="bg-white/10 border-white/20 text-white">
          <SelectValue placeholder="Select a sprint" />
        </SelectTrigger>
        <SelectContent className="bg-white border-white/20">
          <SelectItem value="F40">Financial Freedom Sprint</SelectItem>
          <SelectItem value="H40">Health Transformation Sprint</SelectItem>
          <SelectItem value="R40">Relationship Mastery Sprint</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};