import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import "../styles/Packages.css"
import { useState } from "react"
import { StarIcon } from "@heroicons/react/24/solid"

const Packages = () => {
    const [loading, setLoading] = useState(false)
    const [searchDetails, setSearchDetails] = useState({
        category: "",
        start_date: "",
        end_date: "",
        location: ""
    })
    const [pagination, setPagination] = useState({
        current_page: 1,
        from: 1,
        to: 0,
        per_page: 0,
        last_page: 0,
        total: 0
    })

    const handleSearch = (e) => {
        e.preventDefault();
        navigate("/rentals", {
            state: searchDetails
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchDetails((prev) => ({
            ...prev,
            [name]: value, 
        }));
    };

    const rentalItems = [
        {
          image: "https://example.com/images/wedding-chairs.jpg",
          title: "Chiavari Wedding Chairs",
          description: "Elegant chairs perfect for weddings and formal events.",
          unitsAvailable: 150,
          price: 2.5,
          pricingType: "per unit",
          city: "Lagos",
          state: "Lagos",
          providerName: "Ada Okonkwo"
        },
        {
          image: "https://example.com/images/canopy-tent.jpg",
          title: "20x20ft Canopy Tent",
          description: "Durable canopy tent ideal for outdoor gatherings.",
          unitsAvailable: 10,
          price: 150,
          pricingType: "per day",
          city: "Abuja",
          state: "FCT",
          providerName: "John Yusuf"
        },
        {
          image: "https://example.com/images/speaker-set.jpg",
          title: "Portable Speaker Set",
          description: "High-quality speaker set for events and parties.",
          unitsAvailable: 5,
          price: 80,
          pricingType: "per day",
          city: "Port Harcourt",
          state: "Rivers",
          providerName: "Chinonso Nwankwo"
        },
        {
          image: "https://example.com/images/photo-booth.jpg",
          title: "Photo Booth Setup",
          description: "Fun photo booth setup for memorable events.",
          unitsAvailable: 2,
          price: 250,
          pricingType: "per event",
          city: "Ibadan",
          state: "Oyo",
          providerName: "Tolu Adebayo"
        },
        {
          image: "https://example.com/images/round-table.jpg",
          title: "Round Banquet Table",
          description: "Spacious tables suitable for banquet-style seating.",
          unitsAvailable: 60,
          price: 8,
          pricingType: "per unit",
          city: "Benin City",
          state: "Edo",
          providerName: "Osas Igbinedion"
        },
        {
          image: "https://example.com/images/decor-lighting.jpg",
          title: "LED Decorative Lighting",
          description: "Colorful LED lighting for event ambiance.",
          unitsAvailable: 20,
          price: 25,
          pricingType: "per day",
          city: "Enugu",
          state: "Enugu",
          providerName: "Chidera Eze"
        },
        {
          image: "https://example.com/images/stage-platform.jpg",
          title: "Modular Stage Platform",
          description: "Sturdy modular stage for performances and ceremonies.",
          unitsAvailable: 3,
          price: 300,
          pricingType: "per event",
          city: "Abeokuta",
          state: "Ogun",
          providerName: "Segun Balogun"
        },
        {
          image: "https://example.com/images/popcorn-machine.jpg",
          title: "Popcorn Machine",
          description: "Fun popcorn machine great for parties and events.",
          unitsAvailable: 4,
          price: 60,
          pricingType: "per day",
          city: "Jos",
          state: "Plateau",
          providerName: "Blessing Danjuma"
        },
        {
          image: "https://example.com/images/red-carpet.jpg",
          title: "Red Carpet Roll",
          description: "Stylish red carpet for grand entrances and events.",
          unitsAvailable: 6,
          price: 45,
          pricingType: "per event",
          city: "Uyo",
          state: "Akwa Ibom",
          providerName: "Emmanuel Etuk"
        },
        {
          image: "https://example.com/images/cocktail-table.jpg",
          title: "Cocktail Table with Cover",
          description: "Sleek cocktail tables perfect for receptions and mixers.",
          unitsAvailable: 25,
          price: 10,
          pricingType: "per unit",
          city: "Asaba",
          state: "Delta",
          providerName: "Efe Oghenekaro"
        }
    ];
      


    const goToPage = (pageNum) => {
        setPagination({...pagination, current_page: pageNum})
    };
      
    const setPreviousPage = () => {
        if (pagination.current_page > 1) {
          goToPage(pagination.current_page - 1);
        }
    };
      
    const setNextPage = () => {
        if (pagination.current_page < pagination.last_page) {
          goToPage(pagination.current_page + 1);
        }
    };


    return<>
        <form className="rentalsHeroForm bg-white border-[1px] border-gray-200" onSubmit={handleSearch}>
            <div className="inputWrapper border-r-gray-200">
                <label htmlFor="" className='text-gray-600'>
                    PACKAGE TYPE
                </label>
                <select name="category" id="" value={searchDetails.category} onChange={handleChange}>
                    <option value="" >Select Type</option>
                </select>
            </div>
            <div className="inputWrapper border-r-gray-200">
                <label htmlFor=""  className='text-gray-600'>
                    EVENT START DATE
                </label>
                <input type="date" name="start_date" id="" value={searchDetails.start_date} onChange={handleChange} placeholder='dd/mm/yyyy'/>
            </div>
            <div className="inputWrapper border-r-gray-200">
                <label htmlFor=""  className='text-gray-600'>
                    EVENT END DATE
                </label>
                <input type="date" name="end_date" id="" value={searchDetails.end_date} onChange={handleChange}/>
            </div>
            <div className="inputWrapper">
                <label htmlFor=""  className='text-gray-600'>
                    LOCATION
                </label>
                <select name="location" id="" value={searchDetails.location} onChange={handleChange}>
                    <option value="">
                        Select Location
                    </option>
                </select>
            </div>
            <button type='submit' disabled={loading} className='bg-[#0B5850] text-white'> {loading ? "Loading..." : (<> <MagnifyingGlassIcon/> Search</>)}</button>
        </form>


        <section className="packagesWrapper">
            {
                rentalItems.map((el) => {
                    return <div className="packageCard">
                        <img src={el.image} alt="" />
                        <HeartIcon className='saveIcon text-black hover:text-red-600'/>
                        <div className="packageCardDetails">
                            <h3>{el.title} by {el.providerName}</h3>
                            <small className="text-gray-600">{el.description}</small>
                            <small className='text-gray-600'> {el.city}, {el.state}</small>
                        </div>
                    </div>
                })
            }
        </section>
        <div className="pagination flex flex-col items-end sm:items-end w-full">
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

    </>

}

export default Packages