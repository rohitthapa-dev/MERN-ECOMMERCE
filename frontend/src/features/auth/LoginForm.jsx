import { Button, Input, Typography } from "@material-tailwind/react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import { useNavigate } from "react-router";
import { useLoginUserMutation } from "./authApi.js";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../user/userSlice.js";

const valSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(5).max(24).required()
})


export default function LoginForm() {

  const nav = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [passwordShown, setPasswordShown] = useState(false);
  const dispath = useDispatch();
  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}

          onSubmit={async (val) => {
            try {
              const response = await loginUser(val).unwrap();
              toast.success('Logged in');
              dispath(setUser(response));
              nav(-1);
            } catch (err) {
              toast.error(err.data.message)
            }
          }}

          validationSchema={valSchema}
        >
          {({ handleChange, handleSubmit, values, touched, errors }) => (
            <div>
              <Typography variant="h3" color="blue-gray" className="mb-2">
                Sign In
              </Typography>
              <Typography className="mb-10 text-gray-600 font-normal text-[18px]">
                Enter your email and password to sign in
              </Typography>
              <form onSubmit={handleSubmit} className="mx-auto max-w-[24rem] text-left">
                <div className="mb-2">
                  <label htmlFor="email">
                    <Typography
                      variant="small"
                      className="mb-2 block font-medium text-gray-900"
                    >
                      Your Email
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
                  {touched.email && errors.email && <h1 className="text-pink-500">{errors.email}</h1>}
                </div>
                <div className="mb-2">
                  <label htmlFor="password">
                    <Typography
                      variant="small"
                      className="mb-2 block font-medium text-gray-900"
                    >
                      Password
                    </Typography>
                  </label>
                  <Input
                    onChange={handleChange}
                    name="password"
                    size="lg"
                    placeholder="********"
                    className="w-full placeholder:opacity-100 !border-t !border-blue-gray-200 focus:!border-primary !text-black"
                    labelProps={{ className: "hidden peer" }}
                    containerProps={{ className: "mt-0" }}
                    type={passwordShown ? "text" : "password"}
                    icon={
                      <i onClick={() => setPasswordShown(!passwordShown)}
                        className={`fas fa-${passwordShown ? "unlock" : "lock"} fa-md text-black`}
                      />
                    }
                  />
                  {touched.password && errors.password && <h1 className="text-pink-500">{errors.password}</h1>}
                </div>
                <Button loading={isLoading} type="submit"
                  color="gray" size="lg" className="mt-6" fullWidth>
                  sign in
                </Button>
                <div className="!mt-4 flex justify-end">
                  <Typography
                    as="a"
                    href="#"
                    color="blue-gray"
                    variant="small"
                    className="font-medium"
                  >
                    Forgot password
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  color="gray"
                  className="!mt-4 text-center font-normal"
                >
                  Not registered?{" "}
                  <a onClick={() => nav(`/register`)} className="font-medium text-gray-900 cursor-pointer">
                    Create account
                  </a>
                </Typography>
              </form>
            </div>
          )}

        </Formik>

      </div>
    </section>
  )
}
