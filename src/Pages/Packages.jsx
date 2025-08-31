import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import "../styles/Packages.css";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import api from "../AxiosInstance";
import Loading from "../components/Loading";

const Packages = () => {
  const [loading, setLoading] = useState(false);
  const [searchDetails, setSearchDetails] = useState({
    category: "",
    start_date: "",
    end_date: "",
    location: "",
  });
  const [packages, setPackages] = useState([]);
  const [categoryType, setCategoryType] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    from: 1,
    to: 0,
    per_page: 20,
    last_page: 0,
    total: 0,
  });
  // State to track wishlist status and loading for each package
  const [wishlistStatus, setWishlistStatus] = useState({});

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPackages();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const { current_page, per_page } = pagination;
      const [response, category] = await Promise.all([
        api.get(`/item/packages/${current_page}/${per_page}`, {
          params: {
            categoryType: searchDetails.category,
            startDate: searchDetails.start_date,
            endDate: searchDetails.end_date,
            location: searchDetails.location,
          },
        }),
        api.get(`/item/category-types`, {
          params: {
            category: "PACKAGES",
          },
        }),
      ]);

      setPackages(response.data.data);
      setCategoryType(category.data);
      setPagination((prev) => ({
        ...prev,
        total: response.data.meta.total,
        last_page: response.data.meta.totalPages,
      }));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [pagination.current_page, searchDetails]);

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= pagination.last_page) {
      setPagination((prev) => ({ ...prev, current_page: pageNum }));
    }
  };

  const handleAddToWishlist = (itemId, e) => {
    e.stopPropagation(); // Prevent triggering the card's onClick event
    setWishlistStatus((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], isLoading: true },
    }));

    api
      .post(`/wishlist/add/${itemId}`)
      .then((response) => {
        setWishlistStatus((prev) => ({
          ...prev,
          [itemId]: { isInWishlist: true, isLoading: false },
        }));
        toast.success(response.data || "Package added to wishlist successfully");
      })
      .catch((err) => {
        setWishlistStatus((prev) => ({
          ...prev,
          [itemId]: { ...prev[itemId], isLoading: false },
        }));
        toast.error(err.response?.data?.message || "Failed to add package to wishlist");
      });
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
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-stone-800/5"
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

    // Page buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`inline-grid place-items-center min-w-[30px] min-h-[30px] rounded-md text-sm font-medium ${
            i === currentPage ? "bg-[#0B5850] text-white" : "hover:bg-stone-800/5"
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
            totalPages === currentPage ? "bg-[#0B5850] text-white" : "hover:bg-stone-800/5"
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
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-stone-800/5"
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

  return (
    <>
      <form className="rentalsHeroForm bg-white border-[1px] border-gray-200 cursor-pointer" onSubmit={handleSearch}>
        <div className="inputWrapper border-r-gray-200">
          <label htmlFor="category" className="text-gray-600">
            PACKAGE TYPE
          </label>
          <select name="category" id="category" value={searchDetails.category} onChange={handleChange}>
            <option value="">All</option>
            {categoryType.map((el) => (
              <option key={el.name} value={el.name}>
                {el.name}
              </option>
            ))}
          </select>
        </div>
        <div className="inputWrapper border-r-gray-200">
          <label htmlFor="start_date" className="text-gray-600">
            EVENT START DATE
          </label>
          <input
            type="date"
            name="start_date"
            id="start_date"
            value={searchDetails.start_date}
            onChange={handleChange}
            placeholder="dd/mm/yyyy"
          />
        </div>
        <div className="inputWrapper border-r-gray-200">
          <label htmlFor="end_date" className="text-gray-600">
            EVENT END DATE
          </label>
          <input
            type="date"
            name="end_date"
            id="end_date"
            value={searchDetails.end_date}
            onChange={handleChange}
          />
        </div>
        <div className="inputWrapper">
          <label htmlFor="location" className="text-gray-600">
            LOCATION
          </label>
          <select name="location" id="location" value={searchDetails.location} onChange={handleChange}>
            <option value="">Select Location</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="bg-[#0B5850] text-white flex items-center gap-2">
          {loading ? (
            "Loading..."
          ) : (
            <>
              <MagnifyingGlassIcon className="h-5 w-5" />
              Search
            </>
          )}
        </button>
      </form>

      <section className="packagesWrapper">
        {loading ? (
          <Loading/>
        ) : packages.length > 0 ? (
          packages.map((el) => (
            <div
              key={el.id}
              className="packageCard"
              onClick={() => navigate(`/package/details/${el.id}`)}
            >
              <img src={el.images?.[0] || "https://via.placeholder.com/300"} alt={el.title} />
              {wishlistStatus[el.id]?.isLoading ? (
                <span className="saveIcon text-black">...</span>
              ) : (
                <HeartIcon
                  className={`saveIcon ${
                    wishlistStatus[el.id]?.isInWishlist ? "text-red-600" : "text-black"
                  } hover:text-red-600 cursor-pointer`}
                  onClick={(e) => handleAddToWishlist(el.id, e)}
                  style={{ pointerEvents: wishlistStatus[el.id]?.isLoading ? "none" : "auto" }}
                />
              )}
              <div className="packageCardDetails">
                <h3>
                  {el.title} by {el.vendor?.companyName}
                </h3>
                <small className="text-gray-600">{el.description.split(/\s+/).slice(0, 20).join(" ")}</small>
                {el.locations?.map((data, index) => (
                  <small key={index} className="text-gray-600">
                    {data}
                  </small>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No packages found matching your criteria</p>
          </div>
        )}
      </section>
      {pagination.last_page > 1 && (
        <div className="pagination flex flex-col items-end sm:items-end w-full mt-8">
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2">
            {renderPaginationButtons()}
          </div>
        </div>
      )}
    </>
  );
};

export default Packages;