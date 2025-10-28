import ProductList from "../product/ProductList.jsx";
import TopProducts from "../product/TopProducts.jsx";

export default function Home() {
  return (
    <div className=" space-y-10 pb-8">
      <TopProducts />
      <ProductList />

    </div>
  )
}
