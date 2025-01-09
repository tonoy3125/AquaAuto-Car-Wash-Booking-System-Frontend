import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

import { format } from "date-fns";
import { useState } from "react";
import { useGetAllReviewsQuery } from "@/redux/features/review/reviewApi";
import { StarRating } from "@/pages/HomePages/Review/Reviews";
import { TMetaData } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const Testimonial = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  const { data: reviewData } = useGetAllReviewsQuery({
    page: currentPage,
    limit,
  });
  // console.log(reviewData);
  const metaData: TMetaData | undefined = reviewData?.meta;

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= (metaData?.totalPage || 1)) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="mx-2 sm:mx-3 semi-sm:mx-5 lg:mx-0">
      <div className="container mx-auto py-[30px] min-h-screen">
        <div className="mx-auto mt-[30px] flex flex-col gap-[12px]">
          {reviewData?.data?.map(
            ({ _id, review, rating, createdAt, userId }) => {
              const date = format(
                new Date(createdAt || "11--11-2024"),
                "MMM dd yyyy"
              );

              return (
                <Card className="py-[8px] w-full font-poppins" key={_id}>
                  <CardContent className="w-full">
                    <div className="flex justify-between items-start gap-[5px] w-full">
                      <div className="flex items-start justify-start gap-[10px]">
                        <Avatar className="h-12 w-12 border">
                          <AvatarImage
                            src="/placeholder-user.jpg"
                            alt="@shadcn"
                          />
                          <AvatarFallback>
                            {userId.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>{" "}
                        <div>
                          <p className="font-[700]">{userId?.name}</p>
                          <p className="font-medium text-[12px]">{date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                        <StarRating rating={rating} />
                      </div>
                    </div>

                    <p className="text-base mt-[15px]">{review}</p>
                  </CardContent>
                </Card>
              );
            }
          )}

          <div className="w-full flex items-center justify-start gap-[10px] mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`${
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }`}
                  />
                </PaginationItem>
                {Array.from(
                  { length: metaData?.totalPage || 1 },
                  (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === index + 1}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`${
                      currentPage === (metaData?.totalPage || 1)
                        ? "pointer-events-none opacity-50"
                        : ""
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
