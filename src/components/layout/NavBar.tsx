import Logo from "@/assets/logo.png";
import Profile from "./Profile";
import { Menu } from "lucide-react";
import { MobileSidebar } from "./MobileSidebar";
import { ApplicationName } from "@/lib/constants";
import { useAppSelector } from "@/app/hooks";

const Navbar = ({ setShowMenu, showMenu }: any) => {
  return (
    <>
      <nav className="flex items-center justify-between px-5 py-2 shadow-md bg-white dark:bg-secondary">
        <div className="flex items-center gap-5">
          <Menu
            onClick={() => setShowMenu(!showMenu)}
            className="hidden lg:block text-3xl cursor-pointer text-gray-800 dark:text-gray-200"
          />
          <MobileSidebar />
          <div className="hidden sm:flex items-center gap-2">
            <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
            Cost Management              
            </h4>
          </div>
        </div>
        <div>Welcome back, </div>
        <div>
          <div className="hidden sm:flex gap-3">{/* <Profile /> */}</div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
