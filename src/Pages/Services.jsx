import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import "../styles/Rentals.css"
import { useEffect, useState } from "react"
import { StarIcon } from "@heroicons/react/24/solid"
import { useNavigate } from "react-router"
import { toast } from "react-toastify";
import api from "../AxiosInstance";

const Services = () => {
    const [loading, setLoading] = useState(false)
    const [searchDetails, setSearchDetails] = useState({
        category: "",
        start_date: "",
        end_date: "",
        location: ""
    })
    const [categoryType, setCategoryType] = useState([])
    const [services, setServices] = useState([])
    const [pagination, setPagination] = useState({
        current_page: 1,
        from: 1,
        to: 0,
        per_page: 10,
        last_page: 0,
        total: 0
    })

    const fetchRentals = async () => {
        setLoading(true);
        try {
            const { current_page, per_page } = pagination;
            const [response, category] = await Promise.all([
                api.get(`/item/services/${current_page}/${per_page}`, {
                    params: {
                        categoryType: searchDetails.category,
                        startDate: searchDetails.start_date,
                        endDate: searchDetails.end_date,
                        location: searchDetails.location
                    }
                }),
                api.get(`/item/category-types`, {
                    params: {
                        category: "SERVICES"
                    }
                })
            ]);
            setServices(response.data.data);
            setCategoryType(category.data);
            console.log(response, categoryType)
            setPagination(prev => ({
                ...prev,
                total: response.data.meta.total,
                last_page: response.data.meta.totalPages,
            }));
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to fetch services");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRentals();
    }, [pagination.current_page, searchDetails]);

    const handleSearch = (e) => {
        e.preventDefault()
        fetchRentals()
    };

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchDetails((prev) => ({
            ...prev,
            [name]: value, 
        }));
    };

    const goToPage = (pageNum) => {
        if (pageNum >= 1 && pageNum <= pagination.last_page) {
            setPagination(prev => ({ ...prev, current_page: pageNum }));
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

        // Previous button
        buttons.push(
            <button
                key="prev"
                className={`inline-flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium ${
                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-stone-800/5'
                }`}
                onClick={setPreviousPage}
                disabled={currentPage === 1}
            >
                <ChevronLeftIcon className="h-4 w-4 mr-1" />
                Previous
            </button>
        );

        // First page and ellipsis if needed
        if (startPage > 1) {
            buttons.push(
                <button
                    key={1}
                    className={`inline-grid place-items-center min-w-[30px] min-h-[30px] rounded-md text-sm font-medium ${
                        1 === currentPage ? 'bg-[#0B5850] text-white' : 'hover:bg-stone-800/5'
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

        // Page buttons
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`inline-grid place-items-center min-w-[30px] min-h-[30px] rounded-md text-sm font-medium ${
                        i === currentPage ? 'bg-[#0B5850] text-white' : 'hover:bg-stone-800/5'
                    }`}
                    onClick={() => goToPage(i)}
                >
                    {i}
                </button>
            );
        }

        // Last page and ellipsis if needed
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                buttons.push(<span key="right-ellipsis" className="px-2">...</span>);
            }
            buttons.push(
                <button
                    key={totalPages}
                    className={`inline-grid place-items-center min-w-[30px] min-h-[30px] rounded-md text-sm font-medium ${
                        totalPages === currentPage ? 'bg-[#0B5850] text-white' : 'hover:bg-stone-800/5'
                    }`}
                    onClick={() => goToPage(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }

        // Next button
        buttons.push(
            <button
                key="next"
                className={`inline-flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium ${
                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-stone-800/5'
                }`}
                onClick={setNextPage}
                disabled={currentPage === totalPages}
            >
                Next
                <ChevronRightIcon className="h-4 w-4 ml-1" />
            </button>
        );

        return buttons;
    };
    


    return<>
    
        <form className="rentalsHeroForm bg-white border-[1px] border-gray-200" onSubmit={handleSearch}>
            <div className="inputWrapper border-r-gray-200">
                <label htmlFor="" className='text-gray-600'>
                    SERVICE TYPE
                </label>
                <select name="category" id="" value={searchDetails.category} onChange={handleChange}>
                <option value="">All</option>
                    {
                        categoryType.map((el) => {
                            return <option value={el.name} >{el.name}</option>
                        })
                    }
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


        <section className="rentalsWrapper">
            {
                services.map((el) => {
                    return <div className="rentalCard cursor-pointer" onClick={() => navigate(`/service/details/${el.id}`)}>
                        <img src={el.images && el.images[0]} alt="" />
                        <HeartIcon className='saveIcon text-black hover:text-red-600'/>
                        <div className="rentalCardDetails">
                            <h3>{el.title} by {el.vendor?.companyName}</h3>
                            {
                                el.locations?.map(data => {
                                    return <small className='text-gray-600'>{data}</small>
                                })
                            }
                            <p>
                                <small className="text-gray-600">
                                    From N{el.minPrice}
                                    <StarIcon className='text-yellow-600'/>
                                    {el.avgRating}
                                </small>
                            </p>
                        </div>
                    </div>
                })
            }
        </section>

        {pagination.last_page > 1 && (
            <div className="pagination flex flex-col items-end sm:items-end w-full mt-8">
                <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2">
                    {renderPaginationButtons()}
                </div>
            </div>
        )}

    </>

}

export default Services