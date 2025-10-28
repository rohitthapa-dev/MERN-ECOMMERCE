import { useDispatch, useSelector } from "react-redux";
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

      {carts.length === 0 ? <h1 className="text-2xl">Card is empty</h1> :
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
        </div>}


    </div>
  )
}
