import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export type StartDatePickerProps = {
  selected?: Date;
  onSelect: (date?: Date) => void;
};

export const StartDatePicker = ({ selected, onSelect }: StartDatePickerProps) => {
  return (
    <div className="space-y-2">
      <Label>Start Date</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal bg-white",
              !selected && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? format(selected, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white" align="start">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={onSelect}
            className="bg-white"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};