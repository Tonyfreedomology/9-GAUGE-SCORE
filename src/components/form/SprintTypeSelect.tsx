import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SprintTypeSelectProps = {
  defaultValue?: string;
};

export const SprintTypeSelect = ({ defaultValue = "F40" }: SprintTypeSelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="sprintType">Sprint Type</Label>
      <Select name="sprintType" defaultValue={defaultValue} required>
        <SelectTrigger className="bg-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="H40">H40 - Health Sprint</SelectItem>
          <SelectItem value="F40">F40 - Financial Sprint</SelectItem>
          <SelectItem value="R40">R40 - Relationships Sprint</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};