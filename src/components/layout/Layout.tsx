import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import Sidebar from "./SideBar";

const Layout = () => {
  const [showMenu, setShowMenu] = useState(true);
  
  return (
    <div className="h-screen flex flex-col">
      <Navbar setShowMenu={setShowMenu} showMenu={showMenu} />
      <div className="flex-grow overflow-auto bg-zinc-100 dark:bg-black grid grid-cols-14">
        {showMenu && <Sidebar />}
        <div
          className={`flex-grow overflow-auto col-span-full ${
            showMenu ? "lg:col-span-12" : "col-span-full"
          }`}
        >
          <div className="p-2 min-h-[75vh] ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
