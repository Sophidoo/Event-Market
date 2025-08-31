import { StarIcon } from "@heroicons/react/16/solid";
import "../styles/Details.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../AxiosInstance";
import Cookies from "js-cookie";
import RentItemModal from "../components/Modals/RentItemModal";
import Loading from "../components/Loading";

const RentalDetails = () => {
  const { id } = useParams(); // Get item ID from URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showRentModal, setShowRentModal] = useState(false);
  const [image, setImage] = useState("");
  const [rentalDuration, setRentalDuration] = useState({
    startDate: "",
    endDate: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  // State to track wishlist loading and status for the item
  const [wishlistStatus, setWishlistStatus] = useState({ isInWishlist: false, isLoading: false });

  // State for reviews and pagination
  const [reviews, setReviews] = useState([]);
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
    pageSize: 3, // Default page size, adjust as needed
  });
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // Fetch item details
  const fetchItemDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/item/details/${id}`);
      console.log("Item data fetched:", response.data);
      setItem(response.data);
      setImage(response.data.images?.[0] || "");
    } catch (error) {
      console.error("Error fetching item details:", error);
      toast.error(error.response?.data?.message || "Failed to fetch item details");
    } finally {
      setLoading(false);
    }
  };

  // Fetch reviews for the item
  const fetchReviews = async (page = 1) => {
    setReviewsLoading(true);
    try {
      const response = await api.get(`/review/item/${id}/${page}/${pagination.pageSize}`);
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
    fetchItemDetails();
    fetchReviews(pagination.current_page);
  }, [id]);

  const handleAddToWishlist = () => {
    if (!Cookies.get("token")) {
      toast.error("Please login first");
      return;
    }

    setWishlistStatus((prev) => ({ ...prev, isLoading: true }));

    api
      .post(`/wishlist/add/${id}`)
      .then((response) => {
        setWishlistStatus({ isInWishlist: true, isLoading: false });
        toast.success(response.data || "Item added to wishlist successfully");
      })
      .catch((err) => {
        setWishlistStatus((prev) => ({ ...prev, isLoading: false }));
        toast.error(err.response?.data?.message || "Failed to add item to wishlist");
      });
  };

  // Handle input changes for rental duration
  const handleRentalDurationChange = (e) => {
    const { name, value } = e.target;
    console.log(`Rental duration changed: ${name} = ${value}`);
    setRentalDuration((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate total price based on rental duration
  useEffect(() => {
    if (item && rentalDuration.startDate && rentalDuration.endDate) {
      const start = new Date(rentalDuration.startDate);
      const end = new Date(rentalDuration.endDate);
      if (start < end) {
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const price = item.price * days;
        setTotalPrice(price);
      } else {
        setTotalPrice(0);
        toast.error("End date must be after start date");
      }
    } else {
      setTotalPrice(0);
    }
  }, [rentalDuration, item]);

  // Pagination handlers
  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= pagination.last_page) {
      setPagination((prev) => ({ ...prev, current_page: pageNum }));
      fetchReviews(pageNum);
    }
  };

  const handleRent = () => {
    if (!Cookies.get("token")) {
      toast.error("Please login first");
      return;
    }
    setShowRentModal(true);
  };

  const setPreviousPage = () => goToPage(pagination.current_page - 1);
  const setNextPage = () => goToPage(pagination.current_page + 1);

  const renderPaginationButtons = () => {
    const buttons = [];
    const totalPages = pagination.last_page;
    const currentPage = pagination.current_page;
    const maxVisibleButtons = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    buttons.push(
      <button
        key="prev"
        className={`inline-flex items-center justify-center py-2 px-4 rounded-md text-xs sm:text-sm font-medium ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-stone-800/5"
        }`}
        onClick={setPreviousPage}
        disabled={currentPage === 1}
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
            1 === currentPage ? "bg-[#0B5850] text-white" : "hover:bg-stone-800/5"
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
            i === currentPage ? "bg-[#0B5850] text-white" : "hover:bg-stone-800/5"
          }`}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="right-ellipsis" className="px-2">...</span>);
      }
      buttons.push(
        <button
          key={totalPages}
          className={`inline-grid place-items-center min-w-[30px] min-h-[30px] rounded-md text-xs sm:text-sm font-medium ${
            totalPages === currentPage ? "bg-[#0B5850] text-white" : "hover:bg-stone-800/5"
          }`}
          onClick={() => goToPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        className={`inline-flex items-center justify-center py-2 px-4 rounded-md text-xs sm:text-sm font-medium ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-stone-800/5"
        }`}
        onClick={setNextPage}
        disabled={currentPage === totalPages}
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

  if (!item) {
    return <div className="text-center py-10">Rental item not found</div>;
  }

  return (
    <>
      {showRentModal && (
        <RentItemModal
          unit={item?.pricingUnit?.toLowerCase()}
          onClose={() => setShowRentModal(false)}
          onConfirm={(formData) => {
            setShowRentModal(false);
          }}
          item={item}
        />
      )}
      <section className="topRentalDetails">
        <div className="leftRentalDetails">
          <div className="smallImageRentalDetails">
            {item.images?.map((img, index) => (
              <img
                key={index}
                src={img || "https://via.placeholder.com/150"}
                alt={`Rental ${index}`}
                className="cursor-pointer"
                onClick={() => setImage(img)}
              />
            ))}
          </div>
          <img src={image} alt={item.title} className="bigImage" />
        </div>

        <div className="rightRentalDetails">
          <div className="rightRentalDetailsHeading">
            <small className="text-gray-600">{item.categoryType?.toUpperCase()}</small>
            <h1>{item.title}</h1>
            <div className="rightRentalRatingSystem">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={i < Math.round(item.avgRating) ? "text-yellow-600" : "text-gray-300"}
                />
              ))}
              <small className="text-gray-600">[{item.avgRating || "0.0"}]</small>
              <small className="text-[#0B5850] font-medium">{item._count?.reviews || 0} reviews</small>
            </div>
          </div>
          <h3 className="text-[#0B5850] font-medium">
            N{item.price} <small className="text-gray-600 font-medium">per {item.pricingUnit?.toLowerCase()}</small>
          </h3>
          <div className="detailsHolder">
            <h4>Description:</h4>
            <p className="text-gray-700">{item.description}</p>
          </div>

          <div className="detailsHolder">
            <h4>Terms and Care:</h4>
            <ul className="text-gray-700">
              {item.terms?.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
          </div>

          <div className="detailsHolder">
            <h4>Location:</h4>
            <p className="text-gray-700">{item.locations?.join(", ")}</p>
          </div>

          <div className="buttonHolder">
            <button
              className="bg-[#0B5850] border-[1px] border-[#0B5850] font-medium text-white cursor-pointer transition hover:bg-green-700"
              onClick={handleRent}
            >
              Rent Now
            </button>
            <button
              className={`border-[1px] border-[#0B5850] font-medium ${
                wishlistStatus.isInWishlist ? "text-red-600" : "text-[#0B5850]"
              } ${wishlistStatus.isLoading ? "opacity-50 cursor-not-allowed" : "hover:text-green-600"}`}
              onClick={handleAddToWishlist}
              disabled={wishlistStatus.isLoading}
            >
              {wishlistStatus.isLoading ? "Loading..." : "Save for Later"}
            </button>
          </div>
        </div>
      </section>

      <hr className="rentalDetailLine border-[1px] border-gray-200" />

      <section className="bottomRentalDetails">
        <h2>Ratings & Reviews</h2>
        <div className="bottomRentalDetailsHolder">
          <div className="leftRentalDetailsRatings">
            <div className="ratingHeadline">
              <h1>
                {reviewStats.avgRating.toFixed(1)} <small className="text-gray-700"> /5</small>
              </h1>
              <div className="ratingHeadlineStars">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className={i < Math.round(reviewStats.avgRating) ? "text-yellow-600" : "text-gray-300"} />
                ))}
              </div>
              <p className="text-gray-700">{reviewStats.totalReview} reviews</p>
            </div>
            <div className="ratingHeadlineProgress">
              {[5, 4, 3, 2, 1].map((rating) => {
                const percentage = reviewStats.totalReview > 0
                  ? (reviewStats[`star${rating}`] / reviewStats.totalReview) * 100
                  : 0;
                return (
                  <div key={rating} className="headlineProgressWrap">
                    <div className="headlineProgressStar">
                      <StarIcon className="text-yellow-600" />
                      {rating}
                    </div>
                    <div className="headlineProgress bg-gray-300">
                      <div
                        className="headlineInnerProgress bg-[#0B5850]"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span>{reviewStats[`star${rating}`]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rightDetailsRatingsWrapper">
            {reviewsLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0B5850]"></div>
              </div>
            ) : reviews.length === 0 ? (
              <p className="text-gray-700">No reviews available.</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="rightDetailsRatings">
                  <div className="rightDetailsRatingsInfo">
                    <img
                      src={review.user.profile || "https://via.placeholder.com/50"}
                      alt={review.user.name}
                    />
                    <div className="rightDetailsRatingsInfoDetails">
                      <h3>{review.user.name}</h3>
                      <small>{review.user.verified ? "Verified Buyer" : "Unverified"}</small>
                    </div>
                  </div>
                  <div className="rightStarRating">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={i < review.rating ? "text-yellow-600" : "text-gray-300"}
                      />
                    ))}
                    <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  <hr className="border-gray-200 border-[1px]" />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="detailsPagination pagination flex flex-col items-end sm:items-end w-full">
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-1">
            {renderPaginationButtons()}
          </div>
        </div>
      </section>
    </>
  );
};

export default RentalDetails;