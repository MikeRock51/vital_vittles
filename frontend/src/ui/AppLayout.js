import { Outlet, useNavigation } from "react-router-dom";

import Loader from "./Loader";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid max-w-screen h-screen">
      {isLoading && <Loader />}
      {/* {<Loader />} */}
      <header className="h-fit">
        <NavBar />
      </header>
      <div className="overflow-scroll">
        <main className="px-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
