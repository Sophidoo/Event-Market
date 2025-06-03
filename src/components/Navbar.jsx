import { HeartIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, HomeIcon, CalendarDateRangeIcon, BriefcaseIcon, InboxStackIcon} from '@heroicons/react/24/solid'
import "../styles/componentStyle/Navbar.css"

const Navbar = () => {
    
    return<>
        <nav className="text-white bg-[#0B5850] flex justify-between">
            <div className="leftNav">
                <img src="" alt="" />
                <ul>
                    <li className='hover:bg-white hover:text-[#0B5850]'><HomeIcon/> Home</li>
                    <li className='hover:bg-white hover:text-[#0B5850]'><CalendarDateRangeIcon/> Rentals</li>
                    <li className='hover:bg-white hover:text-[#0B5850]'><BriefcaseIcon/> Services</li>
                    <li className='hover:bg-white hover:text-[#0B5850]'><InboxStackIcon/> Packages</li>
                </ul>
            </div>

            <div className="rightNav">
                <HeartIcon/>

                <div className="userProfile bg-[#136B61]">
                    <img   src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?uid=R95769918&ga=GA1.1.837528501.1678343204&semt=ais_items_boosted&w=740" alt="" />
                    <ChevronDownIcon/>
                </div>
            </div>
{/* 
            <div className="rightNavButton flex gap-1 align-middle">
                <button className='underline'>Create an account</button>
                <button className='border-[1px] border-white rounded-sm text-[#073732] px-3 py-1 text-white'>Login</button>
            </div> */}
        </nav>
    </>

}

export default Navbar