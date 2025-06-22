import { FiDownloadCloud} from "react-icons/fi"
import "../../styles/dashboard/Inventory.css"
import "../../styles/dashboard/Rentals.css"
import { ChevronRightIcon, MagnifyingGlassIcon, UserMinusIcon } from "@heroicons/react/24/outline"
import { FaCircle } from "react-icons/fa"
import { useState } from "react"; 
import SuspendUserModal from "../../components/Modals/SuspendUserModal";

const DashboardTransactions = () => {
    const [checkedRows, setCheckedRows] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    // Function to toggle between check and minus
    const toggleRowCheck = (rowId) => {
        setCheckedRows(prev => ({
            ...prev,
            [rowId]: !prev[rowId]
        }));
    };

    const transactions = [
        {
            txnId: "TXN-2024-001",
            customer: "John Doe",
            customerImage: "https://randomuser.me/api/portraits/men/32.jpg",
            email: "john.doe@example.com",
            debit: "$150.00",
            credit: "-",
            reason: "Product Purchase - Brown Hat",
            status: "Completed",
            date: "Jan 15, 2024, 10:30 AM"
        },
        {
            txnId: "TXN-2024-002",
            customer: "Jane Smith",
            customerImage: "https://randomuser.me/api/portraits/women/44.jpg",
            email: "jane.smith@example.com",
            debit: "-",
            credit: "$200.00",
            reason: "Refund - Calvin Klein T-Shirt",
            status: "Processed",
            date: "Jan 16, 2024, 2:45 PM"
        },
        {
            txnId: "TXN-2024-003",
            customer: "Alex Johnson",
            customerImage: "https://randomuser.me/api/portraits/men/75.jpg",
            email: "alex.johnson@example.com",
            debit: "$75.50",
            credit: "-",
            reason: "Service Fee - Equipment Rental",
            status: "Pending",
            date: "Jan 17, 2024, 9:15 AM"
        },
        {
            txnId: "TXN-2024-004",
            customer: "Sarah Williams",
            customerImage: "https://randomuser.me/api/portraits/women/68.jpg",
            email: "sarah.williams@example.com",
            debit: "-",
            credit: "$120.00",
            reason: "Cancellation Fee - Event Package",
            status: "Failed",
            date: "Jan 18, 2024, 4:20 PM"
        },
        {
            txnId: "TXN-2024-005",
            customer: "Michael Brown",
            customerImage: "https://randomuser.me/api/portraits/men/22.jpg",
            email: "michael.brown@example.com",
            debit: "$89.99",
            credit: "-",
            reason: "Product Purchase - Wireless Earbuds",
            status: "Completed",
            date: "Jan 19, 2024, 11:05 AM"
        },
        {
            txnId: "TXN-2024-006",
            customer: "Emily Davis",
            customerImage: "https://randomuser.me/api/portraits/women/90.jpg",
            email: "emily.davis@example.com",
            debit: "-",
            credit: "$50.00",
            reason: "Partial Refund - Damaged Goods",
            status: "Processed",
            date: "Jan 20, 2024, 3:30 PM"
        },
        {
            txnId: "TXN-2024-007",
            customer: "David Wilson",
            customerImage: "https://randomuser.me/api/portraits/men/46.jpg",
            email: "david.wilson@example.com",
            debit: "$299.99",
            credit: "-",
            reason: "Premium Service Subscription",
            status: "Completed",
            date: "Jan 21, 2024, 1:00 PM"
        },
        {
            txnId: "TXN-2024-008",
            customer: "Olivia Martinez",
            customerImage: "https://randomuser.me/api/portraits/women/29.jpg",
            email: "olivia.martinez@example.com",
            debit: "-",
            credit: "$180.00",
            reason: "Overpayment Refund",
            status: "Processed",
            date: "Jan 22, 2024, 10:45 AM"
        },
        {
            txnId: "TXN-2024-009",
            customer: "Daniel Anderson",
            customerImage: "https://randomuser.me/api/portraits/men/81.jpg",
            email: "daniel.anderson@example.com",
            debit: "$45.00",
            credit: "-",
            reason: "Late Return Fee",
            status: "Pending",
            date: "Jan 23, 2024, 5:15 PM"
        },
        {
            txnId: "TXN-2024-010",
            customer: "Sophia Taylor",
            customerImage: "https://randomuser.me/api/portraits/women/33.jpg",
            email: "sophia.taylor@example.com",
            debit: "$199.99",
            credit: "-",
            reason: "Product Purchase - Smart Watch",
            status: "Completed",
            date: "Jan 24, 2024, 2:00 PM"
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
                    <span className="text-gray-600">Transactions</span></h2>
                    <p className="text-gray-500">Keep track of your transaction made within the app.</p>
                </div>
                <div className="rightInventoryHeading">
                    <button className="border-[#0B544C] border-[1px] bg-[#0B544C] text-white hover:bg-green-800 "><FiDownloadCloud /> Download</button>
                </div>
            </div>


            <div className="relative overflow-x-auto mt-[-20px]">
                <table className="w-full">
                    <thead className="text-gray-500">
                        <tr className="border-b-[1px] border-gray-200">
                            <th scope="col">
                                <div className="tableHeadingDiv">
                                    <p>Txn</p>
                                </div>
                            </th>
                            <th scope="col" className="">
                                Customer
                            </th>
                            <th scope="col" className="">
                                Debit
                            </th>
                            <th scope="col" className="">
                                Credit
                            </th>
                            <th scope="col" className="w-[250px]">
                                Reason
                            </th>
                            <th scope="col" className="">
                                Status
                            </th>
                            <th scope="col" className="">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((el) => (
                            <tr key={el.txnId} className="bg-white border-b-[1px] border-gray-200">
                                <td className="text-gray-500 ">{el.txnId}</td>
                                <td scope="row" className="font-medium whitespace-nowrap text-gray-800">
                                    <div className="tableProductDetails">
                                        
                                        <img src={el.customerImage} alt="" />
                                        <p>{el.customer} <br/><span className="text-gray-500 text-[11px]">{el.email}</span></p>
                                    </div>
                                </td>
                                <td className="text-gray-500 ">{el.debit}</td>
                                <td className="text-gray-500">
                                    {el.credit}
                                </td>
                                <td className="text-gray-500">
                                    {el.reason}
                                </td>
                                <td className="text-gray-500">
                                    <div className={`coloredColumn ${el.status === 'Completed' ? 'bg-[#ECFDF3] text-green-600' : el.status === "Pending" ? 'bg-yellow-50 text-yellow-600' : el.status === "Processed" ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                                        <FaCircle />
                                        {el.status}
                                    </div>
                                </td>
                                <td className="text-gray-500">
                                    {el.date}
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

export default DashboardTransactions;
