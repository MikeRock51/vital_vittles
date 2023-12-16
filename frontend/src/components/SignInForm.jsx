import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateSignInInput } from "../utils/Validators";
import { LoginUser } from "../utils/Connector";
import { useUserStore } from "../stateProvider/authStore";

function SignInForm() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser, setAuthToken } = useUserStore();
  const userFields = {
    email: "",
    password: "",
  };

  return (
    <div className="xs:w-4/6 mt-20 w-11/12 bg-[#e2e8f0] py-10 sm:py-14 text-center sm:w-4/6 md:w-5/12">
      <h2>Log into your account</h2>
      <Formik
        initialValues={userFields}
        validate={(values) => {
          const errors = validateSignInInput(values);
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const { user, token } = await LoginUser(values, setError);
          if (user) {
            setCurrentUser(user);
            setAuthToken(token);
            setSubmitting(false);
            navigate("/recipes");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="px-4 sm:px-12">
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="formField"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-primary-600"
            />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="formField"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-primary-600"
            />
            <h4 className="text-primary-600">{error && error}</h4>
            <button
              className="mt-10 block w-full rounded bg-primary-700 px-10 py-2 font-bold text-white hover:bg-primary-300"
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

export default SignInForm;
