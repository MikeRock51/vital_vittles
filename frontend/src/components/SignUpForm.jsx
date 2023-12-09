import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateSignUpInput } from "../utils/Validators";

function SignUpForm() {
  const userFields = {
    firstName: "",
    lastName: "",
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
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
            <Field
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="formField"
            />
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
            <button
              className="block w-full rounded bg-primary-700 hover:bg-primary-300 text-white font-bold px-10 py-2 mt-5"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignUpForm;
