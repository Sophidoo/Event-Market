import { ChevronRightIcon } from "@heroicons/react/24/outline";
import "../../styles/dashboard/Reveiw.css";
import review from "../../assets/images/satisfaction.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../../styles/dashboard/Inventory.css";
import { useState, useEffect } from "react";
import DeleteReviewModal from "../../components/Modals/DeleteReviewModal";
import api from "../../AxiosInstance";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const DashboardReviews = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewToDelete, setReviewToDelete] = useState(null); // New state for review ID
  const [reviewStats, setReviewStats] = useState({
    avgRating: 0,
    totalReview: 0,
    star5: 0,
    star4: 0,
    star3: 0,
    star2: 0,
    star1: 0,
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    pageSize: 10,
  });
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // Fetch reviews based on user role
  const fetchReviews = async (page = 1) => {
    setReviewsLoading(true);
    try {
      const role = Cookies.get("role");
      const endpoint =
        role === "ADMIN"
          ? `/review/all/${page}/${pagination.pageSize}`
          : `/review/vendor/${page}/${pagination.pageSize}`;

      const response = await api.get(endpoint);
      const { data, meta, stats } = response.data;
      setReviews(data);
      setPagination({
        current_page: meta.page,
        last_page: meta.totalPages,
        total: meta.total,
        pageSize: meta.pageSize,
      });
      setReviewStats({
        avgRating: stats.avgRating,
        totalReview: stats.totalReview,
        star5: stats.star5,
        star4: stats.star4,
        star3: stats.star3,
        star2: stats.star2,
        star1: stats.star1,
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error(error.response?.data?.message || "Failed to fetch reviews");
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(pagination.current_page);
  }, []);

  // Handle review deletion
  const handleDeleteItem = async () => {
    if (!reviewToDelete) return;
    toast.info("Deleting..., Please wait")

    try {
      const response = await api.delete(`/review/delete/${reviewToDelete}`);
      toast.success(response.data || "Review deleted successfully");
      setShowDeleteModal(false);
      setReviewToDelete(null);
      fetchReviews(pagination.current_page); // Refresh reviews
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error(error.response?.data?.message || "Failed to delete review");
    }
  };

  // Pagination handlers
  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= pagination.last_page) {
      setPagination((prev) => ({ ...prev, current_page: pageNum }));
      fetchReviews(pageNum);
    }
  };

  const setPreviousPage = () => goToPage(pagination.current_page - 1);
  const setNextPage = () => goToPage(pagination.current_page + 1);

  const StarRating = ({ rating }) => {
    const totalStars = 5;
    return (
      <div className="flex items-center">
        {[...Array(totalStars)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${
              index < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <>
      {showDeleteModal && (
        <DeleteReviewModal
          onClose={() => {
            setShowDeleteModal(false);
            setReviewToDelete(null);
          }}
          onConfirm={handleDeleteItem}
        />
      )}
      <div className="dashboardReviewContainer">
        <div className="overviewHeader flex-col">
          <h1>
            Dashboard <ChevronRightIcon />
            <span className="text-gray-600">Reviews</span>
          </h1>
          <p className="text-gray-500 text-[12px] sm:text-[13px]">
            Keep track and manage reviews made by users.
          </p>
        </div>
      </div>

      <div className="reviewSummary border-[1px] border-gray-200">
        <div className="leftReviewSummaryContainer">
          <img src={review} alt="" />
          <div className="leftReviewSummary">
            <h1>{reviewStats.avgRating.toFixed(2)}</h1>
            <p className="text-gray-600"> {reviewStats.totalReview} reviews </p>
          </div>
        </div>

        <div className="rightReviewSummary">
          {[5, 4, 3, 2, 1].map((rating) => {
            const percentage =
              reviewStats.totalReview > 0
                ? (reviewStats[`star${rating}`] / reviewStats.totalReview) * 100
                : 0;
            return (
              <div key={rating} className="reviewBarWrap">
                <small>{rating} Star</small>
                <div className="reviewBar">
                  <div
                    className="reviewInnerBar"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <small>{reviewStats[`star${rating}`]}</small>
              </div>
            );
          })}
        </div>
      </div>

      <div className="adminInventoryWrapper">
        <div className="relative overflow-x-auto mt-[-10px]">
          <table className="w-full">
            <thead className="text-gray-500">
              <tr className="border-b-[1px] border-gray-200">
                <th scope="col">
                  <div className="tableHeadingDiv">
                    <p>Item</p>
                  </div>
                </th>
                <th scope="col" className="">
                  Reviewer
                </th>
                <th scope="col" className="w-[500px]">
                  Review
                </th>
                <th scope="col" className="">
                  Date
                </th>
                {
                    Cookies.get("role") === "ADMIN" &&
                    <th scope="col" className="w-1"></th>
                }
              </tr>
            </thead>
            <tbody>
              {reviewsLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0B5850]"></div>
                    </div>
                  </td>
                </tr>
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-700">
                    No reviews available.
                  </td>
                </tr>
              ) : (
                reviews.map((el) => (
                  <tr
                    key={el.id}
                    className="bg-white border-b-[1px] border-gray-200"
                  >
                    <td
                      scope="row"
                      className="font-medium whitespace-nowrap text-gray-800"
                    >
                      <div className="tableProductDetails">
                        <img
                          src={el.item?.images && el.item?.images[0] || "https://via.placeholder.com/50"}
                          alt=""
                          className="object-cover"
                        />
                        <p>
                          {el.item?.title || "N/A"}{" "}
                          <br />
                          <span className="text-gray-500 text-[11px]">
                            {el.item?.category}
                          </span>
                        </p>
                      </div>
                    </td>
                    <td
                      scope="row"
                      className="font-medium whitespace-nowrap text-gray-800"
                    >
                      <div className="tableProductDetails">
                        <img
                          src={
                            el.user?.profile || "https://via.placeholder.com/50"
                          }
                          alt=""
                        />
                        <p>
                          {el.user?.name || "N/A"}{" "}
                          <br />
                          <span className="text-gray-500 text-[11px]">
                            {el.user?.email || "N/A"}
                          </span>
                        </p>
                      </div>
                    </td>
                    <td scope="row" className="text-gray-500">
                      <div className="flex-col items-start">
                        <StarRating rating={el.rating} />
                        <p className="mt-[5px]">{el.comment}</p>
                      </div>
                    </td>
                    <td className="text-gray-500">
                      {new Date(el.createdAt).toLocaleString()}
                    </td>
                    {
                        Cookies.get("role") === "ADMIN" &&
                        <td
                        className="text-gray-600 hover:text-red-700 cursor-pointer"
                        onClick={() => {
                            setReviewToDelete(el.id); // Set the review ID to delete
                            setShowDeleteModal(true);
                        }}
                        >
                        <RiDeleteBin6Line className="w-[17px] cursor-pointer" />
                        </td>
                    }
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="inventoryPagination">
          <p className="text-gray-700">
            Page {pagination.current_page} of {pagination.last_page}
          </p>

          <div className="inventoryPaginationButtons">
            <button
              className={`border-[1px] border-gray-300 ${
                pagination.current_page === 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={setPreviousPage}
              disabled={pagination.current_page === 1}
            >
              Previous
            </button>
            <button
              className={`border-[1px] border-gray-300 ${
                pagination.current_page === pagination.last_page
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={setNextPage}
              disabled={pagination.current_page === pagination.last_page}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardReviews;