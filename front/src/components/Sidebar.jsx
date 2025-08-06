import { User2, Users } from "lucide-react";
import { useState } from "react";
import { FaTasks, FaUsers, FaCogs, FaSignOutAlt, FaSign } from "react-icons/fa";
import { MdCreateNewFolder, MdDashboard, MdWork, MdWorkspaces } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const currentPath = location.pathname;

  const getLinkClasses = (path) =>                               
    `flex items-center gap-3 p-2 rounded ${
      currentPath === path ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
    }`;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen p-5 border-r border-gray-600 bg-gray-900 text-white fixed top-0 left-0">
        {/* App Logo */}
        <div className="flex flex-col items-center border-b-2 border-gray-700 w-full pb-4 mb-4">
  <Link to="/" className="flex flex-col items-center">
    <MdWorkspaces className="h-10 w-10" />
    <h1 className="text-xl font-bold">CIAAN</h1>
  </Link>
</div>

        <nav className="space-y-4">
          <Link to="/" className={getLinkClasses("/")}>
            <MdDashboard />
            <span>Dashboard</span>
          </Link>

    
          {!user &&(
          <Link to="/login" className={getLinkClasses("/login")}>
            <FaSignOutAlt />
            <span>Login</span>
          </Link>)
          }
          
         
          {user  &&(
            <>
            <Link to="/profile" className={getLinkClasses("/profile")}>
            <User2 />
            <span>Profile</span>
          </Link>
             {/* <Link to="/create-post" className={getLinkClasses("/profile")}>
            <MdCreateNewFolder />
            <span>Create Post</span>
          </Link> */}
           <Link to="/logout" className={getLinkClasses("/logout") }>
            <FaSignOutAlt />
            <span>Logout</span>
          </Link>
            </>
          )
          }


        </nav>
      </aside>
    </>
  );
};

export default Sidebar;