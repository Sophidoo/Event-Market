import { HeartIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, HomeIcon, CalendarDateRangeIcon, BriefcaseIcon, InboxStackIcon, Squares2X2Icon, ClipboardDocumentCheckIcon, UserCircleIcon, Bars3Icon} from '@heroicons/react/24/solid'
import "../styles/componentStyle/Navbar.css"
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [showResponsiveMenu, setShowResponsiveMenu] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setShowMenu(false)
        setShowResponsiveMenu(false)
    }, [location.pathname])

    const decideMenuToShow = (decision) => {
        if(decision === "menu"){
            setShowMenu(!showMenu)
            setShowResponsiveMenu(false)
        }else if(decision === "responsive"){
            setShowResponsiveMenu(!showResponsiveMenu)
            setShowMenu(false)
        }
    }
    
    return<>
        <nav className="text-white bg-[#0B5850] flex justify-between">
            <div className="leftNav">
                <img src="" alt="" />
                <ul>
                    <NavLink
                        to="/"
                        className={({isActive}) => `${isActive ? 'bg-white text-[#0B5850] rounded-[25px]' : ''}`}
                    ><li className='hover:bg-white hover:text-[#0B5850]'><HomeIcon/> Home</li></NavLink>
                    <NavLink
                        to="/rentals"
                        className={({isActive}) => `${isActive ? 'bg-white text-[#0B5850] rounded-[25px]' : ''}`}
                    ><li className='hover:bg-white hover:text-[#0B5850]'><CalendarDateRangeIcon/> Rentals</li></NavLink>
                    <NavLink
                        to="/services"
                        className={({isActive}) => `${isActive ? 'bg-white text-[#0B5850] rounded-[25px]' : ''}`}
                    ><li className='hover:bg-white hover:text-[#0B5850]'><BriefcaseIcon/> Services</li></NavLink>
                    <NavLink
                        to="/packages"
                        className={({isActive}) => `${isActive ? 'bg-white text-[#0B5850] rounded-[25px]' : ''}`}
                    ><li className='hover:bg-white hover:text-[#0B5850]'><InboxStackIcon/> Packages</li></NavLink>
                </ul>
            </div>

            <div className="rightNav">
                <HeartIcon onClick={() => navigate("/my-wishlist")} className='cursor-pointer'/>

                <div className="userProfile bg-[#136B61]">
                    <img   src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?uid=R95769918&ga=GA1.1.837528501.1678343204&semt=ais_items_boosted&w=740" alt="" />
                    <ChevronDownIcon className='cursor-pointer' onClick={() => decideMenuToShow("menu")}/>
                    <div className={showMenu ? "navMenu" : "hide" }>
                        <NavLink 
                            to="/dashboard"
                            end
                            className={({isActive}) => `text-[#0B5850] ${isActive ? 'bg-[rgb(11, 84, 76, 0.11)]' : ''}`}
                        ><Squares2X2Icon/> Dashboard</NavLink>
                        {/* <hr className='border-[0.5px] border-gray-100'/> */}
                        <NavLink 
                            to="/my-bookings"
                            end
                            className={({isActive}) => `text-[#0B5850] ${isActive ? 'bg-[rgb(11, 84, 76, 0.11)]' : ''}`}
                        ><ClipboardDocumentCheckIcon/> Bookings</NavLink>
                        {/* <hr className='border-[0.5px] border-gray-100'/> */}
                        <NavLink
                            to="/my-wishlist"
                            className={({isActive}) => `text-[#0B5850] ${isActive ? 'bg-[rgb(11, 84, 76, 0.11)]' : ''}`}
                        ><HeartIcon/> Wishlist</NavLink>
                        {/* <hr className='border-[0.5px] border-gray-100'/> */}
                        <NavLink
                            to="/profile"
                            end
                            className={({isActive}) => `text-[#0B5850] ${isActive ? 'bg-[rgb(11, 84, 76, 0.11)]' : ''}`}
                        ><UserCircleIcon/> Profile</NavLink>
                    </div>
                </div>

                <Bars3Icon onClick={() => decideMenuToShow("responsive")} className='menuIcon cursor-pointer'/>
            </div>
            {/* 
                <div className="rightNavButton flex gap-1 align-middle">
                    <button className='underline'>Create an account</button>
                    <button className='border-[1px] border-white rounded-sm text-[#073732] px-3 py-1 text-white'>Login</button>
                </div> 
            */}

            <div className={showResponsiveMenu && window.innerWidth <= 870 ? "navMenu navMenu2" : "hide"}>
                <NavLink
                    to="/"
                    className={({isActive}) => `text-[#0B5850] ${isActive ? 'bg-[rgb(11, 84, 76, 0.11)]' : ''}`}
                ><HomeIcon/> Home</NavLink>
                <NavLink
                    to="/rentals"
                    className={({isActive}) => `text-[#0B5850] ${isActive ? 'bg-[rgb(11, 84, 76, 0.11)]' : ''}`}
                ><CalendarDateRangeIcon/> Rentals</NavLink>
                <NavLink
                    to="/services"
                    className={({isActive}) => `text-[#0B5850] ${isActive ? 'bg-[rgb(11, 84, 76, 0.11)]' : ''}`}
                ><BriefcaseIcon/> Services</NavLink>
                <NavLink
                    to="/packages"
                    className={({isActive}) => `text-[#0B5850] ${isActive ? 'bg-[rgb(11, 84, 76, 0.11)]' : ''}`}
                ><InboxStackIcon/> Packages</NavLink>
            </div>
        </nav>
    </>

}

export default Navbar