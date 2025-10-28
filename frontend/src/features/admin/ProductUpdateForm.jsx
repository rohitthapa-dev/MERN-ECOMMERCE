import { Button, Input, Option, Select, Textarea } from "@material-tailwind/react";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router";
import { useGetProductQuery, useUpdateProductMutation } from "../product/productApi.js";
import { baseUrl } from "../../app/appUrl.js";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const supportedFormats = ['image/jpeg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const valSchema = Yup.object().shape({
  title: Yup.string().min(5, "Title must be at least 3 characters"),
  description: Yup.string().min(10, "Description must be at least 3 characters").required("Description is required"),
  price: Yup.number(),
  stock: Yup.number(),
  brand: Yup.string(),
  category: Yup.string(),
  image: Yup.mixed().test('fileType', 'Invalid input type', (val) => {
    if (!val) return true;
    return val && supportedFormats.includes(val.type);
  }).test('fileSize', 'File size is too large', (val) => {
    if (!val) return true;
    return val && val.size <= 5 * 1024 * 1024;
  }),
});


export default function ProductUpdateForm() {

  const { id } = useParams();
  const { user } = useSelector((state) => state.userSlice);
  const nav = useNavigate();
  const { data, isLoading, error } = useGetProductQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()

  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1>{error.data?.messaage || "Erorr loading product"}</h1>


  return (
    <div className="p-5">

      <Formik
        initialValues={{
          title: data?.data?.title || "",
          description: data?.data?.description || "",
          price: data?.data?.price || "",
          image: '',
          stock: data?.data?.stock || "",
          brand: data?.data?.brand || "",
          category: data?.data?.category || "",
          imageReview: data?.data?.image ? `${baseUrl}/${data.data.image}` : ""
        }}

        onSubmit={async (val) => {
          try {
            const formData = new FormData();
            formData.append("title", val.title);
            formData.append("description", val.description);
            formData.append("price", val.price);
            formData.append("stock", val.stock);
            formData.append("brand", val.brand);
            formData.append("category", val.category);

            if (val.image) {
              formData.append("image", val.image);
            }

            const result = await updateProduct({ id, formData, token: user?.token });

            if (result.error) {
              const message = result.error?.data?.message || result.error?.error || "Something went wrong";
              toast.error(message);
            } else {
              toast.success("Product updated successfully");
              nav(-1);
            }
          } catch (err) {
            const message = err?.data?.message || err?.error || "Something went wrong";
            toast.error(message)
          }
        }}

        validationSchema={valSchema}
      >

        {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="max-w-[400px] space-y-5">

            <div>
              <Input
                label="Title"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
              {touched.title && errors.title && <p className="text-red-500">{errors.title}</p>}

            </div>

            <div>
              <Textarea
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
              {touched.description && errors.description && <p className="text-red-500">{errors.description}</p>}
            </div>

            <div>
              <Input
                label="Price"
                name="price"
                type="number"
                value={values.price}
                onChange={handleChange}
              />
              {touched.price && errors.price && <p className="text-red-500">{errors.price}</p>}
            </div>

            <div>
              <Input
                name="stock"
                label="Stock"
                type="number"
                value={values.stock}
                onChange={handleChange}
              />
              {touched.stock && errors.stock && <p className="text-red-500">{errors.stock}</p>}
            </div>

            <div>
              <Select
                label="Category"
                name="category"
                value={values.category}
                onChange={(val) => setFieldValue("category", val)}
              >
                {categories.map((category) => (
                  <Option value={category}>{category}</Option>
                ))}
              </Select>
              {touched.category && errors.category && <p className="text-red-500">{errors.category}</p>}
            </div>

            <div>
              <Select
                label="Brand"
                name="brand"
                value={values.brand}
                onChange={(e) => setFieldValue("brand", e)}
              >
                {brands.map((brand) => (
                  <Option value={brand}>{brand}</Option>
                ))}
              </Select>
              {touched.brand && errors.brand && <p className="text-red-500">{errors.brand}</p>}
            </div>

            <div>
              <Input
                type="file"
                label="Image"
                name="image"

                onChange={(e) => {
                  const file = e.target.files[0];

                  setFieldValue('imageReview', URL.createObjectURL(file));
                  setFieldValue('image', file);

                }}
              />
              {touched.image && errors.image && <p className="text-red-500">{errors.image}</p>}
              {values.imageReview && !errors.image && <img className="mt-2 h-[200px]" src={values.imageReview} alt="" />}
            </div>

            <Button type="submit" disabled={isUpdating}>{isUpdating ? "Updating..." : "Submit"}</Button>


          </form>
        )}

      </Formik>


    </div>
  )
}

const categories = [
  "Mobile",
  "Laptop",
  "Tablet",
  "Accessory",
  "Shoes",
  "Clothing",
  "Electronics",
  "Home Appliances"
];

const brands = [
  "Apple",
  "Samsung",
  "Sony",
  "Xiaomi",
  "Dell",
  "HP",
  "Nike",
  "Adidas",
  "Puma",
  "Levi's"
];
