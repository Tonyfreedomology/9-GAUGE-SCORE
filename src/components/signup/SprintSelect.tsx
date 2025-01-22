import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SprintSelectProps = {
  defaultSprint?: string;
  onChange: (value: string) => void;
};

export const SprintSelect = ({ defaultSprint, onChange }: SprintSelectProps) => {
  const getDefaultSprintValue = () => {
    if (!defaultSprint) return undefined;
    
    const validSprints = ["F40", "H40", "R40"];
    return validSprints.includes(defaultSprint) ? defaultSprint : undefined;
  };

  return (
    <div className="space-y-2">
      <label htmlFor="sprint" className="block text-sm font-medium text-white">
        Choose Your Sprint
      </label>
      <Select defaultValue={getDefaultSprintValue()} onValueChange={onChange}>
        <SelectTrigger id="sprint" className="bg-white/10 border-white/20 text-white rounded-lg">
          <SelectValue placeholder="Select a sprint" />
        </SelectTrigger>
        <SelectContent className="bg-[#293230] border-white/20">
          <SelectItem value="F40">Financial Freedom Sprint</SelectItem>
          <SelectItem value="H40">Health Transformation Sprint</SelectItem>
          <SelectItem value="R40">Relationship Mastery Sprint</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};