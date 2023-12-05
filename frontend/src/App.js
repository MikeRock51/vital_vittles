import logo from "./logo.svg";
import "./App.css";
import Toast from "./providers/ToastProvider";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import FoodDetails from "./pages/FoodDetails";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/food",
        element: <FoodDetails />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
