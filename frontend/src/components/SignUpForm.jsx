import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateSignUpInput } from "../utils/Validators";
import { CreateUser } from "../utils/Connector";

function SignUpForm() {
  const [error, setError ] = useState(false);
  const navigate = useNavigate();
  const userFields = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <div className="w-11/12 xs:w-4/6 sm:w-4/6 md:w-6/12 bg-[#e2e8f0] py-10 mt-20 text-center">
      <h2>Create an Account</h2>
      <Formik
        initialValues={userFields}
        validate={(values) => {
          const errors = validateSignUpInput(values)
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const successful = await CreateUser(values, setError);
          if (successful) {
          setSubmitting(false);
            setTimeout(() => {
              navigate('/signin');
            }, 400);
        }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="px-4 sm:px-8">
            <Field
              type="text"
              name="firstname"
              placeholder="First Name"
              className="formField"
            />
            <ErrorMessage name="firstname" component="div" className="text-primary-600" />
            <Field
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="formField"
            />
            <ErrorMessage name="lastname" component="div" className="text-primary-600" />
            <Field
              type="text"
              name="username"
              placeholder="Username"
              className="formField"
            />
            <ErrorMessage name="username" component="div" className="text-primary-600" />
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="formField"
            />
            <ErrorMessage name="email" component="div" className="text-primary-600" />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="formField"
            />
            <ErrorMessage name="password" component="div" className="text-primary-600" />
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="formField"
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-primary-600" />
            <h4 className="text-primary-600">{error && error}</h4>
            <button
              className="block w-full rounded bg-primary-700 hover:bg-primary-300 text-white font-bold px-10 py-2 mt-5"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignUpForm;
