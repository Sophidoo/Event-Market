import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../AxiosInstance";
import Cookies from "js-cookie";
import PaystackPop from "@paystack/inline-js";
import AddReviewModal from "../components/Modals/AddReviewModal";
import Loading from "../components/Loading";

const BookingDetails = () => {
  const { id } = useParams(); // Get booking ID from URL
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [error, setError] = useState(null);
  const popup = new PaystackPop();
  const public_key = "pk_test_2739888aa5ce16964b6b127633df5176ffe74ea2"

  const fetchBookingDetails = async () => {
    if (!Cookies.get("token")) {
      setError("Please login first");
      toast.error("Please login first");
      return;
    }

    setLoading(true);
    try {
      const response = await api.get(`/booking/details/${id}`);
      setBooking(response.data);
      console.log(response.data)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch booking details");
      toast.error(err.response?.data?.message || "Failed to fetch booking details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  const handlePayment = async () => {
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
            if (verifyRes.data.data.data.status === "success") {
              toast.success("Payment successful");
              fetchBookingDetails(); // Refresh bookings
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
        console.log(err)
      toast.error(err.response?.data?.message || "Failed to initiate payment");
    }
  };

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (error) {
    return <div className="text-center py-10">{error}</div>;
  }

  if (!booking) {
    return <div className="text-center py-10">No booking data available</div>;
  }

  const { item, address, startDate, endDate, request, status, totalPrice, createdAt, payment, vendor } = booking;
  const isServiceOrPackage = item.category === "SERVICES" || item.category === "PACKAGES";
  const isService = item.category === "SERVICES";
  const isPackage = item.category === "PACKAGES";
  const securityDeposit = totalPrice * 0.2; // Placeholder: 20% of totalPrice
  const paymentButtonText =
    payment && booking.paymentStatus !== "COMPLETED" ? "Retry Payment" : "Make Payment";
  const isPaymentDisabled = booking.paymentStatus === "COMPLETED";


  const handleAddReview = () => {
    setReviewModal(true)
  }

  return <>
  {
    reviewModal && <AddReviewModal
      id={item.id}
      onClose={() => setReviewModal(false)}
      onConfirm={() => setReviewModal(false)}
    />
  }
    <div className="flex flex-col md:flex-row gap-x-10 justify-between items-start py-[30px] px-[3%]">
      <section className="flex flex-col gap-y-5 w-full md:w-2/3">
        <div className="flex flex-col gap-y-5">
          <img
            src={item.images[0] || "https://via.placeholder.com/300"}
            alt={item.title}
            className="w-full h-60 xsm:h-100 object-cover"
          />
          <div className="flex flex-wrap gap-3">
            {item.images.slice(1, 4).map((img, index) => (
              <img
                key={index}
                src={img || "https://via.placeholder.com/150"}
                alt={`${item.title} thumbnail ${index + 1}`}
                className="xsm:w-30 xsm:h-20 w-20 h-12 object-cover"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-y-2 mt-2">

          <small className="text-[10px] sm:text-xs text-gray-700">{item.category}</small>
          <h1 className="text-base sm:text-lg md:text-xl lg:text-[22px] font-medium">{item.title}</h1>
          <div className="flex items-end gap-x-2">
            <h2 className="text-base sm:text-lg md:text-2xl font-medium text-[#0B5850]">
              ₦{totalPrice.toFixed(2)}
            </h2>
            <span className="text-sm mb-1 text-gray-700">per {item.pricingUnit?.toLowerCase() || "day"}</span>
          </div>

          <div className="flex flex-col gap-y-1 mt-3">
            <h3 className="text-[13px] sm:text-sm font-medium">Description:</h3>
            <p className="text-xs sm:text-[13px] text-gray-600">{item.description}</p>
          </div>
          {
            isServiceOrPackage && (
                <>
                    <div className="flex flex-col gap-y-1 mt-5">
                        <h3 className="text-[13px] sm:text-sm font-medium">what this service offers</h3>
                        <ul className="text-xs sm:text-[13px] text-gray-600 list-disc ml-5">
                        {item.offers.length > 0 ? (
                            item.terms.map((term, index) => <li key={index}>{term}</li>)
                        ) : (
                            <li>No terms specified</li>
                        )}
                        </ul>
                    </div>
                </>
            )
          }
          {
            isService && (
                <>
                    <div className="flex flex-col gap-y-1 mt-5">
                        <h3 className="text-[13px] sm:text-sm font-medium">Prices:</h3>
                        <ul className="text-xs sm:text-[13px] text-gray-600 list-disc ml-5">
                        {item.prices.length > 0 ? (
                            item.terms.map((term, index) => <li key={index}>{term}</li>)
                        ) : (
                            <li>No terms specified</li>
                        )}
                        </ul>
                    </div>
                </>
            )
          }
          {isService && (
            <>
              
                <div className="flex flex-col gap-y-1 mt-5">
                  <h3 className="text-[13px] sm:text-sm font-medium">Qualifications:</h3>
                  <p className="text-xs sm:text-[13px] text-gray-600">Experience: {item.experience}</p>
                  <p className="text-xs sm:text-[13px] text-gray-600">Career highlight: {item.careerHighlight}</p>
                  <p className="text-xs sm:text-[13px] text-gray-600">Education and training: {item.education}</p>
                </div>
              
              
            </>
          )}

          <div className="flex flex-col gap-y-1 mt-5">
            <h3 className="text-[13px] sm:text-sm font-medium">Locations:</h3>
            <p className="text-xs sm:text-[13px] text-gray-600">
              {item.locations.length > 0 ? item.locations.join(", ") : "No locations specified"}
            </p>
          </div>

          {
            !isServiceOrPackage && (
                <>
                    
                    <div className="flex flex-col gap-y-1 mt-5">
                        <h3 className="text-[13px] sm:text-sm font-medium">Terms and Care:</h3>
                        <ul className="text-xs sm:text-[13px] text-gray-600 list-disc ml-5">
                        {item.terms.length > 0 ? (
                            item.terms.map((term, index) => <li key={index}>{term}</li>)
                        ) : (
                            <li>No terms specified</li>
                        )}
                        </ul>
                    </div>
                </>
            )
          }
        </div>

        </section>

        <section className="flex flex-col gap-y-5 w-full md:w-1/3 border border-gray-200 p-5 rounded-md">
          <div className="flex flex-col gap-y-1">
            <h2 className="text-sm sm:text-base md:text-lg font-medium">Booking Details</h2>
            <p className="text-gray-600 text-xs sm:text-[13px]">
              Track your booking and view your booking and payment details here
            </p>
          </div>

          <hr className="border border-gray-200" />

          <div className="flex flex-col gap-y-4">
            <div className="flex justify-between flex-wrap items-center gap-y-1">
              <h3 className="text-xs sm:text-[13px] font-medium">Address:</h3>
              <p className="text-xs sm:text-[13px]">{address || "Not specified"}</p>
            </div>
            <div className="flex justify-between flex-wrap items-center gap-y-1">
              <h3 className="text-xs sm:text-[13px] font-medium">Duration:</h3>
              <p className="text-xs sm:text-[13px]">
                {new Date(startDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
                -{" "}
                {new Date(endDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex justify-between flex-wrap items-center gap-y-1">
              <h3 className="text-xs sm:text-[13px] font-medium">Booking Request:</h3>
              <p className="text-xs sm:text-[13px]">{request || "PENDING"}</p>
            </div>
            <div className="flex justify-between flex-wrap items-center gap-y-1">
              <h3 className="text-xs sm:text-[13px] font-medium">Booking Status:</h3>
              <p className="text-xs sm:text-[13px]">{status || "PENDING"}</p>
            </div>
            <div className="flex justify-between flex-wrap items-center gap-y-1">
              <h3 className="text-xs sm:text-[13px] font-medium">Quantity:</h3>
              <p className="text-xs sm:text-[13px]">{item.quantity || 1}</p>
            </div>
            <div className="flex justify-between flex-wrap items-center gap-y-1">
              <h3 className="text-xs sm:text-[13px] font-medium">Total Price:</h3>
              <p className="text-xs sm:text-[13px]">₦{totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between flex-wrap items-center gap-y-1">
              <h3 className="text-xs sm:text-[13px] font-medium">Security Deposit:</h3>
              <p className="text-xs sm:text-[13px]">₦{securityDeposit.toFixed(2)}</p>
            </div>
            <div className="flex justify-between flex-wrap items-center gap-y-1">
              <h3 className="text-xs sm:text-[13px] font-medium">Date Booked:</h3>
              <p className="text-xs sm:text-[13px]">
                {new Date(createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <hr className="border border-gray-200" />

          <div className="flex flex-col gap-y-4">
            <div className="flex justify-between flex-wrap items-center gap-y-1">
              <h3 className="text-xs sm:text-[13px] font-medium">Transaction ID:</h3>
              <p className="text-xs sm:text-[13px]">{payment?.transactionId || "Not paid"}</p>
            </div>
            <div className="flex justify-between flex-wrap items-center gap-y-1">
              <h3 className="text-xs sm:text-[13px] font-medium">Amount Paid:</h3>
              <p className="text-xs sm:text-[13px]">
                {payment?.paidAmount ? `₦${payment.paidAmount.toFixed(2)}` : "Not paid"}
              </p>
            </div>
            <div className="flex justify-between flex-wrap items-center gap-y-1">
              <h3 className="text-xs sm:text-[13px] font-medium">Date Paid:</h3>
              <p className="text-xs sm:text-[13px]">
                {payment?.createdAt
                  ? new Date(payment.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Not paid"}
              </p>
            </div>
            <div className="flex justify-between flex-wrap items-center gap-y-1">
              <h3 className="text-xs sm:text-[13px] font-medium">Payment Status:</h3>
              <p className="text-xs sm:text-[13px]">{payment?.status || "PENDING"}</p>
            </div>
          </div>

          <hr className="border border-gray-200" />

          <div className="flex flex-col gap-y-4">
            <div className="flex justify-between flex-wrap items-center gap-y-1">
              <h3 className="text-xs sm:text-[13px] font-medium">Vendor Name:</h3>
              <p className="text-xs sm:text-[13px]">{vendor.companyName || vendor.user.name}</p>
            </div>
            <div className="flex justify-between flex-wrap items-center gap-y-1">
              <h3 className="text-xs sm:text-[13px] font-medium">Vendor Email:</h3>
              <p className="text-xs sm:text-[13px]">{vendor.contactEmail || "Not specified"}</p>
            </div>
            <div className="flex justify-between flex-wrap items-center gap-y-1">
              <h3 className="text-xs sm:text-[13px] font-medium">Vendor Phone:</h3>
              <p className="text-xs sm:text-[13px]">{vendor.contactPhone || "Not specified"}</p>
            </div>
          </div>

          <hr className="border border-gray-200" />

          {
            status === "COMPLETED" ?
            <button
            className={`bg-[#0B5850] text-white text-[10px] sm:text-[11px] font-medium p-2 rounded-sm hover:bg-green-800 cursor-pointer`}
            onClick={handleAddReview}
          >
            Give Review
          </button> :
          <button
            className={`bg-[#0B5850] text-white text-[10px] sm:text-[11px] font-medium p-2 rounded-sm hover:bg-green-800 ${
              isPaymentDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={handlePayment}
            disabled={isPaymentDisabled}
          >
            {paymentButtonText}
          </button>
          }
        </section>
      </div>
    </>;
};

export default BookingDetails;