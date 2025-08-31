import { NavLink } from "react-router-dom";
import "../styles/componentStyle/Sidebar.css";
import { ArrowRightStartOnRectangleIcon, BriefcaseIcon, ClipboardDocumentListIcon, Cog6ToothIcon, InboxStackIcon, PrinterIcon, Squares2X2Icon, StarIcon, UserIcon } from "@heroicons/react/24/outline";
import logo from "../assets/images/logo3.png"
import { BanknotesIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie"

const Sidebar = () => {

  return <>
    <div className="sidebarWrapper bg-[#0B544C] text-white">
      <div className="sidebarLogo">
        <img src={logo} alt="" />
      </div>
      <div className="sidebarLinks">
        <NavLink 
          to="/dashboard"
          end
          className={({isActive}) => `${isActive ? 'bg-[#f6f6f6] text-[#0B544C]' : 'hover:bg-[#f6f6f6]  hover:text-[#0B544C]'}`}
        >
          <Squares2X2Icon/>
          <span>Overview</span>
        </NavLink>
        <NavLink 
          to="/dashboard/inventory"
          
          className={({isActive}) => `${isActive ? 'bg-[#f6f6f6] text-[#0B544C]' : 'hover:bg-[#f6f6f6]  hover:text-[#0B544C]'}`}
        >
          <ClipboardDocumentListIcon/>
          <span>Inventory</span>
        </NavLink>
        {/* <NavLink 
          to="/dashboard/rentals"
          className={({isActive}) => `${isActive ? 'bg-[#f6f6f6] text-[#0B544C]' : 'hover:bg-[#f6f6f6]  hover:text-[#0B544C]'}`}
        >
          <ClipboardDocumentListIcon/>
          <span>Rentals</span>
        </NavLink>
        <NavLink 
          to="/dashboard/services"
          className={({isActive}) => `${isActive ? 'bg-[#f6f6f6] text-[#0B544C]' : 'hover:bg-[#f6f6f6]  hover:text-[#0B544C]'}`}
        >
          <BriefcaseIcon/>
          <span>Services</span>
        </NavLink>
        <NavLink 
          to="/dashboard/packages"
          className={({isActive}) => `${isActive ? 'bg-[#f6f6f6] text-[#0B544C]' : 'hover:bg-[#f6f6f6]  hover:text-[#0B544C]'}`}
        >
          <InboxStackIcon/>
          <span>Packages</span>
        </NavLink> */}
        <NavLink 
          to="/dashboard/bookings"
          
          className={({isActive}) => `${isActive ? 'bg-[#f6f6f6] text-[#0B544C]' : 'hover:bg-[#f6f6f6]  hover:text-[#0B544C]'}`}
        >
          <PrinterIcon/>
          <span>Bookings</span>
        </NavLink>
        {
          Cookies.get("role") === "ADMIN" && 
          <NavLink 
            to="/dashboard/users"
            end
            className={({isActive}) => `${isActive ? 'bg-[#f6f6f6] text-[#0B544C]' : 'hover:bg-[#f6f6f6]  hover:text-[#0B544C]'}`}
          >
            <UserIcon/>
            <span>Users</span>
          </NavLink>
        }
        <NavLink 
          to="/dashboard/reviews"
          end
          className={({isActive}) => `${isActive ? 'bg-[#f6f6f6] text-[#0B544C]' : 'hover:bg-[#f6f6f6]  hover:text-[#0B544C]'}`}
        >
          <StarIcon/>
          <span>Reviews</span>
        </NavLink>
        <NavLink 
          to="/dashboard/transactions"
          end
          className={({isActive}) => `${isActive ? 'bg-[#f6f6f6] text-[#0B544C]' : 'hover:bg-[#f6f6f6]  hover:text-[#0B544C]'}`}
        >
          <BanknotesIcon/>
          <span>Transactions</span>
        </NavLink>
        <NavLink 
          to="/dashboard/settings"
          end
          className={({isActive}) => `${isActive ? 'bg-[#f6f6f6] text-[#0B544C]' : 'hover:bg-[#f6f6f6]  hover:text-[#0B544C]'}`}
        >
          <Cog6ToothIcon/>
          <span>Settings</span>
        </NavLink>
        <NavLink 
          to="/"
          end
          className={({isActive}) => `${isActive ? 'bg-[#f6f6f6] text-[#0B544C]' : 'hover:bg-[#f6f6f6]  hover:text-[#0B544C]'}`}
        >
          <ArrowRightStartOnRectangleIcon/>
          <span>Logout</span>
        </NavLink>
      </div>
    </div>

  </>

}

export default Sidebar;