
import { useNavigate } from "react-router";
import { useGetProductsQuery } from "../product/productApi.js"
import { Avatar, Button, Card, IconButton, Typography } from "@material-tailwind/react";
import { baseUrl } from "../../app/appUrl.js";
import ProductRemove from "./ProductRemove.jsx";

const TABLE_HEAD = ["Product", "Price", "Stock", "Brand", "Category", "CreatedAt", "Action"];


export default function AdminUi() {

  const { isLoading, error, data } = useGetProductsQuery({ limit: 1000 });
  console.log(data)
  const nav = useNavigate();
  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1 className="text-red-500">{error.data}</h1>

  return (
    <div className="px-10 py-5">

      <div className="flex justify-end mb-5">
        <Button onClick={() => nav('/product-add-form')} className="bg-purple-500">Add Product</Button>
      </div>

      {data && <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.data.map(({ _id, title, image, price, stock, brand, category, createdAt }, index) => (
              <tr key={_id} className="even:bg-blue-gray-50/50">
                <td className="p-4 flex items-center gap-5">
                  <Avatar src={`${baseUrl}/${image}`} />
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {title}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    Rs.{price}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {stock}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {brand}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {category}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {new Date(createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric"
                    })}
                  </Typography>
                </td>


                <td className="p-4">

                  <div className="flex items-center gap-10 ">
                    <button className="text-purple-500  hover:text-purple-700 text-xl"
                      onClick={() => nav(`/product-update-form/${_id}`)}>
                      <i className="fa-regular fa-pen-to-square" />
                    </button>

                    <ProductRemove id={_id} />

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      }
    </div>
  )
}
