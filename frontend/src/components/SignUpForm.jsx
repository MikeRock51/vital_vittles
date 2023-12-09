import { Formik, Form, Field, ErrorMessage } from "formik";

function SignUpForm() {
  return (
    <div className="bg-[#e2e8f0] sm:w-2/6 py-10 text-center">
      <h2>Create an Account</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
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
          <Form className="mx-auto">
            <Field type="email" name="email" placeholder="Email" className="block my-2 rounded" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" placeholder="Password" className="block my-2 rounded"/>
            <ErrorMessage name="password" component="div" />
            <button className="block bg-[#c2410c] py-1 px-10 rounded" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignUpForm;
