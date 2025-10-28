import { Formik } from "formik";
import { useGetProductQuery, useReviewProductMutation } from "./productApi.js";
import { Avatar, Button, Card, CardBody, Spinner, Textarea, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import * as Yup from 'yup';

export const valSchema = Yup.object({
  comment: Yup.string().min(3).max(15).required()
});

export default function ProductReview({ id, user }) {
  const { isLoading, error, data } = useGetProductQuery(id);
  const [reviewProduct, { isLoading: reviewLoading }] = useReviewProductMutation();
  return (

    <div className="p-6 grid lg:grid-cols-2 gap-10 items-start">
      {/* Review Form */}
      <Card className="shadow-xl rounded-2xl border border-gray-200 hover:shadow-2xl transition duration-300">
        <CardBody>
          <Typography variant="h5" className="mb-6 font-bold text-gray-800">
            Add a Review
          </Typography>

          <Formik
            initialValues={{ rating: 0, comment: "" }}
            onSubmit={async (val, { resetForm }) => {
              try {
                await reviewProduct({
                  data: { ...val, rating: Number(val.rating) },
                  token: user.token,
                  id,
                }).unwrap();
                toast.success("Review added successfully");
                resetForm();
              } catch (err) {
                toast.error(err.data?.message || "Something went wrong");
              }
            }}

            validationSchema={valSchema}
          >
            {({ handleSubmit, handleChange, values, setFieldValue, errors, touched }) => (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Clickable Star Rating */}
                <div className="flex items-center gap-3">
                  <Typography variant="small" className="font-medium">
                    Rate this product:
                  </Typography>
                  <Rating
                    style={{ maxWidth: 150 }}
                    value={(values.rating)}
                    onChange={(val) => setFieldValue("rating", val)}
                    max={5}
                    itemStyles={{
                      itemShapes: RoundedStar, // also "thin", "star"
                      activeFillColor: "#facc15", // amber-400
                      inactiveFillColor: "#e5e7eb" // gray-200
                    }}
                    className="cursor-pointer"
                  />
                </div>

                {/* Comment */}
                <Textarea
                  value={values.comment}
                  onChange={handleChange}
                  name="comment"
                  label="Write your review..."
                  className="min-h-[120px] bg-gray-50"
                />
                {errors.comment && touched.comment && <h1 className="text-pink-500 pl-1">{errors.comment}</h1> }

                {/* Submit */}
                <Button
                  type="submit"
                  fullWidth
                  disabled={reviewLoading || values.rating === 0}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  {reviewLoading ? <Spinner className="h-5 w-5" /> : "Submit Review"}
                </Button>
              </form>
            )}
          </Formik>
        </CardBody>
      </Card>

      {/* Reviews List */}
      <div className="space-y-6">
        <Typography variant="h5" className="font-bold text-gray-800">
          Customer Reviews
        </Typography>

        {isLoading && <p className="text-gray-500">Loading reviews...</p>}
        {error && <p className="text-red-500">Failed to load reviews</p>}

        {data?.data?.reviews?.length > 0 ? (
          data.data.reviews.map((review) => (
            <Card
              key={review._id}
              className="p-4 shadow-sm border border-gray-200 rounded-2xl hover:shadow-md transition duration-200"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar
                      src="https://i.pravatar.cc/150?img=12"
                      alt="User"
                      size="xs"
                    />
                    <Typography variant="small" className="font-semibold text-gray-800">
                      {review.user?.username || "Anonymous"}
                    </Typography>
                  </div>
                  {/* Half star support */}
                  <Rating style={{ maxWidth: 60 }} readOnly value={data.data.rating} precision={0.5} transition="zoom"
                    itemStyles={{
                      itemShapes: RoundedStar, // or "thin", "rounded", "star"
                      activeFillColor: "#facc15", // yellow-400
                      inactiveFillColor: "#e5e7eb" // gray-200
                    }} />
                </div>
                <Typography variant="small" className="text-gray-700">
                  {review.comment}
                </Typography>
              </div>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
              alt="No reviews"
              className="w-24 h-24 opacity-50"
            />
            <p className="text-gray-500 font-medium">No reviews yet. Be the first to review this product!</p>
          </div>
        )}
      </div>
    </div>
  )
}
