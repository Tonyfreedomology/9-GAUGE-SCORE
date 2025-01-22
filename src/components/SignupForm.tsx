import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const SignupForm = () => {
  const [date, setDate] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log({
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      sprintType: formData.get('sprintType'),
      startDate: date
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
      <h2 className="text-3xl font-serif font-bold text-center mb-8">
        Start your FREE 40-day challenge NOW!
      </h2>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" type="tel" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sprintType">Sprint Type</Label>
          <Select name="sprintType" required>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select your sprint" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="H40">H40 - Health Sprint</SelectItem>
              <SelectItem value="F40">F40 - Financial Sprint</SelectItem>
              <SelectItem value="R40">R40 - Relationships Sprint</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <div className="block w-full">
            <DatePicker
              id="startDate"
              selected={date}
              onChange={(date: Date) => setDate(date)}
              className="flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholderText="Pick a date"
              required
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-[#17BEBB] hover:bg-[#17BEBB]/90 text-white rounded-full"
        >
          Sign Up Now
        </Button>
      </form>
    </div>
  );
};