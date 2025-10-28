import toast from "react-hot-toast";
import { useRemoveProductMutation } from "../product/productApi.js"
import { useSelector } from "react-redux";

export default function ProductRemove({ id }) {

  const [removeProduct, { isLoading }] = useRemoveProductMutation();
  const { user } = useSelector((state) => state.userSlice);
  const handleRemove = async () => {
    try {
      await removeProduct({ id, token: user.token }).unwrap();
      toast.success('Remove Successfully')
    } catch (err) {
      const message = err?.data?.message || err?.error || "Something went wrong";
      toast.error(message)
      console.log(err);
    }

  }
  return (
    <div>
      <button className="text-pink-500  hover:text-pink-700 text-xl"
        onClick={handleRemove}
        disabled={isLoading}>
        <i className="fas fa-trash" />
      </button>
    </div>
  )
}
