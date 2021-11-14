import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';


 const FormRegister = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(15, "Must be 10 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
        axios.post('https://localhost:5001/api/register', values)
            .then((res) => {
                console.log(res.data)
                alert(JSON.stringify(res.data, null, 2));
            }).catch((error) => {
                console.log(error)
                alert(JSON.stringify(error, null, 2));                
            });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName}
        />
        {formik.touched.fullName && formik.errors.fullName ? (
          <div>{formik.errors.fullName}</div>
        ) : null}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormRegister ; 
