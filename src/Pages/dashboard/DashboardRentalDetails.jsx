import { ChevronRightIcon, StarIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import "../../styles/Details.css";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../AxiosInstance";
import Loading from "../../components/Loading";

const DashboardRentalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(true);

  // Fetch item details
  const fetchItemDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/item/details/${id}`);
      console.log(response)
      setItem(response.data);
      setImage(response.data?.images && response.data.images[0]);
    } catch (error) {
      console.error("Error fetching item details:", error);
      toast.error(error.response?.data?.message || "Failed to fetch item details");
      if (error.response?.status === 404) {
        navigate("/dashboard/inventory");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchItemDetails();
    } else {
      toast.error("No item ID provided");
      navigate("/dashboard/inventory");
    }
  }, [id, navigate]);

  if (loading) {
    return <Loading/>;
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <>
      <div className="dashboardDetailsHeader">
        <div className="overviewHeader">
          <h1>
            Dashboard <ChevronRightIcon className="w-5 h-5 inline" />
            <span className="text-gray-600">Rentals</span> <ChevronRightIcon className="w-5 h-5 inline" />{" "}
            <span className="text-gray-600">Details</span>
          </h1>
          <div className="overviewHeaderProfile">
            <img src={item.vendor?.profile || "/placeholder.png"} alt="Vendor" className="object-cover"/>
            <div className="overviewHeaderProfileDetails">
              <h4>{item.vendor?.companyName || "Vendor Name"}</h4>
              <p className="text-gray-700">Vendor</p>
            </div>
          </div>
        </div>
        <hr className="border-t-[1px] border-gray-200" />
      </div>

      <section className="dashboardTopRentalDetails">
        <div className="leftRentalDetails">
          <div className="smallImageRentalDetails">
            {item.images?.slice(0, 3).map((img, index) => (
              <img key={index} src={img || "/placeholder.png"} alt={`Item ${index}`} onClick={() => setImage(img)} className="cursor-pointer object-cover"/>
            ))}
          </div>
          <img src={image|| "/placeholder.png"} alt="Main item" className="bigImage object-cover" />
        </div>

        <div className="rightRentalDetails">
          <div className="rightRentalDetailsHeading">
            <small className="text-gray-600">{item.categoryType || "Unknown"}</small>
            <h1>{item.title}</h1>
            <div className="rightRentalRatingSystem">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-yellow-600" />
              ))}
              <small className="text-gray-600">{item.avgRating || "0.0"}</small>
              <small className="text-[#0B5850] font-medium">{item._count?.reviews || 0} reviews</small>
            </div>
          </div>
          <h3 className="text-[#0B5850] font-medium">
            ₦{item.price?.toLocaleString() || "N/A"}{" "}
            <small className="text-gray-600 font-medium">per {item.pricingUnit?.toLowerCase() || "unit"}</small>
          </h3>
          <div className="detailsHolder">
            <h4>Description:</h4>
            <p className="text-gray-700">{item.description || "No description available."}</p>
          </div>
          {item.quantity !== undefined && (
            <div className="detailsHolder">
              <h4>Stock Quantity:</h4>
              <p className="text-gray-700">{item.quantity} available</p>
            </div>
          )}
          <div className="detailsHolder">
            <h4>Terms and Care:</h4>
            <ul className="text-gray-700">
              {item.terms?.length > 0 ? (
                item.terms.map((term, index) => <li key={index}>{term}</li>)
              ) : (
                <li>No terms provided.</li>
              )}
            </ul>
          </div>
          <div className="detailsHolder">
            <h4>Location:</h4>
            <p className="text-gray-700">{item.locations?.join(", ") || "No locations specified."}</p>
          </div>
        </div>
      </section>

      <hr className="dashboardRentalDetailLine border-b-[1px] border-gray-200 mt-5" />

      <section className="dashboardBottomRentalDetails">
        <h2>Ratings & Reviews</h2>
        <div className="bottomRentalDetailsHolder">
          <div className="leftRentalDetailsRatings">
            <div className="ratingHeadline">
              <h1>
                4.8 <small className="text-gray-700">/5</small>
              </h1>
              <div className="ratingHeadlineStars">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="text-yellow-600 w-5 h-5" />
                ))}
              </div>
              <p className="text-gray-700">500 reviews</p>
            </div>
            <div className="ratingHeadlineProgress">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="headlineProgressWrap">
                  <div className="headlineProgressStar">
                    <StarIcon className="text-yellow-600 w-4 h-4" /> {star}
                  </div>
                  <div className="headlineProgress bg-gray-300">
                    <div
                      className="headlineInnerProgress bg-[#0B5850]"
                      style={{ width: `${[70, 80, 60, 90, 10][5 - star]}%` }}
                    ></div>
                  </div>
                  <span>102</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rightDetailsRatingsWrapper">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="rightDetailsRatings">
                <div className="rightDetailsRatingsInfo">
                  <img src="/placeholder.png" alt="Reviewer" />
                  <div className="rightDetailsRatingsInfoDetails">
                    <h3>Sophia</h3>
                    <small>Verified Buyer</small>
                  </div>
                </div>
                <div className="rightStarRating">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="text-yellow-600 w-4 h-4" />
                  ))}
                  <small>3 days ago</small>
                </div>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                </p>
                {index < 2 && <hr className="border-gray-200 border-[1px]" />}
              </div>
            ))}
          </div>
        </div>

        <div className="detailsPagination pagination flex flex-col items-end sm:items-end w-full">
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-1">
            <button
              className="inline-flex items-center justify-center py-2 px-4 rounded-md text-xs sm:text-sm font-medium text-stone-800 bg-transparent border-transparent hover:bg-stone-800/5 hover:border-stone-800/5 transition disabled:opacity-50"
              disabled
            >
              <svg className="mr-1.5 h-4 w-4 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M15 6L9 12L15 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Previous
            </button>
            <button className="inline-grid place-items-center min-w-[30px] min-h-[30px] rounded-md text-xs sm:text-sm font-medium text-stone-800 bg-transparent hover:bg-stone-800/5 transition">
              1
            </button>
            <button className="inline-grid place-items-center min-w-[30px] min-h-[30px] rounded-md text-xs sm:text-sm font-medium bg-[#0B5850] text-white hover:bg-stone-700 transition">
              2
            </button>
            <button className="hidden sm:inline-grid place-items-center min-w-[30px] min-h-[30px] rounded-md text-xs sm:text-sm font-medium text-stone-800 bg-transparent hover:bg-stone-800/5 transition">
              3
            </button>
            <button className="hidden sm:inline-grid place-items-center min-w-[30px] min-h-[30px] rounded-md text-xs sm:text-sm font-medium text-stone-800 bg-transparent hover:bg-stone-800/5 transition">
              4
            </button>
            <button className="hidden md:inline-grid place-items-center min-w-[30px] min-h-[30px] rounded-md text-xs sm:text-sm font-medium text-stone-800 bg-transparent hover:bg-stone-800/5 transition">
              5
            </button>
            <button
              className="inline-flex items-center justify-center py-2 px-4 rounded-md text-xs sm:text-sm font-medium text-stone-800 bg-transparent border-transparent hover:bg-stone-800/5 hover:border-stone-800/5 transition disabled:opacity-50"
              disabled
            >
              Next
              <svg className="ml-1.5 h-4 w-4 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 6L15 12L9 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardRentalDetails;