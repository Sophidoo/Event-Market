import { FiDownloadCloud, FiEdit2, FiPlus, FiUploadCloud } from "react-icons/fi"
import "../../styles/dashboard/Inventory.css"
import "../../styles/dashboard/Rentals.css"
import { ChevronRightIcon, EllipsisVerticalIcon, MagnifyingGlassIcon, UserMinusIcon } from "@heroicons/react/24/outline"
import { FaCheck, FaMinus } from "react-icons/fa6";
import { BsFilter } from "react-icons/bs"
import { IoIosArrowRoundDown, IoIosArrowRoundUp, IoMdArrowDown } from "react-icons/io"
import { RiDeleteBinLine } from "react-icons/ri"
import { FaCircle } from "react-icons/fa"
import { useState } from "react";
import SuspendUserModal from "../../components/Modals/SuspendUserModal";
import { NavLink } from "react-router-dom";


const DashboardBookings = () => {
    const [tableMenu, setTableMenu] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    // Function to toggle between check and minus
    const toggleTableMenu = (rowId) => {
        setTableMenu(prev => prev === rowId ? null : rowId); // Toggle menu for the clicked row
    };

    const bookingsData = [
    {
        id: "BK-2025-001",
        itemName: "Banquet Chairs",
        category: "Furniture",
        imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        bookedBy: "Martin Yellow",
        email: "sophieokosodo@gmail.com",
        quantity: 500,
        location: "Port Harcourt, Rivers State",
        status: "Pending",
        startDate: "5th May, 2025",
        endDate: "8th May, 2025"
    },
    {
        id: "BK-2025-002",
        itemName: "LED Projector",
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        bookedBy: "Chioma Eze",
        email: "chioma.e@example.com",
        quantity: 3,
        location: "Victoria Island, Lagos",
        status: "Approved",
        startDate: "12th June, 2025",
        endDate: "15th June, 2025"
    },
    {
        id: "BK-2025-003",
        itemName: "10x10 Canopy Tent",
        category: "Event Equipment",
        imageUrl: "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        bookedBy: "Emeka Okafor",
        email: "emeka.o@example.com",
        quantity: 8,
        location: "GRA, Benin City",
        status: "In Use",
        startDate: "20th March, 2025",
        endDate: "22nd March, 2025"
    },
    {
        id: "BK-2025-004",
        itemName: "Portable PA System",
        category: "Audio Equipment",
        imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        bookedBy: "Amina Yusuf",
        email: "amina.y@example.com",
        quantity: 2,
        location: "Kano Municipal",
        status: "Completed",
        startDate: "7th July, 2025",
        endDate: "9th July, 2025"
    },
    {
        id: "BK-2025-005",
        itemName: "6ft Round Tables",
        category: "Furniture",
        imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        bookedBy: "Gbenga Olawale",
        email: "gbenga.o@example.com",
        quantity: 30,
        location: "Ikeja, Lagos",
        status: "Pending",
        startDate: "18th August, 2025",
        endDate: "20th August, 2025"
    },
    {
        id: "BK-2025-006",
        itemName: "10ft LED Wall",
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1592155931584-901ac15763e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        bookedBy: "Folake Adeleke",
        email: "folake.a@example.com",
        quantity: 1,
        location: "Central Business District, Abuja",
        status: "Approved",
        startDate: "3rd September, 2025",
        endDate: "5th September, 2025"
    },
    {
        id: "BK-2025-007",
        itemName: "Commercial Blender Set",
        category: "Kitchen Equipment",
        imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        bookedBy: "Ngozi Okonkwo",
        email: "ngozi.o@example.com",
        quantity: 5,
        location: "Aba, Abia State",
        status: "Cancelled",
        startDate: "14th October, 2025",
        endDate: "16th October, 2025"
    },
    {
        id: "BK-2025-008",
        itemName: "Modular Stage",
        category: "Event Equipment",
        imageUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        bookedBy: "Ikechukwu Nwankwo",
        email: "ikechukwu.n@example.com",
        quantity: 12,
        location: "Enugu Metropolis",
        status: "Delivered",
        startDate: "22nd November, 2025",
        endDate: "24th November, 2025"
    },
    {
        id: "BK-2025-009",
        itemName: "Chiavari Chairs",
        category: "Furniture",
        imageUrl: "https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        bookedBy: "Yemi Alade",
        email: "yemi.a@example.com",
        quantity: 150,
        location: "Lekki Phase 1, Lagos",
        status: "Pending ",
        startDate: "5th December, 2025",
        endDate: "7th December, 2025"
    },
    {
        id: "BK-2025-010",
        itemName: "Wireless Microphone Set",
        category: "Audio Equipment",
        imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        bookedBy: "Oluwatobi Johnson",
        email: "oluwatobi.j@example.com",
        quantity: 6,
        location: "Uyo, Akwa Ibom",
        status: "Approved",
        startDate: "10th January, 2026",
        endDate: "12th January, 2026"
    }
    ];

     return <>
        {showDeleteModal && (
            <SuspendUserModal
            onClose={() => setShowDeleteModal(false)}
            onConfirm={() => {
                handleDeleteItem();
                setShowDeleteModal(false);
            }}
            />
        )}
        <div className="adminInventoryWrapper ">
            
            
            <div className="adminInventoryHeading">
                <div className="leftInventoryHeading">
                    <h2>Dashboard <ChevronRightIcon/>
                    <span className="text-gray-600">Bookings</span></h2>
                    <p className="text-gray-500">Keep track of bookings made by users and remember to approve or reject those pending requests</p>
                </div>
                <div className="rightInventoryHeading">
                    <button className="border-[#0B544C] border-[1px] bg-[#0B544C] text-white hover:bg-green-800 "><FiDownloadCloud /> Download</button>
                </div>
            </div>

            <div className="inventorySubHeading">
                <div className="inventoryTabWrapper bg-white border-[1px] border-gray-300 ">
                    <p className="text-black">Rentals</p>
                    <p className="border-r-[1px] border-l-[1px] border-gray-300 text-gray-700">Services</p>
                    <p className="text-gray-700">Packages</p>
                </div>

                <div className="inventoryRightSubHeading">
                    <form action="" className="text-gray-500 border-[1px] bg-white border-gray-300">
                        <MagnifyingGlassIcon/>
                        <input type="search" placeholder="Search" name="" id="" />
                    </form>
                </div>
            </div>

            <div className="relative overflow-x-auto mt-[-20px]">
                <table className="w-full">
                    <thead className="text-gray-500">
                        <tr className="border-b-[1px] border-gray-200">
                            <th scope="col">
                                <div className="tableHeadingDiv">
                                    <p>Item</p>
                                </div>
                            </th>
                            <th scope="col" className="">
                                Booked by
                            </th>
                            <th scope="col" className="">
                                Quantity
                            </th>
                            <th scope="col" className="max-w-[120px]">
                                Location
                            </th>
                            <th scope="col" className="">
                                Status
                            </th>
                            <th scope="col" className="">
                                Start Date
                            </th>
                            <th scope="col" className="">
                                End Date
                            </th>
                            <th scope="col" className="w-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookingsData.map((item) => (
                            <tr key={item.id} className="bg-white border-b-[1px] border-gray-200">
                                <td scope="row" className="font-medium whitespace-nowrap text-gray-800">
                                    <div className="tableProductDetails">
                                        
                                        <img src={item.imageUrl} alt="" />
                                        <p>{item.itemName} <br/><span className="text-gray-500 text-[11px]">{item.category}</span></p>
                                    </div>
                                </td>
                                <td >
                                    <div className="tableProductDetails">
                                        <p>{item.bookedBy} <br/><span className="text-gray-500 text-[11px]">{item.email}</span></p>
                                    </div>
                                </td>
                                <td className="text-gray-500">
                                    {item.quantity}
                                </td>
                                <td className="text-gray-500">
                                    {item.location}
                                </td>
                                <td className="text-gray-500">
                                    <div className={`coloredColumn ${item.status === 'Completed' ? 'bg-[#ECFDF3] text-green-600' : item.status === 'Approved' ? 'bg-[#ECFDF3] text-green-600' : item.status === "Cancelled" ? 'bg-red-50 text-red-600': item.status === "In Use" ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'}`}>
                                        <FaCircle />
                                        {item.status}
                                    </div>
                                </td>
                                <td className="text-gray-500">
                                    {item.startDate}
                                </td>
                                <td className="text-gray-500">
                                    {item.endDate}
                                </td>
                                <td><EllipsisVerticalIcon className="w-[17px]" onClick={() => toggleTableMenu(item.id)} />
                                <div className={tableMenu === item.id ? "tableMenu bg-white border-[1px] border-gray-300 cursor-pointer" : "hide"}>
                                    <NavLink>View Item</NavLink>
                                    <NavLink>Approve Request</NavLink>
                                    <NavLink>Cancel Booking</NavLink>
                                    <NavLink>Update Status</NavLink>
                                </div>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="inventoryPagination">
                <p className="text-gray-700">Page 1 of 4</p>

                <div className="inventoryPaginationButtons">
                    <button className="border-[1px] border-gray-300">Previous</button>
                    <button className="border-[1px] border-gray-300">Next</button>
                </div>
            </div>
        </div>
    </>;

}

export default DashboardBookings;