import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePicker, TimePickerProps } from "antd";

const onChange: TimePickerProps["onChange"] = (time, timeString) => {
  console.log(time, timeString);
};

const CreateSlot = () => {
  const [date, setDate] = React.useState<Date>();
  return (
    <div className="mt-7 lg:mt-0 md:p-10" style={{ height: "100vh" }}>
      <h1 className="font-poppins font-bold text-2xl mb-5">Create Slot</h1>

      <form>
        <div className="flex items-start flex-col lg:flex-row  gap-5 font-poppins mb-16">
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col">
              <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                Service
              </h2>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
              Date
            </h2>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                <Select
                  onValueChange={(value) =>
                    setDate(addDays(new Date(), parseInt(value)))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="0">Today</SelectItem>
                    <SelectItem value="1">Tomorrow</SelectItem>
                    <SelectItem value="3">In 3 days</SelectItem>
                    <SelectItem value="7">In a week</SelectItem>
                  </SelectContent>
                </Select>
                <div className="rounded-md border">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex items-start flex-col lg:flex-row  gap-5 font-poppins">
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col">
              <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                Start Time
              </h2>
              <TimePicker format="hh:mm a" use12Hours onChange={onChange} />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col">
              <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                End Time
              </h2>
              <TimePicker format="hh:mm a" use12Hours onChange={onChange} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateSlot;
