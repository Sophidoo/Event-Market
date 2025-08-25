
import { FiEdit2, FiPlus, FiUploadCloud } from "react-icons/fi";
import "../../styles/dashboard/Inventory.css";
import { ChevronRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FaCheck, FaMinus, FaCircle } from "react-icons/fa6";
import { BsFilter } from "react-icons/bs";
import { IoIosArrowRoundDown, IoIosArrowRoundUp, IoMdArrowDown } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState, useEffect, useMemo, useRef } from "react";
import DeleteItemModal from "../../components/Modals/DeleteItemModal";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import api from "../../AxiosInstance";
import Cookies from "js-cookie";

const DashboardInventory = () => {
    const [checkedRows, setCheckedRows] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [stats, setStats] = useState({ rentals: 0, services: 0, packages: 0 });
    const [page, setPage] = useState(1);
    const [pageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(1); // Default to 1
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // Fetch vendor items
    const fetchVendorItems = async () => {
        setLoading(true);
        try {
            const response = await api.get(`item/${page}/${pageSize}?category=${category}`);
            console.log("Vendor items fetched:", response.data);
            setItems(response.data.data || []);
            setTotalPages(response.data.meta?.totalPages || 1);
        } catch (error) {
            console.error("Error fetching vendor items:", error);
            toast.error(error.response?.data?.message || "Failed to fetch inventory");
        } finally {
            setLoading(false);
        }
    };


    const fetchItemStats = async () => {
        try {
            const response = await api.get("/item/stats");
            console.log("Item stats fetched:", response.data);
            setStats(response.data || { rentals: 0, services: 0, packages: 0 });
        } catch (error) {
            console.error("Error fetching item stats:", error);
            toast.error(error.response?.data?.message || "Failed to fetch item stats");
        }
    };
    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };

    // Handle search form submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(1);
    };

    // Handle CSV import
    const handleImportClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.name.endsWith(".csv")) {
            toast.error("Please upload a CSV file");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await api.post("/item/csv", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success(response.data || "CSV imported successfully");
            fetchVendorItems();
        } catch (error) {
            console.error("Error importing CSV:", error);
            toast.error(error.response?.data?.message || "Failed to import CSV");
        } finally {
            setLoading(false);
            fileInputRef.current.value = null;
        }
    };

    // Filter items client-side
    const filteredItems = useMemo(() => {
        if (!searchQuery) return items;
        return items.filter(item =>
            item.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [items, searchQuery]);

    useEffect(() => {
        fetchVendorItems();
        fetchItemStats();
    }, [page, category]);

    // Toggle row check
    const toggleRowCheck = (rowId) => {
        setCheckedRows(prev => ({
            ...prev,
            [rowId]: !prev[rowId],
        }));
    };

    // Handle item deletion
    const handleDeleteItem = async () => {
        if (!selectedItemId) return;
        try {
            await api.delete(`/item/${selectedItemId}`);
            toast.success("Item deleted successfully");
            fetchVendorItems();
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error(error.response?.data?.message || "Failed to delete item");
        }
    };

    // Handle delete icon click
    const onDeleteClick = (itemId) => {
        setSelectedItemId(itemId);
        setShowDeleteModal(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B544C]"></div>
            </div>
        );
    }

    return (
        <>
            {showDeleteModal && (
                <DeleteItemModal
                    onClose={() => {
                        setShowDeleteModal(false);
                        setSelectedItemId(null);
                    }}
                    onConfirm={() => {
                        handleDeleteItem();
                        setShowDeleteModal(false);
                        setSelectedItemId(null);
                    }}
                />
            )}
            <div className="adminInventoryWrapper">
                <div className="adminInventoryHeading">
                    <div className="leftInventoryHeading">
                        <h2>
                            Dashboard <ChevronRightIcon />
                            <span className="text-gray-600">Inventory</span>
                        </h2>
                        <p className="text-gray-500">Keep track of item/product inventory.</p>
                    </div>
                    {
                        Cookies.get("role") === "VENDOR" &&
                        <div className="rightInventoryHeading">
                        <input
                            type="file"
                            accept=".csv"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <button
                            className="border-gray-300 border-[1px] cursor-pointer bg-white text-gray-700 hover:text-black hover:bg-gray-50"
                            onClick={handleImportClick}
                        >
                            <FiUploadCloud /> Import
                        </button>
                        <button
                            className="border-[#0B544C] border-[1px] bg-[#0B544C] text-white hover:bg-green-800"
                            onClick={() => navigate("add")}
                        >
                            <FiPlus /> Add Item
                        </button>
                    </div>
                    }
                </div>

                <div className="inventorySubHeading">
                    <div className="inventoryTabWrapper bg-white border-[1px] border-gray-300 cursor-pointer">
                        <p
                            className={
                                category === ""
                                    ? "border-r-[1px] bg-gray-50 border-gray-300 text-black"
                                    : "text-gray-700 hover:bg-gray-100 border-r-[1px] border-gray-300"
                            }
                            onClick={() => setCategory("")}
                        >
                            All
                        </p>
                        <p
                            className={
                                category === "RENTALS"
                                    ? "bg-gray-50 border-r-[1px] border-gray-300 text-black"
                                    : "hover:bg-gray-100 text-gray-700 border-r-[1px] border-gray-300"
                            }
                            onClick={() => setCategory("RENTALS")}
                        >
                            Rentals
                        </p>
                        <p
                            className={
                                category === "SERVICES"
                                    ? "border-r-[1px] border-l-[1px] border-gray-300 bg-gray-50 text-black"
                                    : "hover:bg-gray-100 text-gray-700 border-r-[1px] border-gray-300"
                            }
                            onClick={() => setCategory("SERVICES")}
                        >
                            Services
                        </p>
                        <p
                            className={
                                category === "PACKAGES"
                                    ? "border-gray-300 bg-gray-50 text-black"
                                    : "hover:bg-gray-100 text-gray-700"
                            }
                            onClick={() => setCategory("PACKAGES")}
                        >
                            Packages
                        </p>
                    </div>

                    <div className="inventoryRightSubHeading">
                        <form onSubmit={handleSearchSubmit} className="text-gray-500 border-[1px] bg-white border-gray-300">
                            <MagnifyingGlassIcon />
                            <input
                                type="search"
                                placeholder="Search"
                                name="search"
                                id="search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </form>
                    </div>
                </div>

                <div className="inventoryCardWrapper">
                    <div className="inventoryCard bg-white border-gray-200 border-[1px]">
                        <p className="text-gray-500">TOTAL RENTALS</p>
                        <h1>
                            {stats.rentals} <span className="text-green-500">
                                +36% <IoIosArrowRoundUp />
                            </span>
                        </h1>
                    </div>
                    <div className="inventoryCard bg-white border-gray-200 border-[1px]">
                        <p className="text-gray-500">TOTAL SERVICES</p>
                        <h1>
                            {stats.services} <span className="text-red-500">
                                +14% <IoIosArrowRoundDown />
                            </span>
                        </h1>
                    </div>
                    <div className="inventoryCard bg-white border-gray-200 border-[1px]">
                        <p className="text-gray-500">TOTAL PACKAGES</p>
                        <h1>
                            {stats.packages} <span className="text-green-500">
                                +36% <IoIosArrowRoundUp />
                            </span>
                        </h1>
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
                                <th scope="col" className="">Category</th>
                                <th scope="col" className="">Price(N)</th>
                                <th scope="col" className="">Service Areas</th>
                                <th scope="col" className="">Booking Type</th>
                                <th scope="col" className="">Current Qty</th>
                                <th scope="col" className="">Status</th>
                                <th scope="col" className="w-1"></th>
                                <th scope="col" className="w-1"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="text-center text-gray-500 py-4">
                                        No items found
                                    </td>
                                </tr>
                            ) : (
                                filteredItems.map((item) => (
                                    <tr key={item.id} className="bg-white border-b-[1px] border-gray-200">
                                        <td scope="row" className="font-medium whitespace-nowrap text-gray-800">
                                            <div className="tableProductDetails">
                                                <img src={item.images?.[0] || "https://via.placeholder.com/50"} alt="" />
                                                <p>
                                                    {item.title || "Unknown Item"} <br />
                                                    <span className="text-gray-500 text-[11px]">
                                                        {item.categoryType?.name || item.category}
                                                    </span>
                                                </p>
                                            </div>
                                        </td>
                                        <td className="text-gray-500">{item.category}</td>
                                        <td className="text-gray-500">{(item.price || item.minPrice)?.toLocaleString() || "N/A"}</td>
                                        <td className="text-gray-500">{item.locations?.join(", ") || "N/A"}</td>
                                        <td className="text-gray-500">{item.bookingType}</td>
                                        <td className="text-gray-500">{item.quantity || 0}</td>
                                        <td className="text-gray-500">
                                            <div
                                                className={`coloredColumn ${
                                                    item.status === "available"
                                                        ? "bg-[#ECFDF3] text-green-600"
                                                        : item.status === "unavailable"
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-yellow-100 text-yellow-600"
                                                }`}
                                            >
                                                <FaCircle />
                                                {item.status}
                                            </div>
                                        </td>
                                        <td className="text-gray-500 cursor-pointer" onClick={() => onDeleteClick(item.id)}>
                                            <RiDeleteBinLine />
                                        </td>
                                        <td className="text-gray-500 cursor-pointer" onClick={() => navigate(`edit/${item.id}`)}>
                                            <FiEdit2 />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="inventoryPagination">
                    <p className="text-gray-700">Page {page} of {totalPages}</p>
                    <div className="inventoryPaginationButtons">
                        <button
                            className="border-[1px] border-gray-300 disabled:opacity-50"
                            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <button
                            className="border-[1px] border-gray-300 disabled:opacity-50"
                            onClick={() => setPage(prev => prev + 1)}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardInventory;
