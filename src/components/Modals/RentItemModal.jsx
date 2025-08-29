import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import api from "../../AxiosInstance";
import PaystackPop from '@paystack/inline-js';
import SuccessfullRentModal from "../Modals/SuccessfullRentModal";
import { FaX } from "react-icons/fa6";
// Assume useAuth for user data
import { useNavigate } from "react-router";
import Cookies from "js-cookie"

const RentItemModal = ({ onClose, item }) => { 
  const navigate = useNavigate();
  const modalRef = useRef();
  const [formData, setFormData] = useState({
    address: "",
    quantity: 1,
    startDate: "",
    endDate: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const popup = new PaystackPop();
  const public_key = "pk_test_2739888aa5ce16964b6b127633df5176ffe74ea2"

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate days (if price is daily; adjust if flat)
  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 1;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;  // Inclusive
  };

  const days = calculateDays();
  const rentalCost = item.price * formData.quantity * days;  // Add * days if daily rate
  const securityDeposit = rentalCost * 0.1;
  const totalPrice = rentalCost + securityDeposit;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.address || !formData.startDate || !formData.endDate) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const response = await api.post("/booking/create", {
        itemId: item.id,
        startDate: formData.startDate,
        endDate: formData.endDate,
        address: formData.address,
        totalPrice,  // Includes deposit
      });


      const { bookingId, message } = response.data;
      toast.success(message);

      if (item.bookingType === "INSTANT") {  // Assume BookingType imported or hardcoded
        const reference = crypto.randomUUID(); 
        console.log(item) // Unique ref
        popup.newTransaction({
          key: public_key,  // From .env
          email: Cookies.get('email'),
          amount: Math.round(totalPrice * 100),  // Kobo
          reference,
          metadata: {
            bookingId,
            userId: item.vendor?.userId,
          },
          onSuccess: async (transaction) => {
            try {
              // Verify server-side
              const verifyRes = await api.get(`/transaction/verify?reference=${transaction.reference}`);
              console.log(verifyRes)
              if (verifyRes.data.data.data.status === "success") {
                setShowSuccessModal(true);
                // onClose()
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
        // Init Paystack on frontend
      }else{
        onClose()
      }
      // For REQUEST, no payment - modal handled by approval flow later
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Failed to process");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    {
      showSuccessModal && <SuccessfullRentModal/>
    }
      <div className="bg-black/70 w-full h-screen flex items-center justify-center z-10 fixed top-0 inset-0">
        <div
          className="bg-white mt-12 sm:mt-10 w-auto max-w-150 rounded-2xl px-8 py-8 flex flex-col gap-y-2"
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-1 w-full flex flex-col justify-right items-end">
            <FaX className="text-[9px] hover:text-red-600 w-fit cursor-pointer" onClick={onClose} />
          </div>
          <div className="flex flex-col items-center text-center gap-y-1">
            <h1 className="text-sm md:text-base lg:text-lg font-semibold">Fill the details to secure your booking</h1>
            <p className="text-gray-600 font-medium text-xs sm:text-[13px]">
              A 10% security deposit will be charged, which will be refunded after rental process completion
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-5">
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-1.5">
                <label htmlFor="address" className="text-xs sm:text-[13px] font-medium">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter the service address"
                  className="border border-gray-300 text-xs sm:text-[13px] px-3 py-2 rounded-xs"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-y-1.5">
                <label htmlFor="quantity" className="text-xs sm:text-[13px] font-medium">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  placeholder="Enter the quantity"
                  className="border border-gray-300 text-xs sm:text-[13px] px-3 py-2 rounded-xs"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                />
              </div>
              <div className="detailsHolder">
                <h4>Rental Duration:</h4>
                <div className="inputContainer">
                  <input
                    type="date"
                    name="startDate"
                    placeholder="Rent Start Date"
                    className="border-[1px] border-gray-300"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                  -
                  <input
                    type="date"
                    name="endDate"
                    placeholder="Rent End Date"
                    className="border-[1px] border-gray-300"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="text-xs sm:text-[13px] flex flex-col gap-y-2 justify-left w-full mt-5">
              <div className="flex items-center gap-x-1">
                <p className="font-semibold">Security Deposit:</p>
                <p>₦{securityDeposit.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-x-1">
                <p className="font-semibold">Rental Cost:</p>
                <p>₦{rentalCost.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-x-1">
                <p className="font-semibold">Total Price:</p>
                <p>₦{totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#0B5850] hover:bg-green-600 transition mt-7 w-full rounded-sm px-5 py-3 text-white text-[11px] sm:text-xs cursor-pointer"
              disabled={submitting}
            >
              {submitting ? "Processing..." : "Proceed"}
            </button>
          </form>
        </div>
      </div>

      {showSuccessModal && (
        <SuccessfullRentModal onClose={() => setShowSuccessModal(false)} />
      )}
    </>
  );
};

export default RentItemModal;