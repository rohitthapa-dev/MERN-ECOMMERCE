import { Button, Card, CardBody, CardFooter, CardHeader, Option, Select, Typography } from "@material-tailwind/react";
import { useGetProductsQuery } from "./productApi.js"
import { baseUrl } from "../../app/appUrl.js";
import { useNavigate, useSearchParams } from "react-router";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export default function ProductList() {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const sort = searchParams.get("sort") || "";
  const { isLoading, error, data } = useGetProductsQuery({ page, sort });
  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1 className="text-red-500"> {error?.data?.message}</h1>

  return (
    <div>
      {/* Sorting UI */}
      <div className="w-full px-4 my-2 flex justify-end ">
        <div className="w-full max-w-[220px]">
          <Select
            value={sort}
            onChange={(e) =>
              setSearchParams({ page: 1, sort: e }) // reset to page 1 when sorting
            }
            className="w-full border border-gray-300 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700
               focus:outline-none relative z-10"
          >
            <Option value="">Random</Option>
            <Option value="price">Price ↑</Option>
            <Option value="-price">Price ↓</Option>
            <Option value="-rating">Rating ★</Option>
            <Option value="title">Title A → Z</Option>
            <Option value="-title">Title Z → A</Option>
          </Select>
        </div>
      </div>


      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
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
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
        <Button onClick={() => setSearchParams({ page: Number(page) - 1, sort })}
          disabled={page === 1}
          className="btn bg-blue-500 text-white px-3 py-1 text-[10px]  rounded-md">Prev</Button>

        {/* <h1 className="font-semibold text-[14px] ">{page}</h1> */}

        {/* Always show first page */}
        <Button
          onClick={() => setSearchParams({ page: 1, sort })}
          className={`px-3 py-1 text-xs rounded-md ${page === 1 ? "bg-blue-600 text-white" : "bg-gray-500"
            }`}
        >
          1
        </Button>

        {/* Show ... if current page > 3 */}
        {page > 3 && <span className="px-1 sm:px-2">...</span>}

        {/* Show nearby pages */}
        {Array.from({ length: data.totalPage }, (_, i) => i + 1)
          .filter((p) => Math.abs(p - page) <= 1 && p !== 1 && p !== data.totalPage)
          .map((p) => (
            <Button
              key={p}
              onClick={() => setSearchParams({ page: p, sort })}
              className={`px-3 py-1 text-xs rounded-md ${page === p ? "bg-blue-600 text-white" : "bg-gray-500"
                }`}
            >
              {p}
            </Button>
          ))}

        {/* Show ... if current page is far from last */}
        {page < data.totalPage - 2 && <span className="px-1 sm:px-2">...</span>}

        {/* Always show last page */}
        <Button
          onClick={() => setSearchParams({ page: data.totalPage, sort })}
          className={`px-3 py-1 text-xs rounded-md ${page === data.totalPage ? "bg-blue-600 text-white" : "bg-gray-500"
            }`}
        >
          {data.totalPage}
        </Button>


        <Button
          onClick={() => setSearchParams({ page: Number(page) + 1, sort })}
          disabled={page === data.totalPage}
          className="btn bg-blue-500 text-white px-3 py-1 text-[10px]  rounded-md">Next</Button>
      </div>

    </div>
  )
}
