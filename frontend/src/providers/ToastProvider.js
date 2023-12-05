import { Toaster } from "react-hot-toast";

function Toast() {
  return (
    <Toaster
      containerStyle={{
        top: 50,
      }}
      toastOptions={{
        duration: 5000,
        success: {
          duration: 5000,
          style: {
            background: "#4d7c0f",
            color: "#d9f99d",
          },
          iconTheme: {
            primary: "#d9f99d",
            secondary: "#4d7c0f",
          },
        },
        error: {
          duration: 5000,
          style: {
            background: "#b91c1c",
            color: "#fecaca",
          },
          iconTheme: {
            primary: "#fecaca",
            secondary: "#b91c1c",
          },
        },
      }}
    />
  );
}

export default Toast;
