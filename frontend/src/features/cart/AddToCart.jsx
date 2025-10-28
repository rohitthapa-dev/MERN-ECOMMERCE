import { Button, IconButton } from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "./cartSlice.js";
import { useNavigate } from "react-router";

export default function AddToCart({ product }) {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { carts } = useSelector((state) => state.cartSlice);
  const { user } = useSelector((state) => state.userSlice);
  const isExist = carts.find((item) => item.id === product._id);
  const [qty, setQty] = useState(isExist ? isExist.qty : 1);

  const handleAddToCart = () => {
    dispatch(setCart({
      qty,
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      stock: product.stock
    }));
    nav('/cart');
  };

  return (
    <div className='mt-10 space-y-5'>
      <div className='flex gap-3 items-center'>

        <IconButton
          onClick={() => setQty(qty - 1)}
          disabled={qty === 1}>
          <i className="fas fa-minus" />
        </IconButton>

        <p className='font-bold'>{qty}</p>
        <IconButton
          disabled={product.stock === qty}
          onClick={() => setQty(qty + 1)}
        >
          <i className="fas fa-add" />
        </IconButton>

      </div>
      <Button
        onClick={handleAddToCart}
        disabled={!user || user?.role === 'Admin'} >Add To Cart</Button>

    </div>
  )
}
