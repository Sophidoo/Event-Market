import { ChevronLeftIcon, ChevronRightIcon, HeartIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, HomeIcon, CalendarDateRangeIcon, BriefcaseIcon, InboxStackIcon, Squares2X2Icon, ClipboardDocumentCheckIcon, UserCircleIcon, Bars3Icon, MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import "../styles/componentStyle/Navbar.css"
import "../styles/Home.css"
import { NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Home = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showResponsiveMenu, setShowResponsiveMenu] = useState(false)
    const [searchDetails, setSearchDetails] = useState({
        category: "",
        start_date: "",
        end_date: "",
        location: ""
    })
    
    const swiperRef = useRef();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const decideMenuToShow = (decision) => {
        if(decision === "menu"){
            setShowMenu(!showMenu)
            setShowResponsiveMenu(false)
        }else if(decision === "responsive"){
            setShowResponsiveMenu(!showResponsiveMenu)
            setShowMenu(false)
        }
    }
    const handleSearch = (e) => {
        e.preventDefault();
        navigate("/rentals", {
            state: searchDetails
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchDetails((prev) => ({
            ...prev,
            [name]: value, 
        }));
    };
    return <>
        <section className="homeHeroSection">
            <nav className={`text-white flex justify-between ${scrolled ? "bg-[#0B5850]" : ""}`}>
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
                    <HeartIcon/>

                    <div className="userProfile bg-[#136B61]  ">
                        <img   src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?uid=R95769918&ga=GA1.1.837528501.1678343204&semt=ais_items_boosted&w=740" alt="" />
                        <ChevronDownIcon className='cursor-pointer' onClick={() => decideMenuToShow("menu")}/>
                        <div className={showMenu ? "navMenu heroNavMenu z-10 bg-white" : "hide" }>
                            <NavLink 
                                to="/dashboard"
                                className={({isActive}) => `text-[#0B5850] ${isActive ? 'bg-[rgb(11, 84, 76, 0.11)]' : ''}`}
                            ><Squares2X2Icon/> Dashboard</NavLink>
                            {/* <hr className='border-[0.5px] border-gray-100'/> */}
                            <NavLink 
                                to="/bookings"
                                className={({isActive}) => `text-[#0B5850] ${isActive ? 'bg-[rgb(11, 84, 76, 0.11)]' : ''}`}
                            ><ClipboardDocumentCheckIcon/> Bookings</NavLink>
                            {/* <hr className='border-[0.5px] border-gray-100'/> */}
                            <NavLink
                                to="/wishlist"
                                className={({isActive}) => `text-[#0B5850] ${isActive ? 'bg-[rgb(11, 84, 76, 0.11)]' : ''}`}
                            ><HeartIcon/> Wishlist</NavLink>
                            {/* <hr className='border-[0.5px] border-gray-100'/> */}
                            <NavLink
                                to="/profile"
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
                </div> */}

                <div className={showResponsiveMenu && window.innerWidth <= 870 ? "navMenu navMenu2 heroNavMenu z-10 bg-white" : "hide"}>
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

            <div className="homeHeroHeading text-white">
                <h1>Event Rentals Made Easy</h1>
                <p className='text-gray-200'>Everything You Need to Make Events Unforgettable.</p>
            </div>

            <form className="homeHeroForm bg-white" onSubmit={handleSearch}>
                <div className="inputWrapper border-r-gray-200">
                    <label htmlFor="" className='text-gray-600'>
                        CATEGORY
                    </label>
                    <select name="category" id="" value={searchDetails.category} onChange={handleChange}>
                        <option value="" >Select Category</option>
                    </select>
                </div>
                <div className="inputWrapper border-r-gray-200">
                    <label htmlFor=""  className='text-gray-600'>
                        RENT START DATE
                    </label>
                    <input type="date" name="start_date" id="" value={searchDetails.start_date} onChange={handleChange} placeholder='dd/mm/yyyy'/>
                </div>
                <div className="inputWrapper border-r-gray-200">
                    <label htmlFor=""  className='text-gray-600'>
                        RENT END DATE
                    </label>
                    <input type="date" name="end_date" id="" value={searchDetails.end_date} onChange={handleChange}/>
                </div>
                <div className="inputWrapper">
                    <label htmlFor=""  className='text-gray-600'>
                        LOCATION
                    </label>
                    <select name="location" id="" value={searchDetails.location} onChange={handleChange}>
                        <option value="">
                            Select Location
                        </option>
                    </select>
                </div>
                <button type='submit' disabled={loading} className='bg-[#0B5850] text-white'> {loading ? "Loading..." : (<> <MagnifyingGlassIcon/> Search</>)}</button>
            </form>
        </section>

        <section className='itemsWrapper'>
            <div className="itemsHolder">
                <div className="itemsWrapperHeading">
                    <h2>Most Booked Rentals <ChevronRightIcon/></h2>
                    <div className="itemsArrow">
                        <ChevronLeftIcon className='border-gray-300 text-gray-400 hover:bg-gray-200'  onClick={() => swiperRef.current?.slidePrev()}/>
                        <ChevronRightIcon className='border-gray-300 text-gray-400 hover:bg-gray-200'  onClick={() => swiperRef.current?.slideNext()}/>
                    </div>
                </div>
                <Swiper
                    modules={[Navigation, A11y]}
                    spaceBetween={30}
                    className="mySwiper"
                    slidesPerView={5}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    breakpoints={{
                        // when the window width is >= 320px
                        100: {
                        slidesPerView: 1.5,
                        spaceBetween: 20,
                        },
                        500: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                        },
                        // when the window width is >= 640px
                        650: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                        },
                        // when the window width is >= 1024px
                        1024: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                        },
                    }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    <SwiperSlide >
                        <div className="itemCard">
                            <img src="" alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide >
                        <div className="itemCard">
                            <img src="" alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide >
                        <div className="itemCard">
                            <img src="" alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide >
                        <div className="itemCard">
                            <img src="" alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide >
                        <div className="itemCard">
                            <img src="" alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide >
                        <div className="itemCard">
                            <img src="" alt="" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    </>

}

export default Home