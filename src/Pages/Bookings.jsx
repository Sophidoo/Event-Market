import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import "../styles/Bookings.css"
import { CalendarDaysIcon } from "@heroicons/react/24/outline"
import { NavLink } from "react-router-dom"

const Bookings = () => {

    return<>
        <section className="bookingsHeading">
            <div className="leftBookingsHeading">
                <h1>My Bookings</h1>
                <p className="text-gray-600">50 Bookings Found</p>
            </div>

            <form action="" className="border-[1px] bg-[#F7F7F7] border-gray-200 text-gray-600">
                <MagnifyingGlassIcon/>
                <input type="search" placeholder="Search Here..." name="" id="" />
            </form>
        </section>

        <section className="bookingsTabWrapper border-b-[1px] border-gray-300">
            <div className="bookingsTab">
                <p className="border-b-[3px] border-[#128D7F]">Rentals <small className="border-[1px] border-gray-300">20</small></p>
                <p>Services <small className="border-[1px] border-gray-300">0</small></p>
                <p>Packages <small className="border-[1px] border-gray-300">0</small></p>
                <p>History <small className="border-[1px] border-gray-300">0</small></p>
            </div>
        </section>

        <section className="bookings">
            <div className="bookingHolder border-b-[1px] border-gray-300">
                <h2><CalendarDaysIcon/> Today, Dec 22nd, 2025</h2>

                <div className="bookingInformationContainer">
                    <div className="bookingInformation border-[1px] border-gray-200">
                        <img src="" alt="" />

                        <div className="bookingDetails">
                            <div className="bookingDetailsHeading">
                                <h3>Banquet Chairs</h3>
                                <p>Port Harcourt, Rivers State</p>
                            </div>

                            <div className="bookingOrderInfo">
                                <h4>Order Details</h4>
                                <p>
                                    <span>Qty: 500</span>
                                    <span>Unit Price: N200</span>
                                    <span>Total: N5200</span>
                                    <span>Security Deposit: N2600</span>
                                </p>
                            </div>

                            <div className="bookingVendorContact">
                                <h4>Vendor Contact</h4>
                                <div className="bookingVendorInfo">
                                    <p>
                                        <span>Phone: +2348104009853</span>
                                        <span>Email: sophieokosodogmail.com</span>
                                        <span>Name: Megvin Rentals</span>
                                    </p>
                                    <NavLink className="text-[#0B544C]">View Item</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bookingInformation border-[1px] border-gray-200">
                        <img src="" alt="" />

                        <div className="bookingDetails">
                            <div className="bookingDetailsHeading">
                                <h3>Banquet Chairs</h3>
                                <p>Port Harcourt, Rivers State</p>
                            </div>

                            <div className="bookingOrderInfo">
                                <h4>Order Details</h4>
                                <p>
                                    <span>Qty: 500</span>
                                    <span>Unit Price: N200</span>
                                    <span>Total: N5200</span>
                                    <span>Security Deposit: N2600</span>
                                </p>
                            </div>

                            <div className="bookingVendorContact">
                                <h4>Vendor Contact</h4>
                                <div className="bookingVendorInfo">
                                    <p>
                                        <span>Phone: +2348104009853</span>
                                        <span>Email: sophieokosodogmail.com</span>
                                        <span>Name: Megvin Rentals</span>
                                    </p>
                                    <NavLink className="text-[#0B544C]">View Item</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bookingInformation border-[1px] border-gray-200">
                        <img src="" alt="" />

                        <div className="bookingDetails">
                            <div className="bookingDetailsHeading">
                                <h3>Banquet Chairs</h3>
                                <p>Port Harcourt, Rivers State</p>
                            </div>

                            <div className="bookingOrderInfo">
                                <h4>Order Details</h4>
                                <p>
                                    <span>Qty: 500</span>
                                    <span>Unit Price: N200</span>
                                    <span>Total: N5200</span>
                                    <span>Security Deposit: N2600</span>
                                </p>
                            </div>

                            <div className="bookingVendorContact">
                                <h4>Vendor Contact</h4>
                                <div className="bookingVendorInfo">
                                    <p>
                                        <span>Phone: +2348104009853</span>
                                        <span>Email: sophieokosodogmail.com</span>
                                        <span>Name: Megvin Rentals</span>
                                    </p>
                                    <NavLink className="text-[#0B544C]">View Item</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bookingHolder border-b-[1px] border-gray-200">
                <h2><CalendarDaysIcon/> Today, Dec 22nd, 2025</h2>

                <div className="bookingInformationContainer">
                    <div className="bookingInformation border-[1px] border-gray-200">
                        <img src="" alt="" />

                        <div className="bookingDetails">
                            <div className="bookingDetailsHeading">
                                <h3>Banquet Chairs</h3>
                                <p>Port Harcourt, Rivers State</p>
                            </div>

                            <div className="bookingOrderInfo">
                                <h4>Order Details</h4>
                                <p>
                                    <span>Qty: 500</span>
                                    <span>Unit Price: N200</span>
                                    <span>Total: N5200</span>
                                    <span>Security Deposit: N2600</span>
                                </p>
                            </div>

                            <div className="bookingVendorContact">
                                <h4>Vendor Contact</h4>
                                <div className="bookingVendorInfo">
                                    <p>
                                        <span>Phone: +2348104009853</span>
                                        <span>Email: sophieokosodogmail.com</span>
                                        <span>Name: Megvin Rentals</span>
                                    </p>
                                    <NavLink className="text-[#0B544C]">View Item</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bookingInformation border-[1px] border-gray-200">
                        <img src="" alt="" />

                        <div className="bookingDetails">
                            <div className="bookingDetailsHeading">
                                <h3>Banquet Chairs</h3>
                                <p>Port Harcourt, Rivers State</p>
                            </div>

                            <div className="bookingOrderInfo">
                                <h4>Order Details</h4>
                                <p>
                                    <span>Qty: 500</span>
                                    <span>Unit Price: N200</span>
                                    <span>Total: N5200</span>
                                    <span>Security Deposit: N2600</span>
                                </p>
                            </div>

                            <div className="bookingVendorContact">
                                <h4>Vendor Contact</h4>
                                <div className="bookingVendorInfo">
                                    <p>
                                        <span>Phone: +2348104009853</span>
                                        <span>Email: sophieokosodogmail.com</span>
                                        <span>Name: Megvin Rentals</span>
                                    </p>
                                    <NavLink className="text-[#0B544C]">View Item</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bookingInformation border-[1px] border-gray-200">
                        <img src="" alt="" />

                        <div className="bookingDetails">
                            <div className="bookingDetailsHeading">
                                <h3>Banquet Chairs</h3>
                                <p>Port Harcourt, Rivers State</p>
                            </div>

                            <div className="bookingOrderInfo">
                                <h4>Order Details</h4>
                                <p>
                                    <span>Qty: 500</span>
                                    <span>Unit Price: N200</span>
                                    <span>Total: N5200</span>
                                    <span>Security Deposit: N2600</span>
                                </p>
                            </div>

                            <div className="bookingVendorContact">
                                <h4>Vendor Contact</h4>
                                <div className="bookingVendorInfo">
                                    <p>
                                        <span>Phone: +2348104009853</span>
                                        <span>Email: sophieokosodogmail.com</span>
                                        <span>Name: Megvin Rentals</span>
                                    </p>
                                    <NavLink className="text-[#0B544C]">View Item</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="pagination flex flex-col items-end sm:items-end w-full">
            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-1">
                {/* Previous Button */}
                <button
                className="inline-flex items-center justify-center py-2 px-4 rounded-md text-xs sm:text-sm font-medium text-stone-800 bg-transparent border-transparent hover:bg-stone-800/5 hover:border-stone-800/5 transition disabled:opacity-50"
                >
                <svg
                    className="mr-1.5 h-4 w-4 stroke-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                    d="M15 6L9 12L15 18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                </svg>
                Previous
                </button>

                {/* Page Buttons */}
                <button className="inline-grid place-items-center min-w-[30px] min-h-[30px] rounded-md  text-xs sm:text-sm font-medium text-stone-800 bg-transparent hover:bg-stone-800/5 transition">
                1
                </button>

                <button className="inline-grid place-items-center min-w-[30px] min-h-[30px] rounded-md text-xs sm:text-sm font-medium bg-[#0B5850] text-white hover:bg-stone-700 transition">
                2
                </button>

                <button className="hidden sm:inline-grid place-items-center min-w-[30px] min-h-[30px] rounded-md text-xs sm:text-sm font-medium text-stone-800 bg-transparent hover:bg-stone-800/5 transition">
                3
                </button>

                <button className="hidden sm:inline-grid place-items-center min-w-[30px] min-h-[30px] rounded-md text-xs sm:text-sm font-medium text-stone-800 bg-transparent hover:bg-stone-800/5 transition">
                4
                </button>

                <button className="hidden md:inline-grid place-items-center min-w-[30px] min-h-[30px] rounded-md text-xs sm:text-sm font-medium text-stone-800 bg-transparent hover:bg-stone-800/5 transition">
                5
                </button>

                {/* Next Button */}
                <button
                className="inline-flex items-center justify-center py-2 px-4 rounded-md text-xs sm:text-sm font-medium text-stone-800 bg-transparent border-transparent hover:bg-stone-800/5 hover:border-stone-800/5 transition disabled:opacity-50"
                >
                Next
                <svg
                    className="ml-1.5 h-4 w-4 stroke-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                    d="M9 6L15 12L9 18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                </svg>
                </button>
            </div>
        </div>
    </>

}

export default Bookings