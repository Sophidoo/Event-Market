import { FiDownloadCloud} from "react-icons/fi"
import "../../styles/dashboard/Inventory.css"
import "../../styles/dashboard/Rentals.css"
import { ChevronRightIcon, MagnifyingGlassIcon, UserMinusIcon } from "@heroicons/react/24/outline"
import { FaCircle } from "react-icons/fa"
import { useState } from "react"; 
import SuspendUserModal from "../../components/Modals/SuspendUserModal";

const DashboardUsers = () => {
    const [checkedRows, setCheckedRows] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    // Function to toggle between check and minus
    const toggleRowCheck = (rowId) => {
        setCheckedRows(prev => ({
            ...prev,
            [rowId]: !prev[rowId]
        }));
    };

    const users = [
        {
            id: 101,
            user: "Adebayo Johnson",
            accountType: "vendor",
            email: "adebayo.j@example.com",
            phone: "+2348112233445",
            address: "14 Marina Road, Lagos Island",
            accountStatus: "active",
            joined: "2023-03-12",
            imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: 102,
            user: "Chioma Eze",
            accountType: "organizer",
            email: "chioma.e@example.com",
            phone: "+2348223344556",
            address: "25 Awolowo Road, Ikoyi",
            accountStatus: "active",
            joined: "2023-04-05",
            imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            id: 103,
            user: "Emeka Okafor",
            accountType: "vendor",
            email: "emeka.o@example.com",
            phone: "+2348334455667",
            address: "8 Aba Road, Port Harcourt",
            accountStatus: "pending",
            joined: "2023-05-18",
            imageUrl: "https://randomuser.me/api/portraits/men/75.jpg"
        },
        {
            id: 104,
            user: "Folake Adeleke",
            accountType: "organizer",
            email: "folake.a@example.com",
            phone: "+2348445566778",
            address: "42 Aminu Kano Way, Kano",
            accountStatus: "suspended",
            joined: "2023-06-22",
            imageUrl: "https://randomuser.me/api/portraits/women/63.jpg"
        },
        {
            id: 105,
            user: "Gbenga Olawale",
            accountType: "vendor",
            email: "gbenga.o@example.com",
            phone: "+2348556677889",
            address: "17 Airport Road, Abuja",
            accountStatus: "active",
            joined: "2023-07-30",
            imageUrl: "https://randomuser.me/api/portraits/men/81.jpg"
        },
        {
            id: 106,
            user: "Hadiza Bello",
            accountType: "organizer",
            email: "hadiza.b@example.com",
            phone: "+2348667788990",
            address: "5 Sokoto Road, Kaduna",
            accountStatus: "active",
            joined: "2023-08-14",
            imageUrl: "https://randomuser.me/api/portraits/women/28.jpg"
        },
        {
            id: 107,
            user: "Ikechukwu Nwachukwu",
            accountType: "vendor",
            email: "ikechukwu.n@example.com",
            phone: "+2348778899001",
            address: "9 Enugu Road, Enugu",
            accountStatus: "pending",
            joined: "2023-09-05",
            imageUrl: "https://randomuser.me/api/portraits/men/90.jpg"
        },
        {
            id: 108,
            user: "Jumoke Adebayo",
            accountType: "organizer",
            email: "jumoke.a@example.com",
            phone: "+2348889900112",
            address: "31 Ring Road, Ibadan",
            accountStatus: "active",
            joined: "2023-10-19",
            imageUrl: "https://randomuser.me/api/portraits/women/52.jpg"
        },
        {
            id: 109,
            user: "Kayode Martins",
            accountType: "vendor",
            email: "kayode.m@example.com",
            phone: "+2348990011223",
            address: "22 Benin Road, Benin City",
            accountStatus: "suspended",
            joined: "2023-11-25",
            imageUrl: "https://randomuser.me/api/portraits/men/67.jpg"
        },
        {
            id: 110,
            user: "Lola Williams",
            accountType: "organizer",
            email: "lola.w@example.com",
            phone: "+2348101122334",
            address: "13 Jos Road, Plateau",
            accountStatus: "active",
            joined: "2023-12-10",
            imageUrl: "https://randomuser.me/api/portraits/women/37.jpg"
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
                    <span className="text-gray-600">Users</span></h2>
                    <p className="text-gray-500">Keep track of users and manage users.</p>
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
                                    <p>User</p>
                                </div>
                            </th>
                            <th scope="col" className="">
                                Address
                            </th>
                            <th scope="col" className="">
                                Email
                            </th>
                            <th scope="col" className="">
                                Phone
                            </th>
                            <th scope="col" className="">
                                Status
                            </th>
                            <th scope="col" className="">
                                Joined
                            </th>
                            <th scope="col" className="w-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="bg-white border-b-[1px] border-gray-200">
                                <td scope="row" className="font-medium whitespace-nowrap text-gray-800">
                                    <div className="tableProductDetails">
                                        
                                        <img src={user.imageUrl} alt="" />
                                        <p>{user.user} <br/><span className="text-gray-500 text-[11px]">{user.accountType}</span></p>
                                    </div>
                                </td>
                                <td className="text-gray-500 ">{user.address}</td>
                                <td className="text-gray-500">
                                    {user.email}
                                </td>
                                <td className="text-gray-500">
                                    {user.phone}
                                </td>
                                <td className="text-gray-500">
                                    <div className={`coloredColumn ${user.accountStatus === 'active' ? 'bg-[#ECFDF3] text-green-600' : user.accountStatus === "pending" ? 'bg-yellow-50 text-yellow-600': 'bg-red-100 text-red-600'}`}>
                                        <FaCircle />
                                        {user.accountStatus}
                                    </div>
                                </td>
                                <td className="text-gray-500">
                                    {user.joined}
                                </td>
                                <td className="text-gray-600 hover:text-red-700 cursor-pointer" onClick={() => setShowDeleteModal(true)}>
                                    <UserMinusIcon className="w-[17px] cursor-pointer"/>
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

export default DashboardUsers;
