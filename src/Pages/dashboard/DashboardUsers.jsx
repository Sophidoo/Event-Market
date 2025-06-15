

import { ChevronRightIcon, CheckIcon, MagnifyingGlassIcon, PlusIcon, XMarkIcon, UserMinusIcon } from "@heroicons/react/24/outline";
import "../../styles/dashboard/Rentals.css"

const DashboardUsers = () => {

    return<>
        <div className="rentalsContainer">
            <div className="overviewHeader">
                <h1>
                    Dashboard <ChevronRightIcon/>
                    <span className="text-gray-600">Users</span>
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
                    <p className="border-r-[1px] border-gray-200 text-gray-600 hover:text-black hover:bg-gray-100">All <span className="border-gray-300 border-[1px]">63</span></p>
                    <p className="border-r-[1px] border-gray-200 text-gray-600 hover:text-black hover:bg-gray-100">Organizers <span className="border-gray-300 border-[1px]">0</span></p>
                    <p className="border-r-[1px] border-gray-200 text-gray-600 hover:text-black hover:bg-gray-100">Vendors <span className="border-gray-300 border-[1px] ">0</span></p>
                </div>

            </div>

            

            <div className="rentalTableScroll overflox-x-auto">
                <table>
                    <thead className=" text-black border-b-[1px] border-gray-200 border-t-[1px] bg-gray-200">
                    <th>Id</th>
                        <th>
                            User
                        </th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Account Status</th>
                        <th>Joined</th>
                        <th></th>
                    </thead>
                    <tbody >
                        <tr className="border-b-[1px] border-gray-200">
                            <td>1</td>
                            
                            <td>
                                <div className="rentalItem">
                                    <img src="" alt="" />
                                    <div className="rentalItemDetails">
                                        <h3>John Doe</h3>
                                        <p>Vendor</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                johndoe@gmail.com
                            </td>
                            <td>08104009853</td>
                            <td className="max-w-[250px] whitespace-normal break-words"> No 8, Wachinike Street, OroIgwe road, Port harcourt, Rivers State, Nigeria</td>
                            <td>Verified</td>
                            <td>8th May, 2025</td>
                            <td><UserMinusIcon/></td>
                        </tr>
                        <tr className="border-b-[1px] border-gray-200">
                            <td>1</td>
                            
                            <td>
                                <div className="rentalItem">
                                    <img src="" alt="" />
                                    <div className="rentalItemDetails">
                                        <h3>John Doe</h3>
                                        <p>Vendor</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                johndoe@gmail.com
                            </td>
                            <td>08104009853</td>
                            <td className="max-w-[250px] whitespace-normal break-words"> No 8, Wachinike Street, OroIgwe road, Port harcourt, Rivers State, Nigeria</td>
                            <td>Verified</td>
                            <td>8th May, 2025</td>
                            <td><UserMinusIcon/></td>
                        </tr>
                        <tr className="border-b-[1px] border-gray-200">
                            <td>1</td>
                            
                            <td>
                                <div className="rentalItem">
                                    <img src="" alt="" />
                                    <div className="rentalItemDetails">
                                        <h3>John Doe</h3>
                                        <p>Vendor</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                johndoe@gmail.com
                            </td>
                            <td>08104009853</td>
                            <td className="max-w-[250px] whitespace-normal break-words"> No 8, Wachinike Street, OroIgwe road, Port harcourt, Rivers State, Nigeria</td>
                            <td>Verified</td>
                            <td>8th May, 2025</td>
                            <td><UserMinusIcon/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>

}

export default DashboardUsers;