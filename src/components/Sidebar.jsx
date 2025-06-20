import { NavLink } from "react-router-dom";
import "../styles/componentStyle/Sidebar.css";
import { ArrowRightStartOnRectangleIcon, BriefcaseIcon, ClipboardDocumentListIcon, Cog6ToothIcon, InboxStackIcon, PrinterIcon, Squares2X2Icon, StarIcon, UserIcon } from "@heroicons/react/24/outline";
import { BanknotesIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {

  return <>
    <div className="sidebarWrapper bg-[#0B544C] text-white">
      <div className="sidebarLogo">
        <img src={null} alt="" />
      </div>
      <div className="sidebarLinks">
        <NavLink 
          to="/dashboard/overview"
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
        <NavLink 
          to="/dashboard/users"
          className={({isActive}) => `${isActive ? 'bg-[#f6f6f6] text-[#0B544C]' : 'hover:bg-[#f6f6f6]  hover:text-[#0B544C]'}`}
        >
          <UserIcon/>
          <span>Users</span>
        </NavLink>
        <NavLink 
          to="/dashboard/reviews"
          className={({isActive}) => `${isActive ? 'bg-[#f6f6f6] text-[#0B544C]' : 'hover:bg-[#f6f6f6]  hover:text-[#0B544C]'}`}
        >
          <StarIcon/>
          <span>Reviews</span>
        </NavLink>
        <NavLink 
          to="/dashboard/transactions"
          className={({isActive}) => `${isActive ? 'bg-[#f6f6f6] text-[#0B544C]' : 'hover:bg-[#f6f6f6]  hover:text-[#0B544C]'}`}
        >
          <BanknotesIcon/>
          <span>Transactions</span>
        </NavLink>
        <NavLink 
          to="/dashboard/settings"
          className={({isActive}) => `${isActive ? 'bg-[#f6f6f6] text-[#0B544C]' : 'hover:bg-[#f6f6f6]  hover:text-[#0B544C]'}`}
        >
          <Cog6ToothIcon/>
          <span>Settings</span>
        </NavLink>
        <NavLink 
          to="/dashboard/logout"
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