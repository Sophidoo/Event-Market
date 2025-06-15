import { ChevronRightIcon, PencilSquareIcon, MagnifyingGlassIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import "../../styles/dashboard/Rentals.css"
import { useNavigate } from "react-router";

const DashboardRentals = () => {

    const navigate = useNavigate();

    return<>
        <div className="rentalsContainer">
            <div className="overviewHeader">
                <h1>
                    Dashboard <ChevronRightIcon/>
                    <span className="text-gray-600">Rentals</span>
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
                    <p className="border-r-[1px] border-gray-200 text-gray-600 hover:text-black hover:bg-white">All <span className="border-gray-300 border-[1px]">63</span></p>
                    <p className="border-r-[1px] border-gray-200 text-gray-600 hover:text-black hover:bg-white">Available <span className="border-gray-300 border-[1px]">0</span></p>
                    <p className="text-gray-600 hover:text-black hover:bg-white">Booked <span className="border-gray-300 border-[1px] ">0</span></p>
                </div>

                <button className="bg-[#0B544C] text-white hover:bg-[#128D7F]">Add Rentals <PlusIcon/> </button>
            </div>

            <div className="rentalTableScroll overflox-x-auto">
                <table>
                    <thead className="bg-gray-200 text-black">
                        <th>Id</th>
                        <th>
                            Item
                        </th>
                        <th>Unit Price (N)</th>
                        <th>Location</th>
                        <th>Instant Booking</th>
                        <th>Status</th>
                        <th>Rating</th>
                        <th></th>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr className="border-b-[1px] border-gray-200" onClick={() => navigate("1")}>
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
                            <td>300</td>
                            <td>Port harcourt, Rivers State, Nigeria</td>
                            <td>Enabled</td>
                            <td>Booked</td>
                            <td>4.3</td>
                            <td><PencilSquareIcon/></td>
                            <td><TrashIcon/></td>
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
                            <td>300</td>
                            <td>Port harcourt, Rivers State, Nigeria</td>
                            <td>Enabled</td>
                            <td>Available</td>
                            <td>4.3</td>
                            <td><PencilSquareIcon/></td>
                            <td><TrashIcon/></td>
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
                            <td>300</td>
                            <td>Port harcourt, Rivers State, Nigeria</td>
                            <td>Disabled</td>
                            <td>Not Available</td>
                            <td>4.3</td>
                            <td><PencilSquareIcon/></td>
                            <td><TrashIcon/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>

}

export default DashboardRentals;