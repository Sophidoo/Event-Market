import { StarIcon } from "@heroicons/react/16/solid";
import "../styles/Details.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../AxiosInstance";

const RentalDetails = () => {
    const { id } = useParams(); // Get item ID from URL
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("");
    const [rentalDuration, setRentalDuration] = useState({
        startDate: "",
        endDate: "",
    });
    const [totalPrice, setTotalPrice] = useState(0);

    // Static review data (since API isn't ready)
    const staticReviews = [
        {
            id: 1,
            user: { name: "Sophia", profile: "", verified: true },
            rating: 5,
            comment:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        },
        {
            id: 2,
            user: { name: "Sophia", profile: "", verified: true },
            rating: 5,
            comment:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
        {
            id: 3,
            user: { name: "Sophia", profile: "", verified: true },
            rating: 5,
            comment:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
    ];

    // Static review stats for progress bars
    const reviewStats = {
        stats: { 5: 102, 4: 102, 3: 102, 2: 102, 1: 102 },
        totalReviews: 510,
        percentages: { 5: 70, 4: 80, 3: 60, 2: 90, 1: 10 },
    };

    // Pagination state for reviews (static)
    const [pagination, setPagination] = useState({
        current_page: 2,
        last_page: 5,
    });

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

    useEffect(() => {
        fetchItemDetails();
    }, [id]);

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

    // Pagination handlers (static, for UI demonstration)
    const goToPage = (pageNum) => {
        if (pageNum >= 1 && pageNum <= pagination.last_page) {
            setPagination((prev) => ({ ...prev, current_page: pageNum }));
        }
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
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B5850]"></div>
            </div>
        );
    }

    if (!item) {
        return <div className="text-center py-10">Rental item not found</div>;
    }

    return (
        <>
            <section className="topRentalDetails">
                <div className="leftRentalDetails">
                    <div className="smallImageRentalDetails">
                        {item.images?.map((img, index) => (
                            <img key={index} src={img || "https://via.placeholder.com/150"} alt={`Rental ${index}`} className="cursor-pointer" onClick={() => setImage(img)}/>
                        ))}
                    </div>
                    <img
                        src={image}
                        alt={item.title}
                        className="bigImage"
                    />
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

                    <div className="detailsHolder">
                        <h4>Rental Duration:</h4>
                        <div className="inputContainer">
                            <input
                                type="date"
                                name="startDate"
                                placeholder="Rent Start Date"
                                className="border-[1px] border-gray-300"
                                value={rentalDuration.startDate}
                                onChange={handleRentalDurationChange}
                            />
                            -
                            <input
                                type="date"
                                name="endDate"
                                placeholder="Rent End Date"
                                className="border-[1px] border-gray-300"
                                value={rentalDuration.endDate}
                                onChange={handleRentalDurationChange}
                            />
                        </div>
                    </div>

                    <h4 className="totalRentalPrice">Total: N{totalPrice.toLocaleString()}</h4>

                    <div className="buttonHolder">
                        <button
                            className="bg-[#0B5850] border-[1px] border-[#0B5850] font-medium text-white opacity-50 cursor-not-allowed"
                            disabled
                        >
                            Rent Now
                        </button>
                        <button
                            className="border-[1px] border-[#0B5850] text-[#0B5850] font-medium opacity-50 cursor-not-allowed"
                            disabled
                        >
                            Save for Later
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
                                4.8 <small className="text-gray-700"> /5</small>
                            </h1>
                            <div className="ratingHeadlineStars">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} className="text-yellow-600" />
                                ))}
                            </div>
                            <p className="text-gray-700">{reviewStats.totalReviews} reviews</p>
                        </div>
                        <div className="ratingHeadlineProgress">
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <div key={rating} className="headlineProgressWrap">
                                    <div className="headlineProgressStar">
                                        <StarIcon className="text-yellow-600" />
                                        {rating}
                                    </div>
                                    <div className="headlineProgress bg-gray-300">
                                        <div
                                            className="headlineInnerProgress bg-[#0B5850]"
                                            style={{ width: `${reviewStats.percentages[rating]}%` }}
                                        ></div>
                                    </div>
                                    <span>{reviewStats.stats[rating]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rightDetailsRatingsWrapper">
                        {staticReviews.map((review) => (
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
                                    <small>{review.createdAt.toLocaleDateString()}</small>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                                <hr className="border-gray-200 border-[1px]" />
                            </div>
                        ))}
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