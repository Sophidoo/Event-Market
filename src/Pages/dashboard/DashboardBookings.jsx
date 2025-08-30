import { FiDownloadCloud, FiEdit2, FiPlus, FiUploadCloud } from "react-icons/fi";
import "../../styles/dashboard/Inventory.css";
import "../../styles/dashboard/Rentals.css";
import { ChevronRightIcon, EllipsisVerticalIcon, MagnifyingGlassIcon, UserMinusIcon } from "@heroicons/react/24/outline";
import { FaCheck, FaMinus } from "react-icons/fa6";
import { BsFilter } from "react-icons/bs";
import { IoIosArrowRoundDown, IoIosArrowRoundUp, IoMdArrowDown } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import SuspendUserModal from "../../components/Modals/SuspendUserModal";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../AxiosInstance";
import Cookies from "js-cookie";
import CancelBooking from "../../components/Modals/CancelBooking";

const DashboardBookings = () => {
  const [tableMenu, setTableMenu] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [downloading, setDownloading] = useState(false)
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, page: 1, pageSize: 10, totalPages: 0 });
  const [pagination, setpagination] = useState({ total: 0, page: 1, pageSize: 10, totalPages: 0 });
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Rentals");
  const [tabCounts, setTabCounts] = useState({ Rentals: 0, Services: 0, Packages: 0 });
  const navigate = useNavigate();

  const tabCategories = {
    Rentals: "RENTALS",
    Services: "SERVICES",
    Packages: "PACKAGES",
  };

  const fetchBookings = async () => {
    const role = Cookies.get("role");
    if (!Cookies.get("token") || !role) {
      toast.error("Please login first");
      return;
    }

    setLoading(true);
    try {
      const category = tabCategories[activeTab];
      const url =
        role === "ADMIN"
          ? `/booking/admin/${page}/${meta.pageSize}/${category}`
          : `/booking/vendor/${page}/${meta.pageSize}/${category}`;
      const response = await api.get(url);
      console.log(response)
      setBookings(response.data.data);
      setMeta(response.data.meta);
      setpagination(response.data.meta);

    } catch (err) {
        console.log(err)
      setError(err.response?.data?.message || "Failed to fetch bookings");
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page, activeTab]);

  // Filter bookings based on search term
  useEffect(() => {
    if (!search.trim()) {
      setFilteredBookings(bookings);
      setMeta({...pagination});
      return;
    }

    const searchTerm = search.toLowerCase();
    const filtered = bookings.filter(
      (booking) =>
        booking.item.title.toLowerCase().includes(searchTerm) ||
        booking.address.toLowerCase().includes(searchTerm)
    );

    setFilteredBookings(filtered);
    setMeta((prev) => ({
      ...prev,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / prev.pageSize),
    }));
    if (page > Math.ceil(filtered.length / meta.pageSize)) {
      setPage(1);
    }

    console.log(meta)
  }, [search, bookings, meta.pageSize, page]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
    setSearch("");
  };

  const toggleTableMenu = (rowId) => {
    setTableMenu((prev) => (prev === rowId ? null : rowId));
  };

  const handleApproveRequest = async (bookingId) => {
    toast.loading("Processing, Please Wait")
    try {
      await api.patch(`/booking/approve/${bookingId}`);
      toast.success("Booking approved successfully");
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to approve booking");
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await api.patch(`/booking/cancel/${bookingId}`);
      toast.success("Booking cancelled successfully");
      setShowDeleteModal(null);
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  const handleUpdateStatus = async (bookingId, status) => {
    toast.loading("Processing, Please Wait")
    try {
      await api.patch(`/booking/update/${bookingId}`, { status });
      toast.success(`Booking status updated to ${status}`);
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleDownload = async () => {
    setDownloading(true)
    try {
        
      const response = await api.get("/booking/download");
      const blob = new Blob([response.data], { type: "text/csv" });
      setDownloading(false)
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "bookings.csv";
      console.log(response)
      link.click();
      window.URL.revokeObjectURL(url);
      toast.success("Bookings downloaded successfully");
    } catch (err) {
        setDownloading(false)
      toast.error(err.response?.data?.message || "Failed to download bookings");
    }
  };

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= meta.totalPages) {
      setPage(pageNum);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(meta.totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    buttons.push(
      <button
        key="prev"
        className={`border-[1px] border-gray-300 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
    );

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          className={`border-[1px] border-gray-300 ${1 === page ? "bg-[#0B5850] text-white" : ""}`}
          onClick={() => goToPage(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(<span key="left-ellipsis" className="px-2">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`border-[1px] border-gray-300 ${i === page ? "bg-[#0B5850] text-white" : ""}`}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < meta.totalPages) {
      if (endPage < meta.totalPages - 1) {
        buttons.push(<span key="right-ellipsis" className="px-2">...</span>);
      }
      buttons.push(
        <button
          key={meta.totalPages}
          className={`border-[1px] border-gray-300 ${meta.totalPages === page ? "bg-[#0B5850] text-white" : ""}`}
          onClick={() => goToPage(meta.totalPages)}
        >
          {meta.totalPages}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        className={`border-[1px] border-gray-300 ${page === meta.totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => goToPage(page + 1)}
        disabled={page === meta.totalPages}
      >
        Next
      </button>
    );

    return buttons;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B5850]"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10">{error}</div>;
  }

  return (
    <>
      {showDeleteModal && (
        <CancelBooking
          onClose={() => setShowDeleteModal(null)}
          onConfirm={() => handleCancelBooking(showDeleteModal)}
        />
      )}
      <div className="adminInventoryWrapper">
        <div className="adminInventoryHeading">
          <div className="leftInventoryHeading">
            <h2>
              Dashboard <ChevronRightIcon className="h-5 w-5 inline" />{" "}
              <span className="text-gray-600">Bookings</span>
            </h2>
            <p className="text-gray-500">
              Keep track of bookings made by users and remember to approve or reject those pending requests
            </p>
          </div>
          <div className="rightInventoryHeading">
            {Cookies.get("role") === "ADMIN" && (
              <button
                className={`border-[#0B544C] border-[1px] bg-[#0B544C] text-white hover:bg-green-800 cursor-pointer ${downloading && "opacity-50"}`}
                onClick={handleDownload}
                disabled={downloading}
              >
                <FiDownloadCloud /> {downloading ? "Downloading" : "Download"}
              </button>
            )}
          </div>
        </div>

        <div className="inventorySubHeading">
          <div className="inventoryTabWrapper bg-white border-[1px] border-gray-300">
            {Object.keys(tabCategories).map((tab) => (
              <p
                key={tab}
                className={activeTab === tab ? "text-black border-b-[2px] border-[#0B544C]" : "text-gray-700"}
                onClick={() => handleTabChange(tab)}
              >
                {tab} <small className="border-[1px] border-gray-300 rounded-2xl px-1">{tabCounts[tab] || 0}</small>
              </p>
            ))}
          </div>

          <div className="inventoryRightSubHeading">
            <form className="text-gray-500 border-[1px] bg-white border-gray-300">
              <MagnifyingGlassIcon className="h-5 w-5" />
              <input
                type="search"
                placeholder="Search by item or address..."
                value={search}
                onChange={handleSearch}
              />
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
                <th scope="col">Booked by</th>
                <th scope="col">Quantity</th>
                <th scope="col" className="max-w-[120px]">
                  Location
                </th>
                <th scope="col">Status</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col" className="w-1"></th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 && search.trim() ? (
                <tr>
                  <td colSpan={8} className="text-center py-10">
                    No bookings match your search
                  </td>
                </tr>
              ) : (
                filteredBookings.map((item) => (
                  <tr key={item.id} className="bg-white border-b-[1px] border-gray-200">
                    <td scope="row" className="font-medium whitespace-nowrap text-gray-800 cursor-pointer" onClick={() => navigate(`${item.id}`)}>
                      <div className="tableProductDetails">
                        <img
                          src={item.item.images?.[0] || "https://via.placeholder.com/150"}
                          alt={item.item.title}
                        />
                        <p>
                          {item.item.title} <br />
                          <span className="text-gray-500 text-[11px]">{item.item.categoryType}</span>
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="tableProductDetails">
                        <p>
                          {item.user.name} <br />
                          <span className="text-gray-500 text-[11px]">{item.user.email}</span>
                        </p>
                      </div>
                    </td>
                    <td className="text-gray-500">
                      {item.quantity || Math.round(item.totalPrice / (item.item.price * 1.1))}
                    </td>
                    <td className="text-gray-500">{item.address}</td>
                    <td className="text-gray-500">
                      <div
                        className={`coloredColumn ${
                          item.status === "COMPLETED" 
                            ? "bg-[#ECFDF3] text-green-600"
                            : item.status === "CANCELLED"
                            ? "bg-red-50 text-red-600"
                            : item.status === "IN_USE"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-yellow-50 text-yellow-600"
                        }`}
                      >
                        <FaCircle />
                        {item.status === "CANCELLED" ? item.status : item.request === "PENDING" ? "PENDING APPROVAL" : item.paymentStatus === "PENDING" ? "PENDING PAYMENT" : item.status === 'PENDING' ? "PENDING RENTAL COMPLETION" : item.status}
                      </div>
                    </td>
                    <td className="text-gray-500">
                      {new Date(item.startDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="text-gray-500">
                      {new Date(item.endDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="relative">
                      <EllipsisVerticalIcon
                        className="w-[17px] cursor-pointer"
                        onClick={() => toggleTableMenu(item.id)}
                      />
                      <div
                        className={
                          tableMenu === item.id
                            ? "tableMenu bg-white border-[1px] border-gray-300 cursor-pointer"
                            : "hide"
                        }
                      >
                        <NavLink onClick={() => navigate(`${item.id}`)}>View Booking</NavLink>
                        {item.request === "PENDING" && Cookies.get("role") === "VENDOR" || "ADMIN" && (
                          <NavLink onClick={() => handleApproveRequest(item.id)}>Approve Request</NavLink>
                        )}
                        <NavLink onClick={() => setShowDeleteModal(item.id)}>Cancel Booking</NavLink>
                        <NavLink
                          onClick={() =>
                            handleUpdateStatus(
                              item.id,
                              item.status === "PENDING" ?  "COMPLETED" : "PENDING"
                            )
                          }
                        >
                          Update Status
                        </NavLink>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="inventoryPagination">
          <p className="text-gray-700">
            Page {meta.page} of {meta.totalPages}
          </p>
          <div className="inventoryPaginationButtons flex-wrap">{renderPaginationButtons()}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardBookings;