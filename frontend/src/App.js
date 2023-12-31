import { Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipes from "./pages/Recipes";
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
import { useUserStore } from "./stateProvider/authStore";
import toast from "react-hot-toast";
import NoSessionModal from "./components/modals/NoSessionModal";

// import { lazy } from "react";

// const Home = lazy(() => import("./pages/Home"));

export default function App() {
  const { currentUser } = useUserStore()

  useEffect(() => {}, []);
  // console.log(currentUser)

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <div className="App h-screen">
          <header className="fixed left-0 right-0 top-0 z-20">
            <NavBar />
          </header>
          <Toast />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/food/:id" element={<FoodDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recipes/new" element={<CreateRecipe />} />
            <Route path="/recipes/me" element={<MyRecipes />} />
            <Route path="/yishu" element={<ChatPage />} />
          </Routes>
        </div>
        <NoSessionModal />
      </Suspense>
    </Router>
  );
}
