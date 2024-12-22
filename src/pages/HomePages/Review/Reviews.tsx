import Spinner from "@/components/Spinner/Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
} from "@/redux/features/review/reviewApi";

import { useAppSelector } from "@/redux/hooks";
import { TUserPayload } from "@/types";
import { TReviewData } from "@/types/reviewData.type";
import { getRatingCounts } from "@/utils/getRatingCount";

import { formatDistanceToNow } from "date-fns";
import { Star } from "lucide-react";
import { FormEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { GoStar, GoStarFill } from "react-icons/go";
import { MdArrowRight } from "react-icons/md";
import Rating from "react-rating";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RatingBar = ({ data }: { data: TReviewData[] }) => {
  const review = getRatingCounts(data); // Returns an array of { rating, count }
  const totalReviews = data.length; // Total number of reviews in the data array

  // Function to determine the color based on the rating
  const getGradientByRating = (rating: number) => {
    switch (rating) {
      case 5:
        return "bg-gradient-to-r from-green-400 via-green-500 to-green-600"; // Vibrant green gradient
      case 4:
        return "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"; // Vibrant blue gradient
      case 3:
        return "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"; // Vibrant yellow gradient
      case 2:
        return "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"; // Vibrant orange gradient
      case 1:
        return "bg-gradient-to-r from-red-400 via-red-500 to-red-600"; // Vibrant red gradient
      default:
        return "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600"; // Default gray gradient
    }
  };

  return (
    <>
      {review.map(({ count, rating }) => (
        <div key={rating} className="flex items-center gap-2">
          <div className="w-8 text-sm font-medium">{rating}.0</div>
          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full ${getGradientByRating(rating)}`}
              style={{ width: `${(count / totalReviews) * 100}%` }}
            />
          </div>
          <div className="w-20 text-sm text-muted-foreground">
            {count} reviews
          </div>
        </div>
      ))}
    </>
  );
};

export const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${
          star <= rating ? "text-[#F62727] fill-[#F62727]" : "text-[#F62727]"
        }`}
      />
    ))}
  </div>
);

const Review = ({
  name,
  rating,
  date,
  review,
}: {
  name: string;
  rating: number;
  date: string;
  review: string;
}) => {
  const dateTime = formatDistanceToNow(new Date(date || "11-11-2020"), {
    addSuffix: true,
  });
  return (
    <div className="py-6 border-t border-border">
      <div className="flex items-center gap-4 mb-2">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`}
          />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-muted-foreground">{dateTime}</div>
        </div>
        <div className="ml-auto flex items-center">
          <StarRating rating={rating} />
          <span className="ml-2 font-semibold">{rating}.0</span>
        </div>
      </div>
      <p className="mb-4 ">{review}</p>
    </div>
  );
};

export default function Reviews() {
  const [review, setReview] = useState<number>(1);
  const { data: reviewData, isLoading } = useGetAllReviewsQuery({
    limit: 99999,
  });
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null; // Get current user's ID
  const userId = user?.id as string;
  // const token = useAppSelector(useCurrentToken);
  const { register, handleSubmit, reset } = useForm();

  const [createReview] = useCreateReviewMutation();

  const handleRating = (rate: number) => setReview(rate);
  const navigate = useNavigate();
  const onSubmit = async (data: FieldValues) => {
    if (!user) {
      return navigate("/login");
    }

    const toastId = toast.loading("Creating Review...");
    try {
      const reviewData = {
        userId: userId,
        rating: review,
        review: data?.review,
      };

      const res = await createReview({ reviewData }).unwrap();
      console.log(res);
      toast.success(res.message || "Review Created Successfully", {
        id: toastId,
        duration: 3000,
      });

      // Reset the form
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  const RatingJsx = Rating as any;

  const rating =
    reviewData?.data?.reduce((acc, cur) => acc + cur.rating, 0) || 0;
  const totalCount = reviewData?.data?.length || 1;

  const avgRating = (rating / totalCount).toFixed(2);

  const handleLoginRedirect = () => {
    navigate("/login", { state: { from: location.pathname } });
  };
  return (
    <div className="relative mx-2 sm:mx-3 semi-sm:mx-4 md:mx-5 lg:mx-0">
      {/* Overlay for unauthenticated users */}
      {!user && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <p className="mb-4 text-lg font-poppins">
              Please log in to write or view reviews.
            </p>
            <Button
              onClick={handleLoginRedirect}
              className="bg-primary text-white hover:bg-primary-dark font-poppins"
            >
              Login
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <Spinner name="Reviews" />
      ) : (
        <section
          className={`container mx-auto py-[40px] flex lg:flex-row flex-col gap-[20px] font-poppins ${
            !user ? "opacity-50 pointer-events-none" : ""
          }`}
          id="review"
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-8 mb-8">
                <h2 className="text-5xl font-bold">{avgRating}</h2>
                <div className="flex-1">
                  <RatingBar data={reviewData?.data || []} />
                </div>
              </div>

              {reviewData?.data?.slice(0, 2)?.map((review, i) => (
                <Review
                  key={i + "rev"}
                  name={review.userId?.name}
                  rating={review.rating}
                  date={review.createdAt}
                  review={review.review}
                />
              ))}
              <Link
                to={"/allReviews"}
                className="mt-4 mx-auto text-center hover:underline flex items-center justify-center gap-[5px]"
              >
                Read all reviews <MdArrowRight />
              </Link>
            </CardContent>
          </Card>
          <div className="bg-muted px-6 py-8 sm:px-10 sm:py-10 lg:w-[40%] w-full">
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <RatingJsx
                className="text-[30px]"
                emptySymbol={<GoStar className="text-[#F62727]" />}
                fullSymbol={<GoStarFill className="text-[#F62727]" />}
                onClick={handleRating}
              />
              <div>
                <div className="mb-2">
                  <Label htmlFor="feedback">Feedback:</Label>
                </div>
                <Textarea
                  placeholder="Share your thoughts and experiences..."
                  className="w-full rounded-lg border-2 border-muted focus:border-primary focus:ring-primary"
                  rows={4}
                  {...register("review", {
                    required: "review is Required",
                  })}
                />
              </div>
              <Button type="submit" className="mt-5">
                Submit Review
              </Button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
}
