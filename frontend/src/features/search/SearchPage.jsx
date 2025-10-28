import { useNavigate, useSearchParams } from "react-router";
import SearchInput from "./SearchInput";
import { useGetProductsQuery } from "../product/productApi";
import { Button, Card, CardBody, CardFooter, CardHeader, Rating, Typography } from "@material-tailwind/react";
import { baseUrl } from "../../app/appUrl.js";
import { RoundedStar } from "@smastrom/react-rating";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, error } = useGetProductsQuery({search: searchParams.get('q')});
  const nav = useNavigate();
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1 className="text-red-500">{error.data}</h1>
  return (
    <div className="p-5">

      <SearchInput setSearchParams={setSearchParams} />
     {/* Products Grid */}
           {data.data.length === 0 ? <h1 className="text-2xl mt-1"> No Search Result</h1> :<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
             {data.data && data.data.map(({ _id, title, image, price, description, rating }) => {
               return <Card key={_id} className="mt-6 ">
                 <CardHeader color="blue-gray" className="relative h:48 sm:h-56 p-0">
                   <img
                     src={`${baseUrl}/${image}`}
                     className="h-full w-full object-cover"
                     alt="card-image"
                   />
                 </CardHeader>
                 <CardBody>
                   <div className="flex justify-between">
                     <Typography variant="h6" color="blue-gray" className="mb-2 line-clamp-1">
                       {title}
                     </Typography>
                     <p className="text-sm font-semibold">Rs.{price}</p>
                   </div>
                   {/* Half star support */}
                   <Rating style={{ maxWidth: 110 }} readOnly value={rating} precision={0.5} transition="zoom"
                     itemStyles={{
                       itemShapes: RoundedStar, // or "thin", "rounded", "star"
                       activeFillColor: "#facc15", // yellow-400
                       inactiveFillColor: "#e5e7eb" // gray-200
                     }} />
                   <p className="line-clamp-2 text-sm mt-1 text-gray-600">
                     {description}
                   </p>
                 </CardBody>
                 <CardFooter className="pt-0">
                   <Button size="sm" color="blue" fullWidth
                     onClick={() => nav(`/product/${_id}`)}
                   >View Detail</Button>
                 </CardFooter>
               </Card>
     
             })}
           </div>}
    </div>
  )
}