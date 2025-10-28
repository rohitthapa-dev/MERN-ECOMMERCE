import { Input } from "@material-tailwind/react";
import { Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from 'yup';

export const valSchema = Yup.object({
  search: Yup.string().min(3).max(15).required()
});

export default function SearchInput({ isNav, setSearchParams }) {
  const nav = useNavigate();
  return (
    <div>

      <Formik
        initialValues={{
          search: ''
        }}

        onSubmit={(val, { resetForm }) => {

          if (isNav) {
            nav(`/search?q=${val.search}`);
          } else {
            setSearchParams({ q: val.search });
          }
          resetForm();
        }}

        validationSchema={valSchema}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
              <Input
                onChange={handleChange}
                name="search"
                value={values.search}
                label="Search Product" icon={<i className="fas fa-search" />} />
                {errors.search && touched.search && <h1 className="text-pink-500 pl-1">{errors.search}</h1> }
            </div>

          </form>
          
        )}
      </Formik>



    </div>
  )
}