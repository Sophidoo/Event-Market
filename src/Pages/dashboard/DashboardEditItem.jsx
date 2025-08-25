import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRef, useState, useEffect } from "react";
import "../../styles/dashboard/AddItem.css";
import { FiUploadCloud } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../AxiosInstance";

const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const pricingUnits = ["DAY", "HOUR", "WEEK", "MONTH"];

const DashboardEditItem = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    bookingType: "",
    categoryType: "",
    price: "",
    minPrice: "",
    pricingUnit: "",
    experience: "",
    careerHighlight: "",
    education: "",
    rentalLocations: [],
    terms: [""],
    offers: [""],
    prices: [""],
    isAvailable: true,
  });
  const [showSection, setShowSection] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [showStatesDropdown, setShowStatesDropdown] = useState(false);
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch item details
  const fetchItemDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/item/details/${id}`);
      const item = response.data;
      setForm({
        title: item.title || "",
        category: item.category ? item.category.toLowerCase() : "",
        description: item.description || "",
        bookingType: item.bookingType || "",
        categoryType: item.categoryType || "",
        price: item.price || "",
        minPrice: item.minPrice || "",
        pricingUnit: item.pricingUnit || "",
        experience: item.experience || "",
        careerHighlight: item.careerHighlight || "",
        education: item.education || "",
        rentalLocations: item.locations || [],
        terms: item.terms?.length > 0 ? item.terms : [""],
        offers: item.offers?.length > 0 ? item.offers : [""],
        prices: item.prices?.length > 0 ? item.prices : [""],
        isAvailable: item.isAvailable !== undefined ? item.isAvailable : true,
      });
      setExistingImages(
        item.images?.map((url, index) => ({
          id: `existing-${index}`,
          preview: url,
        })) || []
      );
      setShowSection(!!item.category);
    } catch (error) {
      console.error("Error fetching item details:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch item details"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch category types
  const fetchCategoryTypes = async (category) => {
    if (!category) return;
    try {
      const response = await api.get(
        `/item/category-types?category=${category.toUpperCase()}`
      );
      setCategoryTypes(response.data || []);
    } catch (error) {
      console.error("Error fetching category types:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch category types"
      );
    }
  };

  useEffect(() => {
    fetchItemDetails();
  }, [id]);

  useEffect(() => {
    if (form.category) {
      fetchCategoryTypes(form.category);
    } else {
      setCategoryTypes([]);
    }
  }, [form.category]);

  const handleFileInput = (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = (files) => {
    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(2, 9),
    }));
    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    if (id.startsWith("existing-")) {
      setExistingImages((prev) => prev.filter((img) => img.id !== id));
    } else {
      setUploadedImages((prev) => {
        const imageToRemove = prev.find((img) => img.id === id);
        if (imageToRemove) {
          URL.revokeObjectURL(imageToRemove.preview);
        }
        return prev.filter((img) => img.id !== id);
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const showSpecificInformation = () => {
    if (form.category) {
      setShowSection(true);
    } else {
      toast.error("Please select a category first!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "isAvailable" ? value === "true" : value,
    }));
  };

  const handleLocationChange = (state) => {
    setForm((prev) => {
      const newLocations = prev.rentalLocations.includes(state)
        ? prev.rentalLocations.filter((s) => s !== state)
        : [...prev.rentalLocations, state];
      return { ...prev, rentalLocations: newLocations };
    });
  };

  const toggleAllStates = (selectAll) => {
    setForm((prev) => ({
      ...prev,
      rentalLocations: selectAll ? [...nigerianStates] : [],
    }));
  };

  const handleMultipleInputChange = (index, value, field) => {
    const newValues = [...form[field]];
    newValues[index] = value;
    setForm((prev) => ({ ...prev, [field]: newValues }));
  };

  const addInput = (field) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeInput = (index, field) => {
    const newValues = [...form[field]];
    newValues.splice(index, 1);
    setForm((prev) => ({
      ...prev,
      [field]: newValues.length > 0 ? newValues : [""],
    }));
  };

  const validateForm = () => {
    if (!form.title) return "Name is required";
    if (!form.category) return "Category is required";
    if (existingImages.length + uploadedImages.length === 0)
      return "At least one image is required";
    if (form.category === "rentals") {
      if (!form.price) return "Unit Price is required";
      if (!form.bookingType) return "Booking Type is required";
      if (!form.pricingUnit) return "Pricing Unit is required";
    } else if (form.category === "services") {
      if (!form.minPrice) return "Minimum Price is required";
      if (!form.bookingType) return "Booking Type is required";
    } else if (form.category === "packages") {
      if (!form.price) return "Cost is required";
      if (!form.bookingType) return "Booking Type is required";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", form.title);
    formData.append("category", form.category.toUpperCase());
    formData.append("description", form.description || "");
    formData.append("bookingType", form.bookingType);
    formData.append("categoryType", form.categoryType || "");
    formData.append("isAvailable", String(form.isAvailable));
    form.rentalLocations.forEach((loc) => formData.append("locations[]", loc));
    existingImages.forEach((img) =>
      formData.append("images[]", img.preview)
    );

    if (form.category === "rentals") {
      formData.append("price", form.price);
      formData.append("pricingUnit", form.pricingUnit);
      form.terms.forEach((term) => formData.append("terms[]", term));
    } else if (form.category === "services") {
      formData.append("minPrice", form.minPrice);
      formData.append("experience", form.experience || "");
      formData.append("careerHighlight", form.careerHighlight || "");
      formData.append("education", form.education || "");
      form.offers.forEach((offer) => formData.append("offers[]", offer));
      form.prices.forEach((price) => formData.append("prices[]", price));
    } else if (form.category === "packages") {
      formData.append("price", form.price);
      form.offers.forEach((offer) => formData.append("offers[]", offer));
    }

    uploadedImages.forEach((image) => formData.append("images", image.file));

    let endpoint;
    if (form.category === "rentals") endpoint =`/item/edit-rentals/${id}`;
    else if (form.category === "services") endpoint = `/item/edit-services/${id}`;
    else if (form.category === "packages") endpoint = `/item/edit-packages/${id}`;

    try {
      const response = await api.patch(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data?.message || "Item updated successfully");
      navigate("/dashboard/inventory");
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error(error.response?.data?.message || "Failed to update item");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !form.title) {
    return <div>Loading item details...</div>;
  }

  return (
    <div className="adminInventoryWrapper">
      <div className="adminInventoryHeading">
        <div className="leftInventoryHeading">
          <h2 className="flex flex-wrap">
            Dashboard <ChevronRightIcon />
            Inventory <ChevronRightIcon />{" "}
            <span className="text-gray-600">Edit Item</span>
          </h2>
          <p className="text-gray-500">
            Use the form below to edit your rental, service, or package details.
          </p>
        </div>
      </div>

      <form className="addFormWrapper" onSubmit={handleSubmit}>
        <section className="border-t xsm:border border-gray-300">
          <div className="addSectionHeading">
            <h2>General Information</h2>
            <p className="text-gray-600">
              Edit the core details of your item (e.g., name, category, and
              description).
            </p>
          </div>

          <div className="inputContainer">
            <div className="inputWrapper">
              <label htmlFor="title">Name</label>
              <p className="text-gray-500">
                Enter a suitable name for the item
              </p>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="border border-gray-300"
                required
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="category">Category</label>
              <p className="text-gray-500">What category is the item</p>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border border-gray-300"
                required
              >
                <option value="">Select Category</option>
                <option value="rentals">Rentals</option>
                <option value="services">Services</option>
                <option value="packages">Packages</option>
              </select>
            </div>
          </div>
          <div className="inputWrapper">
            <label htmlFor="description">Description</label>
            <p className="text-gray-500">
              Enter a brief description of the item
            </p>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border border-gray-300"
            />
          </div>
          <div className="inputWrapper">
            <label htmlFor="categoryType">Category Type</label>
            <p className="text-gray-500">
              Select the specific type for this item
            </p>
            <select
              name="categoryType"
              value={form.categoryType}
              onChange={handleChange}
              className="border border-gray-300"
              disabled={!form.category}
            >
              <option value="">Select Category Type</option>
              {categoryTypes.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div className="inputWrapper">
            <label htmlFor="photos">Photos</label>
            <p className="text-gray-500">
              The first image will be used as the main image
            </p>
            <div className="upload-section w-full mx-auto mt-[10px]">
              <div
                className="upload-dropzone border-2 border-dashed border-gray-300 rounded-lg py-[20px] px-[10px] sm:p-10 text-center transition-all"
                onClick={triggerFileInput}
              >
                <FiUploadCloud className="upload-icon w-7 h-7 sm:w-12 sm:h-12 mx-auto text-gray-400 mb-2 sm:mb-4" />
                <p className="upload-instruction text-lg font-medium text-gray-700 sm:mb-2">
                  <button
                    type="button"
                    className="upload-button text-primary font-semibold hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerFileInput();
                    }}
                  >
                    Click here to upload new photos
                  </button>
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInput}
                  className="hidden"
                  multiple
                  accept="image/jpeg,image/png"
                />
                <p className="upload-note text-sm text-gray-500">
                  Supports JPG, PNG up to 10MB
                </p>
              </div>
              {(existingImages.length > 0 || uploadedImages.length > 0) && (
                <div className="uploadedImages mt-[20px]">
                  {[...existingImages, ...uploadedImages].map((image) => (
                    <div key={image.id} className="uploadImageHolder relative">
                      <img
                        src={image.preview}
                        alt="Preview"
                        className="w-full object-cover rounded-md border border-gray-300"
                      />
                      <IoClose
                        className="text-gray-700 bg-white border border-gray-200 hover:text-red-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(image.id);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="inputWrapper">
            <label htmlFor="isAvailable">Availability</label>
            <p className="text-gray-500">Is this item available?</p>
            <select
              name="isAvailable"
              value={form.isAvailable}
              onChange={handleChange}
              className="border border-gray-300"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>
          <div className="addFormbuttonWrapper">
            <button
              type="button"
              className="bg-[#0B544C] text-white hover:bg-green-800"
              onClick={showSpecificInformation}
              disabled={!form.category}
            >
              Continue
            </button>
          </div>
        </section>

        {showSection && form.category === "rentals" && (
          <section className="border-t xsm:border border-gray-300">
            <div className="addSectionHeading2">
              <h3>Rentals Information</h3>
              <span className="text-gray-500">
                Edit the rental-specific information of your item.
              </span>
            </div>
            <div className="inputContainer">
              <div className="inputWrapper">
                <label htmlFor="price">Unit Price</label>
                <p className="text-gray-500">
                  What is the price for a single unit of this item
                </p>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="border border-gray-300"
                  min="0"
                  required
                />
              </div>
              <div className="inputWrapper">
                <label htmlFor="bookingType">Booking Type</label>
                <p className="text-gray-500">
                  This determines if a request is made before payment
                </p>
                <select
                  name="bookingType"
                  value={form.bookingType}
                  onChange={handleChange}
                  className="border border-gray-300"
                  required
                >
                  <option value="">Select an option</option>
                  <option value="INSTANT">Instant</option>
                  <option value="REQUEST">Request</option>
                </select>
              </div>
            </div>
            <div className="inputWrapper">
              <label htmlFor="pricingUnit">Pricing Unit</label>
              <p className="text-gray-500">
                Select the pricing unit for this rental
              </p>
              <select
                name="pricingUnit"
                value={form.pricingUnit}
                onChange={handleChange}
                className="border border-gray-300"
                required
              >
                <option value="">Select Pricing Unit</option>
                {pricingUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputWrapper">
              <label htmlFor="terms">Rental Terms and Conditions</label>
              <p className="text-gray-500">
                Edit the terms and conditions for renting this item
              </p>
              <div className="space-y-2">
                {form.terms.map((term, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={term}
                      onChange={(e) =>
                        handleMultipleInputChange(
                          index,
                          e.target.value,
                          "terms"
                        )
                      }
                      className="border border-gray-300 flex-1"
                      placeholder="Enter rental term"
                    />
                    {form.terms.length > 1 && (
                      <IoClose
                        className="w-5 h-5 cursor-pointer text-red-900 hover:text-red-500"
                        onClick={() => removeInput(index, "terms")}
                      />
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addInput("terms")}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>+ Add another term</span>
                </button>
              </div>
            </div>
            <div className="inputWrapper">
              <label htmlFor="rentalLocations">Available Locations</label>
              <p className="text-gray-500">
                Select all states where this item is available for rental
              </p>
              <div className="relative">
                <div
                  className="select border border-gray-300 rounded-md cursor-pointer flex justify-between items-center"
                  onClick={() => setShowStatesDropdown(!showStatesDropdown)}
                >
                  <span>
                    {form.rentalLocations.length > 0
                      ? `${form.rentalLocations.length} states selected`
                      : "Select states"}
                  </span>
                  <svg
                    className={`transition-transform ${
                      showStatesDropdown ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {showStatesDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    <div className="py-2 px-3 border-b border-gray-200 flex justify-between">
                      <h4
                        onClick={() => toggleAllStates(true)}
                        className="text-[11px] xsm:text-[13px] text-green-700 hover:text-[#0B544C]"
                      >
                        Select All
                      </h4>
                      <h4
                        onClick={() => toggleAllStates(false)}
                        className="text-[11px] xsm:text-[13px] text-green-700 hover:text-[#0B544C]"
                      >
                        Clear All
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 xsm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 py-2 px-3">
                      {nigerianStates.map((state) => (
                        <label
                          key={state}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={form.rentalLocations.includes(state)}
                            onChange={() => handleLocationChange(state)}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-[12px] text-gray-800 xsm:text-[13px]">
                            {state}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {form.rentalLocations.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-1">Selected States:</p>
                  <div className="flex flex-wrap gap-2">
                    {form.rentalLocations.map((state) => (
                      <span
                        key={state}
                        className="bg-gray-200 rounded-sm text-[11px] xsm:text-[12px] flex items-center w-fit px-2 py-1 gap-3"
                      >
                        {state}
                        <IoClose
                          className="w-3 h-3 text-gray-500 hover:text-red-500 cursor-pointer"
                          onClick={() => handleLocationChange(state)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="addFormbuttonWrapper">
              <button
                type="submit"
                className="bg-[#0B544C] text-white hover:bg-green-800"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </section>
        )}

        {showSection && form.category === "services" && (
          <section className="border-t xsm:border border-gray-300">
            <div className="addSectionHeading2">
              <h3>Service Information</h3>
              <span className="text-gray-500">
                Edit the service-specific information of your item.
              </span>
            </div>
            <div className="inputContainer">
              <div className="inputWrapper">
                <label htmlFor="minPrice">Minimum Price</label>
                <p className="text-gray-500">
                  What is the lowest price for this service
                </p>
                <input
                  type="number"
                  name="minPrice"
                  value={form.minPrice}
                  onChange={handleChange}
                  className="border border-gray-300"
                  min="0"
                  required
                />
              </div>
              <div className="inputWrapper">
                <label htmlFor="bookingType">Booking Type</label>
                <p className="text-gray-500">
                  This determines if a request is made before payment
                </p>
                <select
                  name="bookingType"
                  value={form.bookingType}
                  onChange={handleChange}
                  className="border border-gray-300"
                  required
                >
                  <option value="">Select an option</option>
                  <option value="INSTANT">Instant</option>
                  <option value="REQUEST">Request</option>
                </select>
              </div>
            </div>
            <div className="inputContainer">
              <div className="inputWrapper">
                <label htmlFor="experience">Experience</label>
                <p className="text-gray-500">
                  How many years of experience do you have providing this
                  service
                </p>
                <input
                  type="text"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  className="border border-gray-300"
                />
              </div>
              <div className="inputWrapper">
                <label htmlFor="careerHighlight">Career Highlight</label>
                <p className="text-gray-500">
                  Write a brief highlight of your career
                </p>
                <input
                  type="text"
                  name="careerHighlight"
                  value={form.careerHighlight}
                  onChange={handleChange}
                  className="border border-gray-300"
                />
              </div>
            </div>
            <div className="inputWrapper">
              <label htmlFor="education">Education and Training</label>
              <p className="text-gray-500">
                Talk about the education and training you've received in this
                field
              </p>
              <textarea
                name="education"
                value={form.education}
                onChange={handleChange}
                className="border border-gray-300"
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="offers">Service Offers</label>
              <p className="text-gray-500">
                Edit the list of what this service includes
              </p>
              <div className="space-y-2">
                {form.offers.map((offer, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={offer}
                      onChange={(e) =>
                        handleMultipleInputChange(
                          index,
                          e.target.value,
                          "offers"
                        )
                      }
                      className="border border-gray-300 flex-1"
                      placeholder="Enter service offer"
                    />
                    {form.offers.length > 1 && (
                      <IoClose
                        className="w-5 h-5 cursor-pointer text-red-900 hover:text-red-500"
                        onClick={() => removeInput(index, "offers")}
                      />
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addInput("offers")}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>+ Add another offer</span>
                </button>
              </div>
            </div>
            <div className="inputWrapper">
              <label htmlFor="prices">Service Pricing</label>
              <p className="text-gray-500">
                Edit the pricing plans for this service
              </p>
              <div className="space-y-2">
                {form.prices.map((price, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={price}
                      onChange={(e) =>
                        handleMultipleInputChange(
                          index,
                          e.target.value,
                          "prices"
                        )
                      }
                      className="border border-gray-300 flex-1"
                      placeholder="e.g., 3000 for basic package"
                    />
                    {form.prices.length > 1 && (
                      <IoClose
                        className="w-5 h-5 cursor-pointer text-red-900 hover:text-red-500"
                        onClick={() => removeInput(index, "prices")}
                      />
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addInput("prices")}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>+ Add another price</span>
                </button>
              </div>
            </div>
            <div className="inputWrapper">
              <label htmlFor="rentalLocations">Available Locations</label>
              <p className="text-gray-500">
                Select all states where this service is available
              </p>
              <div className="relative">
                <div
                  className="select border border-gray-300 rounded-md cursor-pointer flex justify-between items-center"
                  onClick={() => setShowStatesDropdown(!showStatesDropdown)}
                >
                  <span>
                    {form.rentalLocations.length > 0
                      ? `${form.rentalLocations.length} states selected`
                      : "Select states"}
                  </span>
                  <svg
                    className={`transition-transform ${
                      showStatesDropdown ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {showStatesDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    <div className="py-2 px-3 border-b border-gray-200 flex justify-between">
                      <h4
                        onClick={() => toggleAllStates(true)}
                        className="text-[11px] xsm:text-[13px] text-green-700 hover:text-[#0B544C]"
                      >
                        Select All
                      </h4>
                      <h4
                        onClick={() => toggleAllStates(false)}
                        className="text-[11px] xsm:text-[13px] text-green-700 hover:text-[#0B544C]"
                      >
                        Clear All
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 xsm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 py-2 px-3">
                      {nigerianStates.map((state) => (
                        <label
                          key={state}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={form.rentalLocations.includes(state)}
                            onChange={() => handleLocationChange(state)}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-[12px] text-gray-800 xsm:text-[13px]">
                            {state}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {form.rentalLocations.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-1">Selected States:</p>
                  <div className="flex flex-wrap gap-2">
                    {form.rentalLocations.map((state) => (
                      <span
                        key={state}
                        className="bg-gray-200 rounded-sm text-[11px] xsm:text-[12px] flex items-center w-fit px-2 py-1 gap-3"
                      >
                        {state}
                        <IoClose
                          className="w-3 h-3 text-gray-500 hover:text-red-500 cursor-pointer"
                          onClick={() => handleLocationChange(state)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="addFormbuttonWrapper">
              <button
                type="submit"
                className="bg-[#0B544C] text-white hover:bg-green-800"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </section>
        )}

        {showSection && form.category === "packages" && (
          <section className="border-t xsm:border border-gray-300">
            <div className="addSectionHeading2">
              <h3>Package Information</h3>
              <span className="text-gray-500">
                Edit the package-specific information of your item.
              </span>
            </div>
            <div className="inputContainer">
              <div className="inputWrapper">
                <label htmlFor="price">Cost</label>
                <p className="text-gray-500">
                  What is the cost for this package
                </p>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="border border-gray-300"
                  min="0"
                  required
                />
              </div>
              <div className="inputWrapper">
                <label htmlFor="bookingType">Booking Type</label>
                <p className="text-gray-500">
                  This determines if a request is made before payment
                </p>
                <select
                  name="bookingType"
                  value={form.bookingType}
                  onChange={handleChange}
                  className="border border-gray-300"
                  required
                >
                  <option value="">Select an option</option>
                  <option value="INSTANT">Instant</option>
                  <option value="REQUEST">Request</option>
                </select>
              </div>
            </div>
            <div className="inputWrapper">
              <label htmlFor="offers">Package Offers</label>
              <p className="text-gray-500">
                Edit the list of what this package includes
              </p>
              <div className="space-y-2">
                {form.offers.map((offer, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={offer}
                      onChange={(e) =>
                        handleMultipleInputChange(
                          index,
                          e.target.value,
                          "offers"
                        )
                      }
                      className="border border-gray-300 flex-1"
                      placeholder="Enter package offer"
                    />
                    {form.offers.length > 1 && (
                      <IoClose
                        className="w-5 h-5 cursor-pointer text-red-900 hover:text-red-500"
                        onClick={() => removeInput(index, "offers")}
                      />
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addInput("offers")}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>+ Add another offer</span>
                </button>
              </div>
            </div>
            <div className="inputWrapper">
              <label htmlFor="rentalLocations">Available Locations</label>
              <p className="text-gray-500">
                Select all states where this package is available
              </p>
              <div className="relative">
                <div
                  className="select border border-gray-300 rounded-md cursor-pointer flex justify-between items-center"
                  onClick={() => setShowStatesDropdown(!showStatesDropdown)}
                >
                  <span>
                    {form.rentalLocations.length > 0
                      ? `${form.rentalLocations.length} states selected`
                      : "Select states"}
                  </span>
                  <svg
                    className={`transition-transform ${
                      showStatesDropdown ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {showStatesDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    <div className="py-2 px-3 border-b border-gray-200 flex justify-between">
                      <h4
                        onClick={() => toggleAllStates(true)}
                        className="text-[11px] xsm:text-[13px] text-green-700 hover:text-[#0B544C]"
                      >
                        Select All
                      </h4>
                      <h4
                        onClick={() => toggleAllStates(false)}
                        className="text-[11px] xsm:text-[13px] text-green-700 hover:text-[#0B544C]"
                      >
                        Clear All
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 xsm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 py-2 px-3">
                      {nigerianStates.map((state) => (
                        <label
                          key={state}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={form.rentalLocations.includes(state)}
                            onChange={() => handleLocationChange(state)}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-[12px] text-gray-800 xsm:text-[13px]">
                            {state}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {form.rentalLocations.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-1">Selected States:</p>
                  <div className="flex flex-wrap gap-2">
                    {form.rentalLocations.map((state) => (
                      <span
                        key={state}
                        className="bg-gray-200 rounded-sm text-[11px] xsm:text-[12px] flex items-center w-fit px-2 py-1 gap-3"
                      >
                        {state}
                        <IoClose
                          className="w-3 h-3 text-gray-500 hover:text-red-500 cursor-pointer"
                          onClick={() => handleLocationChange(state)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="addFormbuttonWrapper">
              <button
                type="submit"
                className="bg-[#0B544C] text-white hover:bg-green-800"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
};

export default DashboardEditItem;
