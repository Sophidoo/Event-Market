import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import "../styles/Wishlist.css"
import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';

import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { StarIcon } from "@heroicons/react/24/solid";

const Wishlist = () => {
    
    // const [loading, setLoading] = useState(false)
    const [searchDetails, setSearchDetails] = useState({
        category: "",
        start_date: "",
        end_date: "",
        location: ""
    })
    const swiperRef = useRef();

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
    const services = [
        {
          image: "https://example.com/images/wedding-chairs.jpg",
          title: "Chiavari Wedding Chairs",
          unitsAvailable: 150,
          rating: 4.8,
          numberOfRatings: 120,
          price: 2.5,
          pricingType: "per unit",
          startingPrice: 2.5,
          city: "Lagos",
          state: "Lagos",
          providerName: "Ada Okonkwo"
        },
        {
          image: "https://example.com/images/canopy-tent.jpg",
          title: "20x20ft Canopy Tent",
          unitsAvailable: 10,
          rating: 4.6,
          numberOfRatings: 85,
          price: 150,
          pricingType: "per day",
          startingPrice: 150,
          city: "Abuja",
          state: "FCT",
          providerName: "John Yusuf"
        },
        {
          image: "https://example.com/images/speaker-set.jpg",
          title: "Portable Speaker Set",
          unitsAvailable: 5,
          rating: 4.7,
          numberOfRatings: 95,
          price: 80,
          pricingType: "per day",
          startingPrice: 80,
          city: "Port Harcourt",
          state: "Rivers",
          providerName: "Chinonso Nwankwo"
        },
        {
          image: "https://example.com/images/photo-booth.jpg",
          title: "Photo Booth Setup",
          unitsAvailable: 2,
          rating: 4.9,
          numberOfRatings: 47,
          price: 250,
          pricingType: "per event",
          startingPrice: 250,
          city: "Ibadan",
          state: "Oyo",
          providerName: "Tolu Adebayo"
        },
        {
          image: "https://example.com/images/round-table.jpg",
          title: "Round Banquet Table",
          unitsAvailable: 60,
          rating: 4.5,
          numberOfRatings: 73,
          price: 8,
          pricingType: "per unit",
          startingPrice: 8,
          city: "Benin City",
          state: "Edo",
          providerName: "Osas Igbinedion"
        },
        {
          image: "https://example.com/images/decor-lighting.jpg",
          title: "LED Decorative Lighting",
          unitsAvailable: 20,
          rating: 4.4,
          numberOfRatings: 55,
          price: 25,
          pricingType: "per day",
          startingPrice: 25,
          city: "Enugu",
          state: "Enugu",
          providerName: "Chidera Eze"
        },
        {
          image: "https://example.com/images/stage-platform.jpg",
          title: "Modular Stage Platform",
          unitsAvailable: 3,
          rating: 4.6,
          numberOfRatings: 33,
          price: 300,
          pricingType: "per event",
          startingPrice: 300,
          city: "Abeokuta",
          state: "Ogun",
          providerName: "Segun Balogun"
        },
        {
          image: "https://example.com/images/popcorn-machine.jpg",
          title: "Popcorn Machine",
          unitsAvailable: 4,
          rating: 4.8,
          numberOfRatings: 41,
          price: 60,
          pricingType: "per day",
          startingPrice: 60,
          city: "Jos",
          state: "Plateau",
          providerName: "Blessing Danjuma"
        },
        {
          image: "https://example.com/images/red-carpet.jpg",
          title: "Red Carpet Roll",
          unitsAvailable: 6,
          rating: 4.7,
          numberOfRatings: 29,
          price: 45,
          pricingType: "per event",
          startingPrice: 45,
          city: "Uyo",
          state: "Akwa Ibom",
          providerName: "Emmanuel Etuk"
        },
        {
          image: "https://example.com/images/cocktail-table.jpg",
          title: "Cocktail Table with Cover",
          unitsAvailable: 25,
          rating: 4.3,
          numberOfRatings: 38,
          price: 10,
          pricingType: "per unit",
          startingPrice: 10,
          city: "Asaba",
          state: "Delta",
          providerName: "Efe Oghenekaro"
        }
      ];
      

    const rentalItems = [
        {
          image: "https://example.com/images/wedding-chairs.jpg",
          title: "Chiavari Wedding Chairs",
          unitsAvailable: 150,
          rating: 4.8,
          numberOfRatings: 120,
          price: 2.5,
          pricingType: "per unit"
        },
        {
          image: "https://example.com/images/canopy-tent.jpg",
          title: "20x20ft Canopy Tent",
          unitsAvailable: 10,
          rating: 4.6,
          numberOfRatings: 85,
          price: 150,
          pricingType: "per day"
        },
        {
          image: "https://example.com/images/speaker-set.jpg",
          title: "Portable Speaker Set",
          unitsAvailable: 5,
          rating: 4.7,
          numberOfRatings: 95,
          price: 80,
          pricingType: "per day"
        },
        {
          image: "https://example.com/images/photo-booth.jpg",
          title: "Photo Booth Setup",
          unitsAvailable: 2,
          rating: 4.9,
          numberOfRatings: 47,
          price: 250,
          pricingType: "per event"
        },
        {
          image: "https://example.com/images/round-table.jpg",
          title: "Round Banquet Table",
          unitsAvailable: 60,
          rating: 4.5,
          numberOfRatings: 73,
          price: 8,
          pricingType: "per unit"
        },
        {
          image: "https://example.com/images/decor-lighting.jpg",
          title: "LED Decorative Lighting",
          unitsAvailable: 20,
          rating: 4.4,
          numberOfRatings: 55,
          price: 25,
          pricingType: "per day"
        },
        {
          image: "https://example.com/images/stage-platform.jpg",
          title: "Modular Stage Platform",
          unitsAvailable: 3,
          rating: 4.6,
          numberOfRatings: 33,
          price: 300,
          pricingType: "per event"
        },
        {
          image: "https://example.com/images/popcorn-machine.jpg",
          title: "Popcorn Machine",
          unitsAvailable: 4,
          rating: 4.8,
          numberOfRatings: 41,
          price: 60,
          pricingType: "per day"
        },
        {
          image: "https://example.com/images/red-carpet.jpg",
          title: "Red Carpet Roll",
          unitsAvailable: 6,
          rating: 4.7,
          numberOfRatings: 29,
          price: 45,
          pricingType: "per event"
        },
        {
          image: "https://example.com/images/cocktail-table.jpg",
          title: "Cocktail Table with Cover",
          unitsAvailable: 25,
          rating: 4.3,
          numberOfRatings: 38,
          price: 10,
          pricingType: "per unit"
        },
        {
          image: "https://example.com/images/cocktail-table.jpg",
          title: "Cocktail Table with Cover",
          unitsAvailable: 25,
          rating: 4.3,
          numberOfRatings: 38,
          price: 10,
          pricingType: "per unit"
        },
        {
          image: "https://example.com/images/cocktail-table.jpg",
          title: "Cocktail Table with Cover",
          unitsAvailable: 25,
          rating: 4.3,
          numberOfRatings: 38,
          price: 10,
          pricingType: "per unit"
        },
    ];

    const packages = [
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
      

    return <>
        <div className="wishlistWrapper">
            <section className="wishlistHeading">
                <div className="leftwishlistHeading">
                    <h1>My Wishlist</h1>
                    <p className="text-gray-600">50 Wishlist Found</p>
                </div>

                <form action="" className="border-[1px] bg-[#F7F7F7] border-gray-200 text-gray-600">
                    <MagnifyingGlassIcon/>
                    <input type="search" placeholder="Search Here..." name="" id="" />
                </form>
            </section>

            <form className="wishlistHeroForm bg-white border-[1px] border-gray-200" onSubmit={handleSearch}>
                <div className="inputWrapper border-r-gray-200">
                    <label htmlFor="" className='text-gray-600'>
                        CATEGORY
                    </label>
                    <select name="category" id="" value={searchDetails.category} onChange={handleChange}>
                        <option value="" >Select Category</option>
                    </select>
                </div>
                <div className="inputWrapper border-r-gray-200">
                    <label htmlFor=""  className='text-gray-600'>
                        RENT START DATE
                    </label>
                    <input type="date" name="start_date" id="" value={searchDetails.start_date} onChange={handleChange} placeholder='dd/mm/yyyy'/>
                </div>
                <div className="inputWrapper border-r-gray-200">
                    <label htmlFor=""  className='text-gray-600'>
                        RENT END DATE
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
                <button type='submit' className='bg-[#0B5850] text-white'><MagnifyingGlassIcon/> Search</button>
            </form>


            <div className="wishlistItemsWrapper">
                <div className="wishlistItemsHeading">
                <h2>Rentals</h2>
                <div className="wishlistArrows">
                    <ChevronLeftIcon className='border-gray-300 text-gray-400 hover:bg-gray-200'  onClick={() => swiperRef.current?.slidePrev()}/>
                    <ChevronRightIcon className='border-gray-300 text-gray-400 hover:bg-gray-200'  onClick={() => swiperRef.current?.slideNext()}/>
                </div>
                </div>
                <Swiper
                modules={[Grid, Navigation, Pagination, A11y]}
                spaceBetween={20}
                className="wishlistSwiper"
                slidesPerView={6}
                grid={{
                    rows: 2,
                    fill: 'row'
                }}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                breakpoints={{
                    // when the window width is >= 320px
                    100: {
                    slidesPerView: 1.3,
                    spaceBetween: 20,
                    grid: { rows: 1 },
                    },
                    500: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    grid: { rows: 1 },
                    },
                    // when the window width is >= 640px
                    750: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    grid: { rows: 2 },
                    },
                    // when the window width is >= 1024px
                    1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                    grid: { rows: 2 },
                    },
                    1300: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                    grid: { rows: 2 },
                    },
                    1500: {
                    slidesPerView: 6,
                    spaceBetween: 20,
                    grid: { rows: 2 },
                    },
                }}
                >
                {
                rentalItems.map((el, idx) => {
                    return <SwiperSlide key={idx}>
                        <div className="wishlistRentalCard" onClick={() => navigate("/rental/details/1")}>
                            <img src={el.image} alt="" />
                            <HeartIcon className='saveIcon text-black hover:text-red-600'/>
                            <div className="wishlistRentalCardDetails">
                                <h3>{el.title}</h3>
                                <small className='text-gray-600'>{el.unitsAvailable} units available</small>
                                <p>
                                    <span>
                                        <StarIcon className='text-yellow-600'/>
                                        {el.rating}
                                        <small className='text-gray-600'>({el.numberOfRatings})</small>
                                    </span>
                                    <span>
                                        N{el.price}
                                        <small className='text-gray-600'>/{el.pricingType}</small>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                })
                }
                </Swiper>
        
            </div>


            <div className="wishlistItemsWrapper">
                <div className="wishlistItemsHeading">
                <h2>Services</h2>
                <div className="wishlistArrows">
                    <ChevronLeftIcon className='border-gray-300 text-gray-400 hover:bg-gray-200'  onClick={() => swiperRef.current?.slidePrev()}/>
                    <ChevronRightIcon className='border-gray-300 text-gray-400 hover:bg-gray-200'  onClick={() => swiperRef.current?.slideNext()}/>
                </div>
                </div>
                <Swiper
                modules={[Grid, Navigation, Pagination, A11y]}
                spaceBetween={20}
                className="wishlistSwiper"
                slidesPerView={5}
                grid={{
                    rows: 2,
                    fill: 'row'
                }}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                breakpoints={{
                    // when the window width is >= 320px
                    100: {
                    slidesPerView: 1.3,
                    spaceBetween: 20,
                    grid: { rows: 1 },
                    },
                    500: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    grid: { rows: 1 },
                    },
                    // when the window width is >= 640px
                    750: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    grid: { rows: 2 },
                    },
                    // when the window width is >= 1024px
                    1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    grid: { rows: 2 },
                    },
                    1300: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                    grid: { rows: 2 },
                    },
                    1500: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                    grid: { rows: 2 },
                    },
                }}
                >
                {
                services.map((el, idx) => {
                    return <SwiperSlide key={idx}>
                        <div className="wishlistRentalCard cursor-pointer" onClick={() => navigate("/service/details/1")}>
                        <img src={el.image} alt="" />
                        <HeartIcon className='saveIcon text-black hover:text-red-600'/>
                        <div className="wishlistRentalCardDetails">
                            <h3>{el.title} by {el.providerName}</h3>
                            <small className='text-gray-600'> {el.city}, {el.state}</small>
                            <p>
                                <small className="text-gray-600">
                                    From N{el.startingPrice}
                                    <StarIcon className='text-yellow-600'/>
                                    {el.rating}
                                </small>
                            </p>
                        </div>
                    </div>
                    </SwiperSlide>
                })
                }
                </Swiper>
        
            </div>

            <div className="wishlistItemsWrapper">
                <div className="wishlistItemsHeading">
                <h2>Packages</h2>
                <div className="wishlistArrows">
                    <ChevronLeftIcon className='border-gray-300 text-gray-400 hover:bg-gray-200'  onClick={() => swiperRef.current?.slidePrev()}/>
                    <ChevronRightIcon className='border-gray-300 text-gray-400 hover:bg-gray-200'  onClick={() => swiperRef.current?.slideNext()}/>
                </div>
                </div>
                <Swiper
                modules={[Grid, Navigation, Pagination, A11y]}
                spaceBetween={20}
                className="wishlistSwiper"
                slidesPerView={5}
                grid={{
                    rows: 2,
                    fill: 'row'
                }}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                breakpoints={{
                    // when the window width is >= 320px
                    100: {
                    slidesPerView: 1.3,
                    spaceBetween: 20,
                    grid: { rows: 1 },
                    },
                    500: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    grid: { rows: 1 },
                    },
                    // when the window width is >= 640px
                    750: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    grid: { rows: 2 },
                    },
                    // when the window width is >= 1024px
                    1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    grid: { rows: 2 },
                    },
                    1300: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                    grid: { rows: 2 },
                    },
                    1500: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                    grid: { rows: 2 },
                    },
                }}
                >
                {
                packages.map((el, idx) => {
                    return <SwiperSlide key={idx}>
                        <div className="wishlistPackageCard" onClick={() => navigate("/package/details/1")}>
                        <img src={el.image} alt="" />
                        <HeartIcon className='saveIcon text-black hover:text-red-600'/>
                        <div className="wishlistPackageCardDetails">
                            <h3>{el.title} by {el.providerName}</h3>
                            <small className="text-gray-600">{el.description}</small>
                            <small className='text-gray-600'> {el.city}, {el.state}</small>
                        </div>
                    </div>
                    </SwiperSlide>
                })
                }
                </Swiper>
        
            </div>
        </div>

        
    </>

}

export default Wishlist