import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import api from "../../AxiosInstance";
import { FaX } from "react-icons/fa6";
// Assume useAuth for user data
import { useNavigate } from "react-router";
import Cookies from "js-cookie"

const AddReviewModal = ({ onClose, id, onConfirm }) => { 
  const modalRef = useRef();
  const [formData, setFormData] = useState({
    comment: "",
    rating: 5,
  });
  const [submitting, setSubmitting] = useState(false);

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    

    setSubmitting(true);
    try {
      const response = await api.post(`/review/create/${id}`, {
        comment: formData.comment || "No comments",
        rating: +formData.rating  // Includes deposit
      });
      console.log(response)
      toast.success(response.data);
      setSubmitting(false)

      onClose()

    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Failed to process");
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <>
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
            <h1 className="text-sm md:text-base lg:text-lg font-semibold">Give Review</h1>
            <p className="text-gray-600 font-medium text-xs sm:text-[13px]">
              Your review helps give us transparency for other users who may want to rent this item
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-5">
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-1.5">
                <label htmlFor="address" className="text-xs sm:text-[13px] font-medium">
                  Comment
                </label>
                <textarea name="comment" id="comment" placeholder="Please write a brief comment about your experience with this item and vendor" value={formData.comment} onChange={handleInputChange} className="border border-gray-300 text-xs sm:text-[13px] px-3 py-2 rounded-sm resize-y"></textarea>
              </div>
              <div className="flex flex-col gap-y-1.5">
                <label htmlFor="quantity" className="text-xs sm:text-[13px] font-medium">
                  Rating
                </label>
                <select name="rating" id="rating" required value={formData.rating} onChange={handleInputChange} className="border border-gray-300 text-xs sm:text-[13px] px-3 py-2 rounded-sm">
                    <option value="">Please select a star rating</option>
                    <option value="5">5 star</option>
                    <option value="4">4 star</option>
                    <option value="3">3 star</option>
                    <option value="2">2 star</option>
                    <option value="1">1 star</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#0B5850] hover:bg-green-600 transition mt-7 w-full rounded-sm px-5 py-3 text-white text-[11px] sm:text-xs cursor-pointer"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

    </>
  );
};

export default AddReviewModal;