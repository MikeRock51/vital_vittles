import { Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FoodDetails from "./pages/FoodDetails";
import Error from "./ui/Error";
import SignUpPage from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";
import NavBar from "./ui/NavBar";
import Loader from "./ui/Loader";
import Profile from "./pages/Profile";
import CreateRecipe from "./pages/CreateRecipe";
import MyRecipes from "./pages/MyRecipes";
import Toast from "./providers/ToastProvider";
import SignInPage from "./pages/SignIn";
import ChatPage from "./pages/ChatPage";

// import { lazy } from "react";

// const Home = lazy(() => import("./pages/Home"));

export default function App() {
  // const { currentUser } = useUserStore()

  useEffect(() => {}, []);
  // console.log(currentUser)

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <div className="App h-screen">
          <header className="fixed left-0 right-0 top-0">
            <NavBar />
          </header>
          <Toast />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/recipes" element={<Home />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/food/:id" element={<FoodDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recipes/new" element={<CreateRecipe />} />
            <Route path="/recipes/me" element={<MyRecipes />} />
            <Route path="/yishu" element={<ChatPage />} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
}
