
import { Carousel } from "@material-tailwind/react";
import { useGetTopProductsQuery } from "./productApi.js";
import { baseUrl } from "../../app/appUrl.js";


export default function TopProducts() {
  const { isLoading, error, data } = useGetTopProductsQuery();
  if (isLoading) return <h1 className="text-center text-gray-500 mt-10">Loading...</h1>
  if (error) return <h1 className="text-center text-red-500 mt-10">{error?.data?.message || "Something went wrong!"}</h1>

  return (

    <Carousel
      className="rounded-xl h-[450px] max-w-[1100px] mx-auto shadow-lg overflow-hidden pt-1 mt-1 "
      loop={true}
      autoplay={true}
      autoplayDelay={4000}
    >
      {data.data.map((item, index) => (
        <div
          key={index}
          className="relative h-full w-full group overflow-hidden rounded-xl"
        >
          <img
            src={`${baseUrl}/${item.image}`}
            alt={item.title}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <h2 className="text-white text-lg font-semibold">{item.title}</h2>
            <p className="text-white text-sm mt-1">Rs.{item.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </Carousel>
  )
}