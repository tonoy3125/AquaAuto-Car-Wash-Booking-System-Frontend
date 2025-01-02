import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { IoIosGitCompare } from "react-icons/io";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { TUserPayload } from "@/types";

const Comparison = () => {
  //   const { selectedServices } = useAppSelector((state) => state.comparison);
  const [shake, setShake] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null; // Get current user's ID
  const userId = user?.id as string;

  // Get the services for the current user
  const selectedServices = useAppSelector(
    (state) => state.comparison.selectedServices[userId] || []
  );

  // Trigger shake animation when selectedServices changes
  //   useEffect(() => {
  //     if (selectedServices.length > 0) {
  //       setShake(true);
  //       // Reset shake state after animation completes
  //       const timer = setTimeout(() => setShake(false), 500); // match this to the CSS animation duration
  //       return () => clearTimeout(timer);
  //     }
  //   }, [selectedServices]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          id="compare"
          className={`relative border-[1px] w-[50px] h-[50px] rounded-full border-[#9c9cad] cursor-pointer ${
            shake ? "shake" : ""
          }`}
        >
          <IoIosGitCompare className="text-2xl" />
          <Badge className="text-white bg-primaryMat hover:bg-primaryMat text-[10px] py-[1px] px-[3px] w-fit h-fit top-[-7px] right-[5px] absolute">
            {selectedServices.length}
          </Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  w-full overflow-auto font-poppins">
        <DialogHeader>
          <DialogTitle>Compare your selected services</DialogTitle>
          <DialogDescription>
            Make a better decision for your car in best budget.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
          {!selectedServices.length ? (
            <div>Please select a service to compare</div>
          ) : (
            ""
          )}

          <div className="grid gap-4 p-4 rounded-lg">
            {selectedServices.map((service) => (
              <div
                key={service._id}
                className="grid gap-4 p-4 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h1 className="font-[700]">{service.name}</h1>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${service.price}</div>
                    <div className="text-sm text-muted-foreground">
                      {service.duration} Min
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  //   onClick={() => dispatch(removeServiceFromCompare(service.id))}
                >
                  Deleted
                </Button>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Link to={"/services"}>
              <Button>Go to service</Button>
            </Link>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Comparison;
