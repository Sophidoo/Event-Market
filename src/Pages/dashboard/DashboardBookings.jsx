

import { ChevronRightIcon, CheckIcon, MagnifyingGlassIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import "../../styles/dashboard/Rentals.css"

const DashboardBookings = () => {

    return<>
        <div className="rentalsContainer">
            <div className="overviewHeader">
                <h1>
                    Dashboard <ChevronRightIcon/>
                    <span className="text-gray-600">Bookings</span>
                </h1>

                <div className="overviewHeaderProfile">
                    <img src={null} alt="" />

                    <div className="overviewHeaderProfileDetails">
                        <h4>Sophia Okosodo</h4>
                        <p className="text-gray-700">Vendor</p>
                    </div>
                </div>
            </div>

            <hr className="border-t-[1px] border-gray-200"/>

            <div className="rentalHeader">
                <div className="rentalSearch border-[1px] border-gray-300 bg-white">
                    <MagnifyingGlassIcon className="text-gray-700"/>
                    <input type="text" placeholder="Search" className="text-gray-700"/>
                </div>

                <div className="rentalTabWrapper border-gray-200 border-[1px] ">
                    <p className="border-r-[1px] border-gray-200 text-gray-600 hover:text-black hover:bg-gray-100">Rentals <span className="border-gray-300 border-[1px]">63</span></p>
                    <p className="border-r-[1px] border-gray-200 text-gray-600 hover:text-black hover:bg-gray-100">Services <span className="border-gray-300 border-[1px]">0</span></p>
                    <p className="border-r-[1px] border-gray-200 text-gray-600 hover:text-black hover:bg-gray-100">Packages <span className="border-gray-300 border-[1px] ">0</span></p>
                    <p className="text-gray-600 hover:text-black hover:bg-gray-100">History <span className="border-gray-300 border-[1px] ">0</span></p>
                </div>

            </div>

            

            <div className="rentalTableScroll overflox-x-auto">
                <table>
                    <thead className=" text-black border-b-[1px] border-gray-200 border-t-[1px] bg-gray-200">
                        <th>Id</th>
                        <th>
                            Item
                        </th>
                        <th>Booked by</th>
                        <th>Quantity</th>
                        <th>Location</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th></th>
                        <th></th>
                    </thead>
                    <tbody >
                        <tr className="border-b-[1px] border-gray-200">
                            <td>1</td>
                            <td>
                                <div className="rentalItem">
                                    <img src="" alt="" />
                                    <div className="rentalItemDetails">
                                        <h3>Banquet Chairs</h3>
                                        <p>Furniture</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="rentalItem">
                                    <div className="rentalItemDetails">
                                        <h3>Martin Yellow</h3>
                                        <p>sophieokosodo@gmail.com</p>
                                    </div>
                                </div>
                            </td>
                            <td>500</td>
                            <td>Port harcourt, Rivers State, Nigeria</td>
                            <td>5th May, 2025</td>
                            <td>8th May, 2025</td>
                            <td><CheckIcon/></td>
                            <td><XMarkIcon/></td>
                        </tr>
                        <tr className="border-b-[1px] border-gray-200">
                            <td>1</td>
                            <td>
                                <div className="rentalItem">
                                    <img src="" alt="" />
                                    <div className="rentalItemDetails">
                                        <h3>Banquet Chairs</h3>
                                        <p>Furniture</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="rentalItem">
                                    <div className="rentalItemDetails">
                                        <h3>Martin Yellow</h3>
                                        <p>sophieokosodo@gmail.com</p>
                                    </div>
                                </div>
                            </td>
                            <td>500</td>
                            <td>Port harcourt, Rivers State, Nigeria</td>
                            <td>5th May, 2025</td>
                            <td>8th May, 2025</td>
                            <td><CheckIcon/></td>
                            <td><XMarkIcon/></td>
                        </tr>
                        <tr className="border-b-[1px] border-gray-200">
                            <td>1</td>
                            <td>
                                <div className="rentalItem">
                                    <img src="" alt="" />
                                    <div className="rentalItemDetails">
                                        <h3>Banquet Chairs</h3>
                                        <p>Furniture</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="rentalItem">
                                    <div className="rentalItemDetails">
                                        <h3>Martin Yellow</h3>
                                        <p>sophieokosodo@gmail.com</p>
                                    </div>
                                </div>
                            </td>
                            <td>500</td>
                            <td>Port harcourt, Rivers State, Nigeria</td>
                            <td>5th May, 2025</td>
                            <td>8th May, 2025</td>
                            <td><CheckIcon/></td>
                            <td><XMarkIcon/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>

}

export default DashboardBookings;