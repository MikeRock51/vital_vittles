import { Suspense } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
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

// import { lazy } from "react";

// const Home = lazy(() => import("./pages/Home"));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/recipes" element={<Home />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/food/:id" element={<FoodDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recipes/create" element={<CreateRecipe />} />
            <Route path="/recipes/me" element={<MyRecipes />} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
}
