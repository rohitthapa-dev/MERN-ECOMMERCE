import { Button, Input, Typography } from "@material-tailwind/react";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from 'yup';
import { useGetUserQuery, useUpdateUserMutation } from "../auth/authApi.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const valSchema = Yup.object({
  username: Yup.string().min(5).max(15),
  email: Yup.string().email()
})

export default function UserUpdateForm() {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  const token = user?.token;
  const { isLoading, error, data } = useGetUserQuery(token);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()

  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1 className="text-red-500">{error?.data?.message}</h1>
  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>

        <Formik
          initialValues={{
            username: data?.username || "",
            email: data?.email || ""
          }}

          onSubmit={async (val) => {
            try {
              const formData = new FormData();
              formData.append('username', val.username);
              formData.append('email', val.email);
              await updateUser({
                data: formData,
                token: token
              }).unwrap();
              toast.success('Register sucessfully');
              nav(-1);
            } catch (err) {
              const message = err?.data?.message || err?.error || "Something went wrong";
              toast.error(message)
            }
          }}

          validationSchema={valSchema}
        >
          {({ handleChange, handleSubmit, values, touched, errors }) => (
            <div>
              <Typography className="mb-10 text-gray-600 font-normal text-[18px]">
                Edit Your Profile
              </Typography>
              <form onSubmit={handleSubmit} className="mx-auto max-w-[24rem] text-left">
                <div className="mb-2">
                  <label htmlFor="username">
                    <Typography
                      variant="small"
                      className="mb-2 block font-medium text-gray-900"
                    >
                      Username
                    </Typography>
                  </label>
                  <Input
                    onChange={handleChange}
                    size="lg"
                    name="username"
                    value={values.username}
                    placeholder="example"
                    className="w-full placeholder:opacity-100 !border-t !border-blue-gray-200 focus:!border-primary !text-black"
                    labelProps={{ className: "hidden peer" }}
                    containerProps={{ className: "mt-0" }}

                  />
                  {errors.username && touched.username && <h1 className="text-pink-500">{errors.username}</h1>}
                </div>
                <div className="mb-2">
                  <label htmlFor="email">
                    <Typography
                      variant="small"
                      className="mb-2 block font-medium text-gray-900"
                    >
                      Email
                    </Typography>
                  </label>
                  <Input
                    onChange={handleChange}
                    size="lg"
                    type="email"
                    name="email"
                    value={values.email}
                    placeholder="name@mail.com"
                    className="w-full placeholder:opacity-100 !border-t !border-blue-gray-200 focus:!border-primary !text-black"
                    labelProps={{ className: "hidden peer" }}
                    containerProps={{ className: "mt-0" }}

                  />
                  {errors.email && touched.email && <h1 className="text-pink-500">{errors.email}</h1>}
                </div>
                <div className="flex justify-end">
                  <Button type="submit"
                    loading={isUpdating}
                    size="sm" className="mt-6 normal-case bg-[#5285F2]  hover:bg-[#3b6adf] " >
                    Edit
                  </Button>
                </div>
              </form>
            </div>
          )}

        </Formik>

      </div>
    </section>
  )
}
