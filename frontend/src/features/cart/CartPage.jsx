import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseUrl } from "../../app/appUrl.js";
import { Button, IconButton } from "@material-tailwind/react";
import { clearCart, setCart } from "./cartSlice.js";
import { useCreateOrderMutation } from "../orders/orderApi.js";
import toast from "react-hot-toast";

export default function CartPage() {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { carts } = useSelector((state) => state.cartSlice);
  const totalAmount = carts.reduce((acc, item) => acc + item.price * item.qty, 0);
  const dispatch = useDispatch();
  const handleOrder = async () => {
    try {
      await createOrder({
        products: carts,
        totalAmount
      }).unwrap();
      dispatch(clearCart());
      toast.success("Order Placed Successfully");
    } catch (err) {
      toast.error(err?.data?.message);
    }
  }
  return (
    <div className="p-5">

      {carts.length === 0 ? (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <i className="fas fa-shopping-cart text-6xl text-gray-400 mb-4"></i>

    <h1 className="text-2xl font-semibold text-gray-700">
      Your cart is empty
    </h1>

    <p className="text-gray-500 mt-2">
      Add some products to continue shopping
    </p>

    <Link to="/">
  <Button
    size="sm"
    className="mt-6 normal-case bg-[#5285F2] hover:bg-[#3b6adf]">
  
    Continue Shopping
  </Button>
</Link>
  </div>
) : (
        <div>
          {carts.map((item) => {
            return <div className="w-[600px] max-w-screen-lg  bg-gray-200 rounded-lg shadow-md p-6 flex gap-15 items-center justify-between my-5" key={item.id}>
              <img src={`${baseUrl}/${item.image}`} alt="" className="w-20 h-20" />
              <p>{item.title}</p>
              <div className="flex gap-3 items-center">
                <IconButton
                  size="sm"
                  disabled={item.qty === 1}
                  onClick={() => dispatch(setCart({ ...item, qty: item.qty - 1 }))}
                > <i className="fas fa-minus" />
                </IconButton>
                <p className="font-bold">{item.qty}</p>
                <IconButton
                  size="sm"
                  disabled={item.stock === item.qty}
                  onClick={() => dispatch(setCart({ ...item, qty: item.qty + 1 }))}
                > <i className="fas fa-add" />
                </IconButton>
              </div>
              <p>Rs.{item.price}</p>
            </div>
          })}

          <h1>Total Amount Rs.{totalAmount}</h1>
          <Button
            onClick={handleOrder}
            loading={isLoading}
            className="mt-5">Place An Order</Button>
        </div>)}


    </div>
  )
}
