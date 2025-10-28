
import { Card, CardHeader, CardBody, Typography, Button, Avatar, Dialog, DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../auth/authApi.js";
import { useNavigate } from "react-router";
import { useGetOrdersQuery } from "../orders/orderApi.js";
import { baseUrl } from "../../app/appUrl.js";

export default function UserDetail() {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  const token = user?.token;
  const { isLoading, error, data } = useGetUserQuery(token);
  const { isLoading: loadingOrders, error: ordersError, data: orders } = useGetOrdersQuery();

  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1 className="text-red-500">{error?.data?.message}</h1>

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-3xl space-y-6">

        {/* Profile Card */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader
            floated={false}
            shadow={false}
            className="flex flex-col items-start gap-3 p-4"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <Avatar
                  src="https://i.pravatar.cc/150?img=12"
                  alt="User"
                  size="lg"
                />
                <div>
                  <Typography variant="h6">{data.username}</Typography>
                  <Typography variant="small" color="gray">
                    {data.email}
                  </Typography>
                </div>
              </div>
              <Button size="sm" className="normal-case bg-[#5285F2]  hover:bg-[#3b6adf]"
                onClick={() => nav(`/editProfile`)}>
                Edit
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Order History Card */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader
            floated={false}
            shadow={false}
            className="px-4 pt-4 pb-2">
            <Typography variant="h6">Order History</Typography>
          </CardHeader>
          <CardBody className="divide-y px-4">
            {loadingOrders ? (<div className="flex justify-center items-center py-6">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              <span className="ml-2 text-gray-600">Loading orders...</span>
            </div>
            ) : ordersError ? (
              <div className="flex flex-col items-center py-6 gap-3">
                <Typography color="red" className="font-medium">
                  Failed to load orders
                </Typography>
              </div>
            ) : orders && orders.length > 0 ? (orders.map((order) => (
              <div
                key={order._id}
                onClick={() => handleOpen(order)}
                className="flex items-center justify-between py-3 hover:bg-gray-50 cursor-pointer">
                <div>
                  <Typography variant="small" className="font-medium">
                    {order._id}
                  </Typography>
                  <Typography variant="small" color="gray">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                </div>
                <div className="text-right">
                  <Typography variant="small" color="gray">
                    Rs.{order.totalAmount}
                  </Typography>
                </div>
              </div>
            ))
            ) : (
              <Typography color="gray" className="text-center py-6">
                No orders found
              </Typography>
            )}
          </CardBody>
        </Card>

        {/* Order Detail Dialog */}
        <Dialog open={open} handler={() => setOpen(false)} size="md">
          <DialogHeader>
            {selectedOrder ? `Order Details - ${selectedOrder._id}` : ""}
          </DialogHeader>
          <DialogBody divider>
            {selectedOrder && (
              <div className="space-y-4">
                <div>
                  <Typography variant="small" color="gray">
                    Date:{" "}
                    {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="small" color="gray">
                    Total: {selectedOrder.totalAmount}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" className="mb-2">
                    Items
                  </Typography>
                  <ul className="list-none pl-5 space-y-1">
                    {selectedOrder.products.map((item, index) => (
                      <li key={index} className="flex items-center gap-x-2">
                        <Avatar src={`${baseUrl}/${item.image}`} />
                        {item.title} — {item.qty} × {item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </DialogBody>
          <DialogFooter>
            <Button variant="outlined" color="gray" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
}

