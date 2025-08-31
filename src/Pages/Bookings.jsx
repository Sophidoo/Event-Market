import { MagnifyingGlassIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import "../styles/Bookings.css";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../AxiosInstance";
import Cookies from "js-cookie";
import PaystackPop from "@paystack/inline-js";
import Loading from "../components/Loading";

const Bookings = () => {
  const [bookings, setBookings] = useState({});
  const [filteredBookings, setFilteredBookings] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, page: 1, pageSize: 3, totalPages: 0 });
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Rentals");
  const popup = new PaystackPop();
  const navigate = useNavigate()
  const public_key = "pk_test_2739888aa5ce16964b6b127633df5176ffe74ea2"

  const fetchBookings = async () => {
    if (!Cookies.get("token")) {
      toast.error("Please login first");
      return;
    }

    setLoading(true);
    try {
      const response = await api.get(`/booking/group/${page}/${meta.pageSize}/${activeTab.toUpperCase()}`);
      setBookings(response.data.data);
      console.log(response.data.data)
      setMeta(response.data.meta);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch bookings");
      console.log(err)
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page, activeTab]);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredBookings(bookings);
      setMeta((prev) => ({ ...prev, total: Object.keys(bookings).length, totalPages: Math.ceil(Object.keys(bookings).length / prev.pageSize) }));
      return;
    }

    const searchTerm = search.toLowerCase();
    const filtered = Object.entries(bookings).reduce((acc, [date, bookingsList]) => {
      const matchingBookings = bookingsList.filter(
        (booking) =>
          booking.item.title.toLowerCase().includes(searchTerm) ||
          booking.address.toLowerCase().includes(searchTerm)
      );
      if (matchingBookings.length > 0) {
        acc[date] = matchingBookings;
      }
      return acc;
    }, {});

    setFilteredBookings(filtered);
    setMeta((prev) => ({
      ...prev,
      total: Object.keys(filtered).length,
      totalPages: Math.ceil(Object.keys(filtered).length / prev.pageSize),
    }));
    // Reset to first page if current page exceeds new totalPages
    if (page > Math.ceil(Object.keys(filtered).length / meta.pageSize)) {
      setPage(1);
    }
  }, [search, bookings, meta.pageSize, page]);

  const handlePayment = async (booking) => {
    try {
      const reference = crypto.randomUUID();
      popup.newTransaction({
        key: public_key,
        email: booking.user.email,
        amount: Math.round(booking.totalPrice * 100),
        reference,
        metadata: {
          bookingId: booking.id,
          userId: booking.user.id,
        },
        onSuccess: async (transaction) => {
          try {
            const verifyRes = await api.get(`/transaction/verify?reference=${transaction.reference}`);
            console.log(verifyRes)
            if (verifyRes.data.data.status === "success") {
              toast.success("Payment successful");
              fetchBookings(); // Refresh bookings
            } else {
              toast.error("Payment failed verification");
            }
          } catch (err) {
            console.log(err)
            toast.error("Verification error");
          }
        },
        onCancel: () => {
          toast.info("Payment cancelled");
        },
        onClose: () => {
          toast.info("Payment modal closed");
        },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to initiate payment");
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    // Implement search filtering if needed
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
        className={`inline-flex items-center justify-center py-2 px-4 rounded-md text-xs sm:text-sm font-medium ${
          page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-stone-800/5"
        }`}
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
      >
        <svg className="mr-1.5 h-4 w-4 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M15 6L9 12L15 18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Previous
      </button>
    );

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          className={`inline-grid place-items-center min-w-[30px] min-h-[30px] rounded-md text-xs sm:text-sm font-medium ${
            1 === page ? "bg-[#0B5850] text-white" : "hover:bg-stone-800/5"
          }`}
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
          className={`inline-grid place-items-center min-w-[30px] min-h-[30px] rounded-md text-xs sm:text-sm font-medium ${
            i === page ? "bg-[#0B5850] text-white" : "hover:bg-stone-800/5"
          }`}
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
          className={`inline-grid place-items-center min-w-[30px] min-h-[30px] rounded-md text-xs sm:text-sm font-medium ${
            meta.totalPages === page ? "bg-[#0B5850] text-white" : "hover:bg-stone-800/5"
          }`}
          onClick={() => goToPage(meta.totalPages)}
        >
          {meta.totalPages}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        className={`inline-flex items-center justify-center py-2 px-4 rounded-md text-xs sm:text-sm font-medium ${
          page === meta.totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-stone-800/5"
        }`}
        onClick={() => goToPage(page + 1)}
        disabled={page === meta.totalPages}
      >
        Next
        <svg className="ml-1.5 h-4 w-4 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M9 6L15 12L9 18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    );

    return buttons;
  };

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (error) {
    return <div className="text-center py-10">{error}</div>;
  }

  return (
    <>
      <section className="bookingsHeading">
        <div className="leftBookingsHeading">
          <h1>My Bookings</h1>
          <p className="text-gray-600">{meta.total} Bookings Found</p>
        </div>

        <form className="border-[1px] bg-[#F7F7F7] border-gray-200 text-gray-600">
          <MagnifyingGlassIcon className="h-5 w-5" />
          <input type="search" placeholder="Search Here..." value={search} onChange={handleSearch} />
        </form>
      </section>

      <section className="bookingsTabWrapper border-b-[1px] border-gray-300">
        <div className="bookingsTab">
          <p className={activeTab === "Rentals" ? "border-b-[3px] border-[#128D7F] cursor-pointer" : "cursor-pointer"}  onClick={() => setActiveTab("Rentals")}>
            Rentals <small className="border-[1px] border-gray-300">{activeTab === "Rentals" ? meta.total : "0"}</small>
          </p>
          <p className={activeTab === "Services" ? "border-b-[3px] border-[#128D7F] cursor-pointer" : "cursor-pointer"}  onClick={() => setActiveTab("Services")}>Services <small className="border-[1px] border-gray-300">{activeTab === "Services" ? meta.total : "0"}</small></p>
          <p className={activeTab === "Packages" ? "border-b-[3px] border-[#128D7F] cursor-pointer" : "cursor-pointer"}  onClick={() => setActiveTab("Packages")}>Packages <small className="border-[1px] border-gray-300">{activeTab === "Packages" ? meta.total : "0"}</small></p>
        </div>
      </section>

      <section className="bookings">
        {Object.entries(filteredBookings).map(([date, bookingsList]) => (
          <div key={date} className="bookingHolder border-b-[1px] border-gray-300 ">
            <h2>
              <CalendarDaysIcon className="h-5 w-5 inline mr-2" />
              {new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </h2>
            <div className="bookingInformationContainer">
              {bookingsList.map((booking) => {
                const unitPrice = booking.item.price;
                const quantity = Math.round(booking.totalPrice / (unitPrice * 1.1)); // Assuming 10% deposit
                const securityDeposit = booking.totalPrice * 0.1;
                return (
                  <div key={booking.id} className="bookingInformation border-[1px] border-gray-200 cursor-pointer hover:scale-105 transition"  >
                    <img
                      src={booking.item.images?.[0] || "https://via.placeholder.com/150"}
                      alt={booking.item.title}
                      onClick={() => navigate(`${booking.id}`)}
                    />
                    <div className="bookingDetails">
                      <div className="bookingDetailsHeading" onClick={() => navigate(`${booking.id}`)}>
                        <h3>{booking.item.title}</h3>
                        <p>{booking.address}</p>
                      </div>
                      <div className="bookingOrderInfo" onClick={() => navigate(`${booking.id}`)}>
                        <h4>Order Details</h4>
                        <p>
                          <span>Qty: {quantity}</span>
                          <span>Unit Price: N{unitPrice.toLocaleString()}</span>
                          <span>Total: N{booking.totalPrice.toLocaleString()}</span>
                          <span>Security Deposit: N{securityDeposit.toFixed(2)}</span>
                        </p>
                      </div>
                      <div className="bookingVendorContact" >
                        <h4>Vendor Contact</h4>
                        <div className="bookingVendorInfo">
                          <p>
                            <span>Phone: {booking.vendor.phone || "+2348104009853"}</span>
                            <span>Email: {booking.vendor.contactEmail || "sophieokosodo@gmail.com"}</span>
                            <span>Name: {booking.vendor.companyName || "Megvin Rentals"}</span>
                          </p>
                          {booking.paymentStatus === "FAILED" ? (
                            <NavLink
                              className="text-[#0B544C]"
                              onClick={() => handlePayment(booking)}
                            >
                              Retry Payment
                            </NavLink>
                          ) : booking.paymentStatus === "PENDING" ? (
                            booking.request === "APPROVED" ? (
                              <NavLink
                                className="text-[#0B544C]"
                                onClick={() => handlePayment(booking)}
                              >
                                Make Payment
                              </NavLink>
                            ) : (
                              <span className="text-gray-500">Awaiting Approval</span>
                            )
                          ) : (
                            <NavLink to={`/item/details/${booking.item.id}`} className="text-[#0B544C]">
                              View Item
                            </NavLink>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <div className="pagination flex flex-col items-end sm:items-end w-full">
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-1">
          {renderPaginationButtons()}
        </div>
      </div>
    </>
  );
};

export default Bookings;