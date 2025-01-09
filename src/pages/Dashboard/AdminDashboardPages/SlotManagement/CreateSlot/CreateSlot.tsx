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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetAllServicesQuery } from "@/redux/features/services/serviceApi";
import { useCreateSlotMutation } from "@/redux/features/slot/slotApi";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { Button, TimePicker } from "antd";

const CreateSlot = () => {
  const [date, setDate] = React.useState<Date | null>(null);
  const [selectedService, setSelectedService] = React.useState<string | null>(
    null
  );

  const token = useAppSelector(useCurrentToken);
  const queryParams = {};
  const { data: serviceData } = useGetAllServicesQuery(queryParams);
  const [createSlot] = useCreateSlotMutation();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm();

  const onSubmit = async (data: any) => {
    // console.log(data);
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    const formattedStartTime = data.startTime?.format("HH:mm");
    const formattedEndTime = data.endTime?.format("HH:mm");

    // Validate time range
    if (data.startTime && data.endTime && data.startTime >= data.endTime) {
      toast.error("End time must be later than start time.", {
        duration: 3000,
      });
      return;
    }

    const toastId = toast.loading("Creating Slot...");

    try {
      const slotData = {
        ...data,
        date: formattedDate,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        service: selectedService,
      };

      // console.log(slotData);

      const res = await createSlot({ token, slotData }).unwrap();
      console.log(res);
      toast.success(res.message || "Slot Created Successfully", {
        id: toastId,
        duration: 3000,
      });

      // Reset the form
      reset();
      setDate(null);
      setSelectedService(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  return (
    <div className="mt-7 lg:mt-0 md:p-10" style={{ height: "100vh" }}>
      <h1 className="font-poppins font-bold text-2xl mb-5">Create Slot</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-start flex-col lg:flex-row gap-5 font-poppins mt-10 mb-5 lg:mb-16">
          {/* Service Selection */}
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col">
              <h2 className="text-base font-medium text-[#4c4d4d] mb-3 font-poppins">
                Your Service
              </h2>
              <Select
                onValueChange={(value) => {
                  setSelectedService(value);
                  setValue("service", value, { shouldValidate: true });
                }}
              >
                <SelectTrigger
                  id="yourService"
                  className="pt-5 pb-5 border border-gray-400 outline-none focus:ring-0"
                >
                  <SelectValue
                    placeholder={
                      selectedService ? selectedService : "Select a Service"
                    }
                  />
                </SelectTrigger>
                <SelectContent position="popper">
                  {serviceData?.data?.map((service: any) => (
                    <SelectItem key={service._id} value={service._id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.service && (
                <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                  {String(errors.service.message)}
                </p>
              )}
            </div>
          </div>

          {/* Date Picker */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-base font-medium text-[#4c4d4d] mb-3 font-poppins">
              Date
            </h2>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className={cn(
                    "w-full justify-start text-left font-normal border border-gray-400 bg-white pt-5 pb-5",
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
                  <SelectTrigger className="outline-none focus:ring-0">
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
                  <Calendar
                    mode="single"
                    selected={date || undefined}
                    onSelect={(day) => setDate(day ?? null)}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Time Pickers */}
        <div className="flex items-start flex-col lg:flex-row gap-5 font-poppins">
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col">
              <h2 className="text-base font-medium text-[#4c4d4d] mb-3 font-poppins">
                Start Time
              </h2>
              <Controller
                name="startTime"
                control={control}
                rules={{ required: "Start time is required" }}
                render={({ field }) => (
                  <TimePicker
                    {...field}
                    style={{ paddingTop: "10px", paddingBottom: "10px" }}
                    format="hh:mm a"
                    use12Hours
                    className="border border-gray-400"
                  />
                )}
              />
              {errors.startTime && (
                <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                  {String(errors.startTime.message)}
                </p>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col">
              <h2 className="text-base font-medium text-[#4c4d4d] mb-3 font-poppins">
                End Time
              </h2>
              <Controller
                name="endTime"
                control={control}
                rules={{ required: "End time is required" }}
                render={({ field }) => (
                  <TimePicker
                    {...field}
                    style={{ paddingTop: "10px", paddingBottom: "10px" }}
                    format="hh:mm a"
                    use12Hours
                    className="border border-gray-400"
                  />
                )}
              />
              {errors.endTime && (
                <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                  {String(errors.endTime.message)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-5 lg:mt-16">
          <Button
            className="px-8 py-5 w-40 bg-[#43B9B2] font-poppins font-medium text-white rounded-md text-lg"
            htmlType="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateSlot;
