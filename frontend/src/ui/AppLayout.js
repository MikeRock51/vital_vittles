import { Outlet, useNavigation } from "react-router-dom";

import Loader from "./Loader";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      {/* {<Loader />} */}
      <header>
        <NavBar />
      </header>
      <div className="overflow-scroll">
        <main className="mx-auto max-w-full px-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
