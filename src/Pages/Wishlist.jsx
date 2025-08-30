import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import "../styles/Wishlist.css";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { StarIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import api from "../AxiosInstance";
import { toast } from "react-toastify";

const Wishlist = () => {
  const navigate = useNavigate();
  const [searchDetails, setSearchDetails] = useState({
    category: "",
    start_date: "",
    end_date: "",
    location: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [rentals, setRentals] = useState([]);
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [filteredRentals, setFilteredRentals] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState({
    rentals: true,
    services: true,
    packages: true,
  });
  const [error, setError] = useState(null);
  const swiperRef = useRef();

  // API call to fetch wishlist data for a specific category
  const fetchWishlistData = async (category, page = 1, pageSize = 50) => {
    setLoading((prev) => ({ ...prev, [category]: true }));
    setError(null);

    try {
      const response = await api.get(
        `/wishlist/fetch/${page}/${pageSize}/${category}`
      );

      console.log(response)
      return response.data; // Assuming the response follows the IPaginatedWishlistResponse structure
    } catch (err) {
      setError(err.message);
      setLoading({
        rentals: false,
        services: false,
        packages: false
      })
      toast.error(err.response?.data?.message || "Failed to cancel booking");
      return [];
    } finally {
      setLoading((prev) => ({ ...prev, [category]: false }));
    }
  };

  // Fetch data for all categories on component mount
  useEffect(() => {
    const loadWishlistData = async () => {
      const rentalsData = await fetchWishlistData("RENTALS");
      const servicesData = await fetchWishlistData("SERVICES");
      const packagesData = await fetchWishlistData("PACKAGES");

      setRentals(rentalsData.data);
      setServices(servicesData.data);
      setPackages(packagesData.data);
      setFilteredRentals(rentalsData.data);
      setFilteredServices(servicesData.data);
      setFilteredPackages(packagesData.data);
      setLoading({
        rentals: false,
        services: false,
        packages: false
      })
      console.log(rentalsData.data);
      console.log(servicesData.data);
      console.log(packagesData.data);
    };

    loadWishlistData();
  }, []);

  // Filter items based on search query
  useEffect(() => {
    const filterItems = (items) => {
      if (!searchQuery) return items;
      
      return items.filter(item => {
        const searchLower = searchQuery.toLowerCase();
        const title = item.item.title?.toLowerCase() || '';
        const companyName = item.item.vendor?.companyName?.toLowerCase() || '';
        const description = item.item.description?.toLowerCase() || '';
        
        return title.includes(searchLower) || 
               companyName.includes(searchLower) || 
               description.includes(searchLower);
      });
    };

    setFilteredRentals(filterItems(rentals));
    setFilteredServices(filterItems(services));
    setFilteredPackages(filterItems(packages));
  }, [searchQuery, rentals, services, packages]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/rentals", {
      state: searchDetails,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRemovefromWishlist = async (itemId, category) => {
    // toast.loading("Removing, Please Wait")
    
       await toast.promise(
      api.delete(`/wishlist/remove/${itemId}`),
      {
        pending: "Removing, Please Wait",
        success: "Item removed from wishlist",
        error: (err) => err.response?.data?.message || "Failed to remove item from wishlist",
      }
    );
      
      // Update state based on category
      switch (category.toLowerCase()) {
        case "rentals":
          setRentals((prev) => prev.filter((item) => item.item.id !== itemId));
          setFilteredRentals((prev) => prev.filter((item) => item.item.id !== itemId));
          break;
        case "services":
          setServices((prev) => prev.filter((item) => item.item.id !== itemId));
          setFilteredServices((prev) => prev.filter((item) => item.item.id !== itemId));
          break;
        case "packages":
          setPackages((prev) => prev.filter((item) => item.item.id !== itemId));
          setFilteredPackages((prev) => prev.filter((item) => item.item.id !== itemId));
          break;
        default:
          break;
      }
  }

  return <>
    <div className="wishlistWrapper">
      <section className="wishlistHeading">
        <div className="leftwishlistHeading">
          <h1>My Wishlist</h1>
          <p className="text-gray-600">{filteredRentals.length + filteredServices.length + filteredPackages.length} Wishlist Found</p>
        </div>
        <form className="border-[1px] bg-[#F7F7F7] border-gray-200 text-gray-600">
          <MagnifyingGlassIcon />
          <input 
            type="search" 
            placeholder="Search Here..." 
            name="search" 
            id="search" 
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </form>
      </section>

      <hr className="border border-gray-200"/>
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
            loading["rentals"] ? (
          <p>Loading rentals...</p>
            ) : error ? (
              <p className="text-red-600">Error: {error}</p>
            ) : filteredRentals.length === 0 ? (
              <p>No items found in rentals wishlist.</p>
            ) :
            filteredRentals.map((el, idx) => {
                return <SwiperSlide key={idx}>
                    <div className="wishlistRentalCard" >
                        <img src={el.item.images && el.item.images[0]} alt="" className="object-cover"/>
                        <XMarkIcon className='saveIcon text-black hover:text-red-600 cursor-pointer object-cover' onClick={() => handleRemovefromWishlist(el.item.id, el.item?.category)}/>
                        <div className="wishlistRentalCardDetails" onClick={() => navigate(`/rental/details/${el.item.id}`)}>
                            <h3>{el.item.title}</h3>
                            <small className='text-gray-600'>{el.item.quantity} units available</small>
                            <p>
                                <span>
                                    <StarIcon className='text-yellow-600'/>
                                    {el.item.avgRating}
                                    <small className='text-gray-600'></small>
                                </span>
                                <span>
                                    N{el.item.price}
                                    <small className='text-gray-600'>/{el.item.pricingUnit}</small>
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
              1600: {
              slidesPerView: 6,
              spaceBetween: 20,
              grid: { rows: 2 },
              },
          }}
          >
          {
            loading["services"] ? (
          <p>Loading services...</p>
            ) : error ? (
              <p className="text-red-600">Error: {error}</p>
            ) : filteredServices.length === 0 ? (
              <p>No items found in services wishlist.</p>
            ) :
          filteredServices.map((el, idx) => {
              return <SwiperSlide key={idx}>
                  <div className="wishlistRentalCard" >
                      <img src={el.item.images && el.item.images[0]} alt="" className="object-cover"/>
                      <XMarkIcon className='saveIcon text-black hover:text-red-600 cursor-pointer' onClick={() => handleRemovefromWishlist(el.item.id, el.item.category)}/>
                      <div className="wishlistRentalCardDetails" onClick={() => navigate(`/service/details/${el.item.id}`)}>
                          <h3>{el.item.title} by {el.item?.vendor?.companyName}</h3>
                          <small className='text-gray-600'>
                            {
                              el.item?.locations?.map((data) => {
                                return data
                              })
                            }
                          </small>
                          <p>
                              <small className="text-gray-600">
                                    From N{el.item.minPrice}
                                    <StarIcon className='text-yellow-600'/>
                                    {el.item.avgRating}
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
              1600: {
              slidesPerView: 6,
              spaceBetween: 20,
              grid: { rows: 2 },
              },
          }}
          >
          {
            loading["packages"] ? (
          <p>Loading packages...</p>
            ) : error ? (
              <p className="text-red-600">Error: {error}</p>
            ) : filteredPackages.length === 0 ? (
              <p>No items found in packages wishlist.</p>
            ) :
          filteredPackages.map((el, idx) => {
              return <SwiperSlide key={idx}>
                  <div className="wishlistRentalCard" >
                      <img src={el.item.images && el.item.images[0]} alt="" className="object-cover"/>
                      <XMarkIcon className='saveIcon text-black hover:text-red-600 cursor-pointer' onClick={() => handleRemovefromWishlist(el.item.id, el.item.category)}/>
                      <div className="wishlistRentalCardDetails" onClick={() => navigate(`/package/details/${el.item.id}`)}>
                          <h3>{el.item.title} by {el.item?.vendor?.companyName}</h3>
                          <small className="text-gray-600">{el.item.description}</small>
                          <small className='text-gray-600'>
                            {
                              el.item?.locations?.map((data) => {
                                return data
                              })
                            }
                          </small>
                          <p>
                            <small className="text-gray-600">
                                  From N{el.item.minPrice}
                                  <StarIcon className='text-yellow-600'/>
                                  {el.item.avgRating}
                              </small>
                          </p>
                      </div>
                  </div>
              </SwiperSlide>
          })
          }
          </Swiper>
  
      </div>


    </div>
  </>;
};

export default Wishlist;