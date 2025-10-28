import { useParams } from "react-router";
import { useGetProductQuery } from "./productApi.js";
import {Chip, Typography } from "@material-tailwind/react";
import { baseUrl } from "../../app/appUrl.js";
import AddToCart from "../cart/AddToCart.jsx";
import { useSelector } from "react-redux";
import ProductReview from "./ProductReview.jsx";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export default function ProductDetail() {

  const { id } = useParams();
  const { user } = useSelector((state) => state.userSlice);
  const { isLoading, error, data } = useGetProductQuery(id);

  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1 className="text-red-500">{error?.data?.message}</h1>
  const product = data.data;
  return (
    // <div>
    //   <div className="grid grid-cols-[1fr_3fr] p-5 gap-6">
    //     <div>
    //       <img src={`${baseUrl}/${data.data.image}`} alt="" />
    //     </div>

    //     <div className="space-y-3">
    //       <Typography variant="h4">
    //         {data.data.title}
    //       </Typography>
    //       <div className="text-gray-700 space-y-3">
    //         <p>{data.data.description}</p>
    //         <p>Rs.{data.data.price}</p>
    //         <p>Brand: {data.data.brand}</p>
    //         {/* Half star support */}
    //         <Rating style={{ maxWidth: 120 }} readOnly value={data.data.rating} precision={0.5} transition="zoom"
    //           itemStyles={{
    //             itemShapes: RoundedStar, // or "thin", "rounded", "star"
    //             activeFillColor: "#facc15", // yellow-400
    //             inactiveFillColor: "#e5e7eb" // gray-200
    //           }} />
    //       </div>

    //       {data.data.stock <= 0 ? (
    //         <Typography color="red" className="py-0">
    //           Out of Stock
    //         </Typography>
    //       ) : (<AddToCart product={data.data} />)}

    //     </div>
    //   </div>
    //   {user && user.role === 'User' && <ProductReview user={user} id={id} />}
    // </div>

    <div className="max-w-6xl mx-auto p-5 space-y-10">
      {/* Product Card */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 bg-white shadow-lg rounded-xl p-6">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img 
            src={`${baseUrl}/${product.image}`} 
            alt={product.title} 
            className="rounded-lg object-cover max-h-[400px]"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between space-y-5">
          <div>
            <Typography variant="h3" className="font-bold">
              {product.title}
            </Typography>
            
            <div className="flex items-center mt-2 gap-2">
              <Rating 
                style={{ maxWidth: 120 }} 
                readOnly 
                value={product.rating} 
                precision={0.5}
                itemStyles={{
                  itemShapes: RoundedStar,
                  activeFillColor: "#facc15",
                  inactiveFillColor: "#e5e7eb"
                }} 
              />
              <span className="text-gray-500 text-sm">({product.rating})</span>
            </div>

            <Typography className="mt-4 text-gray-700">{product.description}</Typography>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xl font-semibold text-green-700">Rs. {product.price}</p>
            <Chip value={product.brand} color="blue" variant="ghost" className="w-fit" />
            
            {product.stock <= 0 ? (
              <Typography color="red" className="font-semibold">
                Out of Stock
              </Typography>
            ) : (
              <AddToCart product={product} />
            )}
          </div>
        </div>
      </div>

      {/* Reviews */}
      {user && user.role === "User" && (
        <div className="bg-white shadow-lg rounded-xl p-6">
          <ProductReview user={user} id={id} />
        </div>
      )}
    </div>
  );
}
