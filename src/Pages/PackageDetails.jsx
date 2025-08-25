
import { StarIcon } from "@heroicons/react/16/solid"
import "../styles/Details.css"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../AxiosInstance"
import SuccessfullRentModal from "../components/Modals/SuccessfullRentModal"

const PackageDetails = () => {
    const { id } = useParams(); // Get package ID from URL
    const [modal, setModal] = useState(false)
    const [packageData, setPackageData] = useState(null);
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [rentalDuration, setRentalDuration] = useState({
        startDate: "",
        endDate: "",
    });
    const [totalPrice, setTotalPrice] = useState(0);

    // Fetch package details
    const fetchPackageDetails = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/item/details/${id}`);
            console.log("Package data fetched:", response.data);
            setPackageData(response.data);
            setImage(response.data.images?.[0] || "");
        } catch (error) {
            console.error("Error fetching package details:", error);
            toast.error(error.response?.data?.message || "Failed to fetch package details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackageDetails();
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
        if (packageData && rentalDuration.startDate && rentalDuration.endDate) {
            const start = new Date(rentalDuration.startDate);
            const end = new Date(rentalDuration.endDate);
            if (start < end) {
                const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                const price = packageData.price * days;
                setTotalPrice(price);
            } else {
                setTotalPrice(0);
                toast.error("End date must be after start date");
            }
        } else {
            setTotalPrice(0);
        }
    }, [rentalDuration, packageData]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B5850]"></div>
            </div>
        );
    }

    if (!packageData) {
        return <div className="text-center py-10">Package not found</div>;
    }

    return <>
        {
            modal ? <SuccessfullRentModal/> : ""
        }
        <section className="topRentalDetails">
            <div className="leftRentalDetails">
                <div className="smallImageRentalDetails">
                    {packageData.images?.map((img, index) => (
                        <img key={index} src={img } alt={`PAckage ${index}`} className="cursor-pointer" onClick={() => setImage(img)}/>
                    ))}
                </div>
                <img src={image} alt="" className="bigImage" />
            </div>

            <div className="rightRentalDetails">
                <div className="rightRentalDetailsHeading">
                    <small className="text-gray-600">{packageData.categoryType?.toUpperCase()}</small>
                    <h1>{packageData.title || "Wedding Package"}</h1>
                    <div className="rightRentalRatingSystem">
                        <StarIcon className={packageData.avgRating >= 1 ? "text-yellow-600" : "text-gray-300"}/>
                        <StarIcon className={packageData.avgRating >= 2 ? "text-yellow-600" : "text-gray-300"}/>
                        <StarIcon className={packageData.avgRating >= 3 ? "text-yellow-600" : "text-gray-300"}/>
                        <StarIcon className={packageData.avgRating >= 4 ? "text-yellow-600" : "text-gray-300"}/>
                        <StarIcon className={packageData.avgRating >= 5 ? "text-yellow-600" : "text-gray-300"}/>
                        <small className="text-gray-600">[{packageData.avgRating}]</small>
                        <small className="text-[#0B5850] font-medium">{packageData._count?.reviews} reviews</small>
                    </div>
                </div>
                <h3 className="text-[#0B5850] font-medium"> N{packageData.price?.toLocaleString()} </h3>
                <div className="detailsHolder">
                    <h4>Description:</h4>
                    <p className="text-gray-700">{packageData.description}</p>
                </div>

                <div className="detailsHolder">
                    <h4>What this package offers:</h4>
                    <ul className="text-gray-700">
                        {packageData.offers?.length && packageData.offers.map((offer, index) => (
                            <li key={index}>{offer}</li>
                        ))}
                    </ul>
                </div>

                <div className="detailsHolder">
                    <h4>Locations package is offered:</h4>
                    <p className="text-gray-700">{packageData.locations?.join(", ")}</p>
                </div>

                <div className="detailsHolder">
                    <h4>Vendor Details:</h4>
                    <p className="text-gray-700">
                        <span>Name: </span> {packageData.vendor?.companyName} <br />
                        <span>Location: </span> {packageData.vendor?.address}
                    </p>
                </div>

                <div className="detailsHolder">
                    <h4>Rental Duration:</h4>

                    <div className="inputContainer">
                        <input
                            type="date"
                            name="startDate"
                            id=""
                            placeholder="Rent Start Date"
                            className="border-[1px] border-gray-300"
                            value={rentalDuration.startDate}
                            onChange={handleRentalDurationChange}
                        />
                        -
                        <input
                            type="date"
                            name="endDate"
                            id=""
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
                        onClick={() => setModal(true)}
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

        <hr className="rentalDetailLine border-[1px] border-gray-200"/>

        <section className="bottomRentalDetails">
            <h2>Ratings & Reviews</h2>
            <div className="bottomRentalDetailsHolder">
                <div className="leftRentalDetailsRatings">
                    <div className="ratingHeadline">
                        <h1>4.8 <small className="text-gray-700"> /5</small></h1>
                        <div className="ratingHeadlineStars">
                            <StarIcon className="text-yellow-600"/>
                            <StarIcon className="text-yellow-600"/>
                            <StarIcon className="text-yellow-600"/>
                            <StarIcon className="text-yellow-600"/>
                            <StarIcon className="text-yellow-600"/>
                        </div>
                        <p className="text-gray-700">500 reviews</p>
                    </div>
                    <div className="ratingHeadlineProgress">
                        <div className="headlineProgressWrap">
                            <div className="headlineProgressStar">  <StarIcon className="text-yellow-600"/>
                                5
                            </div>
                            <div className="headlineProgress bg-gray-300">
                                <div className="headlineInnerProgress bg-[#0B5850] w-[70%]"></div>
                            </div>
                            <span>102</span>
                        </div>
                        <div className="headlineProgressWrap">
                            <div className="headlineProgressStar">  <StarIcon className="text-yellow-600"/>
                                4
                            </div>
                            <div className="headlineProgress bg-gray-300">
                                <div className="headlineInnerProgress bg-[#0B5850] w-[80%]"></div>
                            </div>
                            <span>102</span>
                        </div>
                        <div className="headlineProgressWrap">
                            <div className="headlineProgressStar">  <StarIcon className="text-yellow-600"/>
                                3
                            </div>
                            <div className="headlineProgress bg-gray-300">
                                <div className="headlineInnerProgress bg-[#0B5850] w-[60%]"></div>
                            </div>
                            <span>102</span>
                        </div>
                        <div className="headlineProgressWrap">
                            <div className="headlineProgressStar">  <StarIcon className="text-yellow-600"/>
                                2
                            </div>
                            <div className="headlineProgress bg-gray-300">
                                <div className="headlineInnerProgress bg-[#0B5850] w-[90%]"></div>
                            </div>
                            <span>102</span>
                        </div>
                        <div className="headlineProgressWrap">
                            <div className="headlineProgressStar">  <StarIcon className="text-yellow-600"/>
                                1
                            </div>
                            <div className="headlineProgress bg-gray-300">
                                <div className="headlineInnerProgress bg-[#0B5850] w-[10%]"></div>
                            </div>
                            <span>102</span>
                        </div>
                    </div>
                </div>

                <div className="rightDetailsRatingsWrapper">
                    <div className="rightDetailsRatings">
                        <div className="rightDetailsRatingsInfo">
                            <img src="" alt="" />
                            <div className="rightDetailsRatingsInfoDetails">
                                <h3>Sophia</h3>
                                <small>Verified Buyer</small>
                            </div>
                        </div>
                        <div className="rightStarRating">
                            <StarIcon className="text-yellow-600"/>
                            <StarIcon className="text-yellow-600"/>
                            <StarIcon className="text-yellow-600"/>
                            <StarIcon className="text-yellow-600"/>
                            <StarIcon className="text-yellow-600"/>
                            <small>3 days ago</small>
                        </div>
                        <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                    </div>
                    <hr className="border-gray-200 border-[1px]"/>
                    <div className="rightDetailsRatings">
                        <div className="rightDetailsRatingsInfo">
                            <img src="" alt="" />
                            <div className="rightDetailsRatingsInfoDetails">
                                <h3>Sophia</h3>
                                <small>Verified Buyer</small>
                            </div>
                        </div>
                        <div className="rightStarRating">
                            <StarIcon className="text-yellow-600"/>
                            <StarIcon className="text-yellow-600"/>
                            <StarIcon className="text-yellow-600"/>
                            <StarIcon className="text-yellow-600"/>
                            <StarIcon className="text-yellow-600"/>
                            <small>3 days ago</small>
                        </div>
                        <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                    </div>
                    <hr  className="border-gray-200 border-[1px]"/>
                    <div className="rightDetailsRatings">
                        <div className="rightDetailsRatingsInfo">
                            <img src="" alt="" />
                            <div className="rightDetailsRatingsInfoDetails">
                                <h3>Sophia</h3>
                                <small>Verified Buyer</small>
                            </div>
                        </div>
                        <div className="rightStarRating">
                            <StarIcon className="text-yellow-600"/>
                            <StarIcon className="text-yellow-600"/>
                            <StarIcon className="text-yellow-600"/>
                            <StarIcon className="text-yellow-600"/>
                            <StarIcon className="text-yellow-600"/>
                            <small>3 days ago</small>
                        </div>
                        <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                    </div>
                    
                </div>
            </div>

            <div className="detailsPagination pagination flex flex-col items-end sm:items-end w-full">
                <div className="flex flex-wrap justify-center sm:justify-end items-center gap-1">
                    {/* Previous Button */}
                    <button
                    className="inline-flex items-center justify-center py-2 px-4 rounded-md text-xs sm:text-sm font-medium text-stone-800 bg-transparent border-transparent hover:bg-stone-800/5 hover:border-stone-800/5 transition disabled:opacity-50"
                    >
                    <svg
                        className="mr-1.5 h-4 w-4 stroke-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                        d="M15 6L9 12L15 18"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>
                    Previous
                    </button>

                    {/* Page Buttons */}
                    <button className="inline-grid place-items-center min-w-[30px] min-h-[30px] rounded-md  text-xs sm:text-sm font-medium text-stone-800 bg-transparent hover:bg-stone-800/5 transition">
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

                    {/* Next Button */}
                    <button
                    className="inline-flex items-center justify-center py-2 px-4 rounded-md text-xs sm:text-sm font-medium text-stone-800 bg-transparent border-transparent hover:bg-stone-800/5 hover:border-stone-800/5 transition disabled:opacity-50"
                    >
                    Next
                    <svg
                        className="ml-1.5 h-4 w-4 stroke-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                        d="M9 6L15 12L9 18"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>
                    </button>
                </div>
            </div>
        </section>
    </>
}

export default PackageDetails
