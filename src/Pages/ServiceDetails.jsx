import { StarIcon } from "@heroicons/react/16/solid"
import "../styles/Details.css"
import { useState } from "react"
import SuccessfullRentModal from "../components/Modals/SuccessfullRentModal"

const ServiceDetails = () => {
    const [modal, setModal] = useState(false)

    return<>
    {
        modal ? <SuccessfullRentModal/> : ""
    }
        <section className="topRentalDetails">
            <div className="leftRentalDetails">
                <div className="smallImageRentalDetails">
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                </div>
                <img src="" alt="" className="bigImage" />
            </div>

            <div className="rightRentalDetails">
                <div className="rightRentalDetailsHeading">
                    <small className="text-gray-600">FOOD</small>
                    <h1>Catering</h1>
                    <div className="rightRentalRatingSystem">
                        <StarIcon className="text-yellow-600"/>
                        <StarIcon className="text-yellow-600"/>
                        <StarIcon className="text-yellow-600"/>
                        <StarIcon className="text-yellow-600"/>
                        <StarIcon className="text-yellow-600"/>
                        <small className="text-gray-600">[4.5]</small>
                        <small className="text-[#0B5850] font-medium">500 reviews</small>
                    </div>
                </div>
                <h3 className="text-[#0B5850] font-medium"><small className="text-gray-600 font-medium">From:</small> N3000 </h3>
                <div className="detailsHolder">
                    <h4>Description:</h4>
                    <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                </div>

                <div className="detailsHolder">
                    <h4>What this service offers:</h4>
                    <ul className="text-gray-700">
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                    </ul>
                </div>

                <div className="detailsHolder">
                    <h4>Locations Service is offered:</h4>
                    <p className="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta dolore atque officia iusto tempore incidunt delectus maiores a eaque inventore.</p>
                </div>

                <div className="detailsHolder">
                    <h4>Vendor Details:</h4>
                    <p className="text-gray-700">
                        <span>Name: </span> <br />
                        <span>Location: </span>
                    </p>
                </div>

                <div className="detailsHolder">
                    <h4>Rental Duration:</h4>

                    <div className="inputContainer">
                        <input type="date" name="" id="" placeholder="Rent Start Date" className="border-[1px] border-gray-300"/>
                        -
                        <input type="date" name="" id="" placeholder="Rent End Date" className="border-[1px] border-gray-300"/>
                    </div>
                </div>

                <h4 className="totalRentalPrice">Total: N5200</h4>

                <div className="buttonHolder">
                    <button className="bg-[#0B5850] border-[1px] border-[#0B5850] font-medium text-white hover:bg-[#128D7F]" onClick={() => setModal(true)}>Rent Now</button>
                    <button className="border-[1px] border-[#0B5850] text-[#0B5850] font-medium hover:bg-[#128D7F] hover:text-white">Save for Later</button>
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

export default ServiceDetails