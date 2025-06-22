import { FiEdit2, FiPlus, FiUploadCloud } from "react-icons/fi"
import "../../styles/dashboard/Inventory.css"
import { ChevronRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { FaCheck, FaMinus } from "react-icons/fa6";
import { BsFilter } from "react-icons/bs"
import { IoIosArrowRoundDown, IoIosArrowRoundUp, IoMdArrowDown } from "react-icons/io"
import { RiDeleteBinLine } from "react-icons/ri"
import { FaCircle } from "react-icons/fa"
import { useState } from "react"; // Import useState hook
import DeleteItemModal from "../../components/Modals/DeleteItemModal";
import { useNavigate } from "react-router";

const DashboardInventory = () => {
    // State to track which rows are checked/minus
    const [checkedRows, setCheckedRows] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    // Function to toggle between check and minus
    const toggleRowCheck = (rowId) => {
        setCheckedRows(prev => ({
            ...prev,
            [rowId]: !prev[rowId]
        }));
    };

    const navigate = useNavigate();

    // Sample data for the table rows
    const items = [
  {
    itemName: "火",
    category: "Rentals",
    subCategory: "Event Equipment",
    lowestOfferPerUnit: 25.00,
    locationType: ["Abuja", "Lagos", "Anambra"],
    bookingType: "Instant",
    quantityAvailable: 10,
    status: "Available",
    imageUrl: "https://example.com/images/fire-equipment.jpg"
  },
  {
    itemName: "Luxury Party Tent",
    category: "Rentals",
    subCategory: "Party Supplies",
    lowestOfferPerUnit: 150.00,
    locationType: ["Port Harcourt"],
    bookingType: "Instant",
    quantityAvailable: 5,
    status: "Available",
    imageUrl: "https://example.com/images/tent.jpg"
  },
  {
    itemName: "Professional Camera Kit",
    category: "Rentals",
    subCategory: "Electronics",
    lowestOfferPerUnit: 75.50,
    locationType: ["Worldwide"],
    bookingType: "Schedule",
    quantityAvailable: 3,
    status: "Low Stock",
    imageUrl: "https://example.com/images/camera.jpg"
  },
  {
    itemName: "Home Cleaning Service",
    category: "Services",
    subCategory: "Home Services",
    lowestOfferPerUnit: 40.00,
    locationType: ["Abuja"],
    bookingType: "Schedule",
    quantityAvailable: 15,
    status: "Available",
    imageUrl: "https://example.com/images/cleaning.jpg"
  },
  {
    itemName: "Wedding Photography",
    category: "Services",
    subCategory: "Professional Services",
    lowestOfferPerUnit: 200.00,
    locationType: ["Nigeria"],
    bookingType: "Instant",
    quantityAvailable: 8,
    status: "Available",
    imageUrl: "https://example.com/images/photography.jpg"
  },
  {
    itemName: "Beach Vacation Package",
    category: "Packages",
    subCategory: "Vacation",
    lowestOfferPerUnit: 1200.00,
    locationType: ["Worldwide"],
    bookingType: "Request",
    quantityAvailable: 12,
    status: "Available",
    imageUrl: "https://example.com/images/beach.jpg"
  },
  {
    itemName: "Power Generator",
    category: "Rentals",
    subCategory: "Tools",
    lowestOfferPerUnit: 60.00,
    locationType: ["Lagos", "Port Harcourt"],
    bookingType: "Instant",
    quantityAvailable: 7,
    status: "Available",
    imageUrl: "https://example.com/images/generator.jpg"
  },
  {
    itemName: "Personal Trainer Session",
    category: "Services",
    subCategory: "Health & Wellness",
    lowestOfferPerUnit: 35.00,
    locationType: ["Abuja"],
    bookingType: "Instant",
    quantityAvailable: 20,
    status: "Available",
    imageUrl: "https://example.com/images/trainer.jpg"
  },
  {
    itemName: "DJ Equipment Set",
    category: "Rentals",
    subCategory: "Event Equipment",
    lowestOfferPerUnit: 90.00,
    locationType: ["Lagos"],
    bookingType: "Schedule",
    quantityAvailable: 4,
    status: "Low Stock",
    imageUrl: "https://example.com/images/dj-equipment.jpg"
  },
  {
    itemName: "Language Tutoring",
    category: "Services",
    subCategory: "Education",
    lowestOfferPerUnit: 25.00,
    locationType: ["Online"],
    bookingType: "Schedule",
    quantityAvailable: 30,
    status: "Available",
    imageUrl: "https://example.com/images/tutoring.jpg"
  },
  {
    itemName: "Camping Gear Package",
    category: "Packages",
    subCategory: "Experience",
    lowestOfferPerUnit: 85.00,
    locationType: ["Nigeria"],
    bookingType: "Request",
    quantityAvailable: 6,
    status: "Available",
    imageUrl: "https://example.com/images/camping.jpg"
  },
  {
    itemName: "Projector Rental",
    category: "Rentals",
    subCategory: "Electronics",
    lowestOfferPerUnit: 45.00,
    locationType: ["Abuja", "Lagos", "Port Harcourt"],
    bookingType: "Request",
    quantityAvailable: 9,
    status: "Available",
    imageUrl: "https://example.com/images/projector.jpg"
  },
  {
    itemName: "Catering Service",
    category: "Services",
    subCategory: "Home Services",
    lowestOfferPerUnit: 15.00,
    locationType: ["Lagos"],
    bookingType: "Request",
    quantityAvailable: 25,
    status: "Available",
    imageUrl: "https://example.com/images/catering.jpg"
  },
  {
    itemName: "Anniversary Gift Package",
    category: "Packages",
    subCategory: "Gift",
    lowestOfferPerUnit: 65.00,
    locationType: ["Worldwide"],
    bookingType: "Instant",
    quantityAvailable: 50,
    status: "Available",
    imageUrl: "https://example.com/images/gift.jpg"
  },
  {
    itemName: "Drone Rental",
    category: "Rentals",
    subCategory: "Electronics",
    lowestOfferPerUnit: 110.00,
    locationType: ["Abuja"],
    bookingType: "Instant",
    quantityAvailable: 2,
    status: "Low Stock",
    imageUrl: "https://example.com/images/drone.jpg"
  },
  {
    itemName: "Car Wash Service",
    category: "Services",
    subCategory: "Home Services",
    lowestOfferPerUnit: 20.00,
    locationType: ["Port Harcourt"],
    bookingType: "Instant",
    quantityAvailable: 18,
    status: "Available",
    imageUrl: "https://example.com/images/carwash.jpg"
  },
  {
    itemName: "VIP Concert Package",
    category: "Packages",
    subCategory: "Experience",
    lowestOfferPerUnit: 350.00,
    locationType: ["Lagos"],
    bookingType: "Instant",
    quantityAvailable: 15,
    status: "Available",
    imageUrl: "https://example.com/images/concert.jpg"
  },
  {
    itemName: "Sound System",
    category: "Rentals",
    subCategory: "Event Equipment",
    lowestOfferPerUnit: 70.00,
    locationType: ["Abuja", "Port Harcourt"],
    bookingType: "Instant",
    quantityAvailable: 5,
    status: "Available",
    imageUrl: "https://example.com/images/soundsystem.jpg"
  },
  {
    itemName: "Graphic Design Service",
    category: "Services",
    subCategory: "Professional Services",
    lowestOfferPerUnit: 50.00,
    locationType: ["Online"],
    bookingType: "Schedule",
    quantityAvailable: 40,
    status: "Available",
    imageUrl: "https://example.com/images/design.jpg"
  },
  {
    itemName: "Christmas Decor Package",
    category: "Packages",
    subCategory: "Seasonal",
    lowestOfferPerUnit: 95.00,
    locationType: ["Nigeria"],
    bookingType: "Schedule",
    quantityAvailable: 22,
    status: "Available",
    imageUrl: "https://example.com/images/christmas.jpg"
  }
];

    return <>
    {showDeleteModal && (
        <DeleteItemModal
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
                    <span className="text-gray-600">Inventory</span></h2>
                    <p className="text-gray-500">Keep track of item/product  inventory.</p>
                </div>
                <div className="rightInventoryHeading">
                    <button className="border-gray-300 border-[1px] bg-white text-gray-700 hover:text-black"><FiUploadCloud /> Import</button>
                    <button className="border-[#0B544C] border-[1px] bg-[#0B544C] text-white hover:bg-green-800" onClick={() => navigate("add")}><FiPlus /> Add Item</button>
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


            <div className="inventoryCardWrapper">
                <div className="inventoryCard bg-white border-gray-200 border-[1px]">
                    <p className="text-gray-500">TOTAL RENTALS</p>
                    <h1>245 <span className="text-green-500">+36% <IoIosArrowRoundUp /></span></h1>
                </div>
                <div className="inventoryCard bg-white border-gray-200 border-[1px]">
                    <p className="text-gray-500">TOTAL SERVICES</p>
                    <h1>12 <span className="text-red-500">+14% <IoIosArrowRoundDown /></span></h1>
                </div>
                <div className="inventoryCard bg-white border-gray-200 border-[1px]">
                    <p className="text-gray-500">TOTAL PACKAGES</p>
                    <h1>10 <span className="text-green-500">+36% <IoIosArrowRoundUp /></span></h1>
                </div>
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full">
                    <thead className="text-gray-500">
                        <tr className="border-b-[1px] border-gray-200">
                            <th scope="col">
                                <div className="tableHeadingDiv">
                                    <p>Item Name <IoMdArrowDown /></p>
                                </div>
                            </th>
                            <th scope="col" className="">
                                Category
                            </th>
                            <th scope="col" className="">
                                Price(N)
                            </th>
                            <th scope="col" className="">
                                Service Areas
                            </th>
                            <th scope="col" className="">
                                Booking Type
                            </th>
                            <th scope="col" className="">
                                Current Qty
                            </th>
                            <th scope="col" className="">
                                Status
                            </th>
                            <th scope="col" className="w-1"></th>
                            <th scope="col" className="w-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="bg-white border-b-[1px] border-gray-200">
                                <td scope="row" className="font-medium whitespace-nowrap text-gray-800">
                                    <div className="tableProductDetails">
                                        
                                        <img src={item.imageUrl} alt="" />
                                        <p>{item.itemName} <br/><span className="text-gray-500 text-[11px]">{item.subCategory}</span></p>
                                    </div>
                                </td>
                                <td className="text-gray-500 ">{item.category}</td>
                                <td className="text-gray-500">
                                    {item.lowestOfferPerUnit}
                                </td>
                                <td className="text-gray-500">
                                    {item.locationType?.map(el => {return el +", "})}
                                </td>
                                <td className="text-gray-500">
                                    {item.bookingType}
                                </td>
                                <td className="text-gray-500">
                                    {item.quantityAvailable}
                                </td>
                                <td className="text-gray-500">
                                    <div className={`coloredColumn ${item.status === 'Available' ? 'bg-[#ECFDF3] text-green-600' : item.status === "Low Stock" ? 'bg-yellow-50 text-yellow-600': 'bg-red-100 text-red-600'}`}>
                                        <FaCircle />
                                        {item.status}
                                    </div>
                                </td>
                                <td className="text-gray-500 cursor-pointer" onClick={() => setShowDeleteModal(true)}>
                                    <RiDeleteBinLine />
                                </td>
                                <td className="text-gray-500 cursor-pointer">
                                    <FiEdit2 />
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

export default DashboardInventory;