import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { useRef, useState } from "react"
import "../../styles/dashboard/AddItem.css"
import { FiDownloadCloud, FiUploadCloud } from "react-icons/fi"
import { toast } from "react-toastify"
import { IoClose } from "react-icons/io5"


const nigerianStates = ["Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"];


const DashboardCreateItem = () => {
    const [form, setForm] = useState({
        category: "",
        rentalLocations: [],
        multipleInput: [""],
        multiplePriceInput: [""],
    })

    const [showSection, setShowSection] = useState()
    const [uploadedImages, setUploadedImages] = useState([])
    const [showStatesDropdown, setShowStatesDropdown] = useState(false)
    const fileInputRef = useRef(null);
    

    

    const handleFileInput = (e) => {
        e.preventDefault(); // Prevent page reload
        const files = e.target.files;
        if (files.length > 0) {
        handleFiles(files);
        }
    };

   const handleFiles = (files) => {
        const newImages = Array.from(files).map(file => ({
            file,
            preview: URL.createObjectURL(file),
            id: Math.random().toString(36).substring(2, 9)
        }))
        
        setUploadedImages(prev => [...prev, ...newImages])
    }

    const removeImage = (id) => {
        setUploadedImages(prev => {
            // Revoke object URLs to prevent memory leaks
            const imageToRemove = prev.find(img => img.id === id)
            if (imageToRemove) {
                URL.revokeObjectURL(imageToRemove.preview)
            }
            return prev.filter(img => img.id !== id)
        })
    }

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const showSpecificInformation = () => {
        if (form.category) {  // Check if a category is selected
            setShowSection(true);  // Show the dynamic section
        } else {
            toast.error("Please select a category first!")
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleLocationChange = (state) => {
        setForm(prev => {
            const newLocations = prev.rentalLocations.includes(state)
                ? prev.rentalLocations.filter(s => s !== state)
                : [...prev.rentalLocations, state];
            
            return {
                ...prev,
                rentalLocations: newLocations
            };
        });
    };

    // Handle select all/none
    const toggleAllStates = (selectAll) => {
        setForm(prev => ({
            ...prev,
            rentalLocations: selectAll ? [...nigerianStates] : []
        }));
    };

    // Handle term input changes
    const handleMultipleInputChange = (index, value) => {
        const newTerms = [...form.multipleInput];
        newTerms[index] = value;
        setForm(prev => ({
            ...prev,
            multipleInput: newTerms
        }));
    };

    // Add a new term input
    const addInput = () => {
        setForm(prev => ({
            ...prev,
            multipleInput: [...prev.multipleInput, ""]
        }));
    };

    // Remove a term
    const removeInput = (index) => {
        const newTerms = [...form.multipleInput];
        newTerms.splice(index, 1);
        setForm(prev => ({
            ...prev,
            multipleInput: newTerms.length > 0 ? newTerms : [""]
        }));
    };

    const handleMultiplePriceInputChange = (index, value) => {
        const newTerms = [...form.multiplePriceInput];
        newTerms[index] = value;
        setForm(prev => ({
            ...prev,
            multiplePriceInput: newTerms
        }));
    };

    // Add a new term Priceinput
    const addPriceInput = () => {
        setForm(prev => ({
            ...prev,
            multiplePriceInput: [...prev.multiplePriceInput, ""]
        }));
    };

    // Remove a term
    const removePriceInput = (index) => {
        const newTerms = [...form.multiplePriceInput];
        newTerms.splice(index, 1);
        setForm(prev => ({
            ...prev,
            multiplePriceInput: newTerms.length > 0 ? newTerms : [""]
        }));
    };


    return<>
        <div className="adminInventoryWrapper ">
            <div className="adminInventoryHeading">
                <div className="leftInventoryHeading">
                    <h2 className="flex flex-wrap">Dashboard <ChevronRightIcon/>
                    Inventory<ChevronRightIcon/>  <span className="text-gray-600">Add Item</span></h2>
                    <p className="text-gray-500">Use the form below to add a rental, service or package to your inventory.</p>
                </div>
            </div>
        </div>

        <form action="" className="addFormWrapper">
            <section className="border-t xsm:border border-gray-300">
                <div className="addSectionHeading">
                    <h2>General Information</h2>
                    <p className="text-gray-600">Start by filling in the core details of your item (e.g., name, category, and description).</p>
                </div>

                <div className="inputContainer">
                    <div className="inputWrapper">
                        <label htmlFor="">Name</label>
                        <p className="text-gray-500">Enter a suitable name for the item</p>
                        <input type="text" className="border border-gray-300"/>
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="">Category</label>
                        <p className="text-gray-500">What category is the item</p>
                        <select name="category" id="" className="border border-gray-300" value={form.category} onChange={handleChange}>
                            <option value="">Select Category</option>
                            <option value="rentals">Rentals</option>
                            <option value="services">Services</option>
                            <option value="packages">Packages</option>
                        </select>
                    </div>
                </div>
                <div className="inputWrapper">
                    <label htmlFor="">Description</label>
                    <p className="text-gray-500">Enter a brief description of the item</p>
                    <textarea name="" id="" className="border border-gray-300"></textarea>
                </div>

                <div className="inputWrapper">
                    <label htmlFor="">Photos</label>
                    <p className="text-gray-500">The first image will be used as the main image</p>
                    <div className="upload-section w-full  mx-auto mt-[10px]">
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
                                    Click here to upload photos
                                </button>
                            </p>
                            <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileInput}
                            className="hidden"
                            multiple
                            accept="image/jpeg, image/png"
                            />
                            <p className="upload-note text-sm text-gray-500">Supports JPG, PNG up to 10MB</p>
                        </div>

                        {uploadedImages.length > 0 && (
                            <div className="uploadedImages mt-[20px]">
                                {uploadedImages.map((image) => (
                                    <div key={image.id} className="uploadImageHolder relative">
                                        <img 
                                            src={image.preview} 
                                            alt="Preview" 
                                            className="w-full object-cover rounded-md border border-gray-300"
                                        />
                                        <IoClose 
                                            className="text-gray-700 bg-white border border-gray-200 hover:text-red-800"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                removeImage(image.id)
                                            }}
                                        />
                                       
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>



                <div className={showSection && form.category ? "hide" : "addFormbuttonWrapper"}>
                    <button type="button" className="bg-[#0B544C] text-white hover:bg-green-800" onClick={showSpecificInformation} disabled={!form.category}  >Continue</button>
                </div>
            </section>

            {
                showSection && (
                form.category === "rentals" ? 
                    <section className="border-t xsm:border  border-gray-300">
                        <div className="addSectionHeading2">
                            <h3>Rentals Information</h3>
                            <span className="text-gray-500">Fill in the rental specific information of your item.</span>
                        </div>

                        <div className="inputContainer">
                            <div className="inputWrapper">
                                <label htmlFor="">Unit Price</label>
                                <p className="text-gray-500">What is the price for a single unit of this item</p>
                                <input type="text" name="" id="" className="border border-gray-300"/>
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="">Booking Type</label>
                                <p className="text-gray-500">This determines if request is made before payment</p>
                                <select name="" id="" className="border border-gray-300">
                                    <option value="">Select an option</option>
                                    <option value="">Instant</option>
                                    <option value="">Request</option>
                                </select>
                            </div>
                        </div>

                        

                        <div className="inputWrapper">
                            <label htmlFor="">Rental Terms and Conditions</label>
                            <p className="text-gray-500">Add the terms and conditions for renting this item</p>
                            <div className="space-y-2">
                                {form.multipleInput.map((term, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={term}
                                            onChange={(e) => handleMultipleInputChange(index, e.target.value)}
                                            className="border border-gray-300 flex-1"
                                            placeholder="Enter rental term"
                                        />
                                        {form.multipleInput.length > 1 && (
                                            <IoClose className="w-5 h-5 cursor-pointer text-red-900 hover:text-red-500" 
                                                onClick={() => removeInput(index)}
                                            />
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addInput}
                                    className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                >
                                    <span>+ Add another term</span>
                                </button>
                            </div>
                        </div>

                        <div className="inputWrapper">
                            <label htmlFor="rentalLocations">Available Locations</label>
                            <p className="text-gray-500">Select all states where this item is available for rental</p>
                            
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
                                        className={`transition-transform ${showStatesDropdown ? 'transform rotate-180' : ''}`} 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                                            {nigerianStates.map(state => (
                                                <label key={state} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={form.rentalLocations.includes(state)}
                                                        onChange={() => handleLocationChange(state)}
                                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <span className="text-[12px] text-gray-800 xsm:text-[13px]">{state}</span>
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
                                        {form.rentalLocations.map(state => (
                                            <span 
                                                key={state} 
                                                className="bg-gray-200  rounded-sm text-[11px] xsm:text-[12px] flex items-center w-fit px-2 py-1 gap-3"
                                            >
                                                {state}
                                                <IoClose className="w-3 h-3 text-gray-500 hover:text-red-500 cursor-pointer" 
                                                    onClick={() => handleLocationChange(state)}
                                                />
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="addFormbuttonWrapper">
                            <button type="button" className="bg-[#0B544C] text-white hover:bg-green-800"  >Submit</button>
                        </div>
                    </section> :
                form.category === "services" ?
                    <section className="border-t xsm:border border-gray-300">
                        <div className="addSectionHeading2">
                            <h3>Service Information</h3>
                            <span className="text-gray-500">Fill in the rental specific information of your item</span>
                        </div>
                        
                         <div className="inputContainer">
                            <div className="inputWrapper">
                                <label htmlFor="">Minimum Price</label>
                                <p className="text-gray-500">What is the lowest price for this service</p>
                                <input type="text" name="" id="" className="border border-gray-300"/>
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="">Booking Type</label>
                                <p className="text-gray-500">This determines if request is made before payment</p>
                                <select name="" id="" className="border border-gray-300">
                                    <option value="">Select an option</option>
                                    <option value="">Instant</option>
                                    <option value="">Request</option>
                                </select>
                            </div>
                        </div>

                         <div className="inputContainer">
                            <div className="inputWrapper">
                                <label htmlFor="">Experience</label>
                                <p className="text-gray-500">How many years experience do you have doing this service</p>
                                <input type="text" name="" id="" className="border border-gray-300"/>
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="">Career Highlight</label>
                                <p className="text-gray-500">Write a brief highlight of your career</p>
                                <input type="text" name="" id="" className="border border-gray-300"/>
                            </div>
                        </div>

                        <div className="inputWrapper">
                            <label htmlFor="">Education and Training</label>
                            <p className="text-gray-500">Talk a little about the education and trainig you've gotten concerning this field</p>
                            <textarea name="" id="" className="border border-gray-300"></textarea>
                        </div>
                        

                        <div className="inputWrapper">
                            <label htmlFor="">Service Details</label>
                            <p className="text-gray-500">Add a list of what this service offers</p>
                            <div className="space-y-2">
                                {form.multipleInput.map((term, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={term}
                                            onChange={(e) => handleMultipleInputChange(index, e.target.value)}
                                            className="border border-gray-300 flex-1"
                                            placeholder="Offer 1"
                                        />
                                        {form.multipleInput.length > 1 && (
                                            <IoClose className="w-5 h-5 cursor-pointer text-red-900 hover:text-red-500" 
                                                onClick={() => removeInput(index)}
                                            />
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addInput}
                                    className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                >
                                    <span>+ Add another offer</span>
                                </button>
                            </div>
                        </div>

                        <div className="inputWrapper">
                            <label htmlFor="">Service Pricing</label>
                            <p className="text-gray-500">List the pricing plan for this service</p>
                            <div className="space-y-2">
                                {form.multiplePriceInput.map((term, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={term}
                                            onChange={(e) => handleMultiplePriceInputChange(index, e.target.value)}
                                            className="border border-gray-300 flex-1"
                                            placeholder="3000 for ---"
                                        />
                                        {form.multipleInput.length > 1 && (
                                            <IoClose className="w-5 h-5 cursor-pointer text-red-900 hover:text-red-500" 
                                                onClick={() => removePriceInput(index)}
                                            />
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addPriceInput}
                                    className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                >
                                    <span>+ Add another price</span>
                                </button>
                            </div>
                        </div>


                        <div className="inputWrapper">
                            <label htmlFor="rentalLocations">Available Locations</label>
                            <p className="text-gray-500">Select all states where this item is available for rental</p>
                            
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
                                        className={`transition-transform ${showStatesDropdown ? 'transform rotate-180' : ''}`} 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                                            {nigerianStates.map(state => (
                                                <label key={state} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={form.rentalLocations.includes(state)}
                                                        onChange={() => handleLocationChange(state)}
                                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <span className="text-[12px] text-gray-800 xsm:text-[13px]">{state}</span>
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
                                        {form.rentalLocations.map(state => (
                                            <span 
                                                key={state} 
                                                className="bg-gray-200  rounded-sm text-[11px] xsm:text-[12px] flex items-center w-fit px-2 py-1 gap-3"
                                            >
                                                {state}
                                                <IoClose className="w-3 h-3 text-gray-500 hover:text-red-500 cursor-pointer" 
                                                    onClick={() => handleLocationChange(state)}
                                                />
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="addFormbuttonWrapper">
                            <button type="button" className="bg-[#0B544C] text-white hover:bg-green-800"  >Submit</button>
                        </div>
                        
                    </section> :
                form.category === "packages" ?
                    <section className="border-t xsm:border border-gray-300">
                        <div className="addSectionHeading2">
                            <h3>Package Information</h3>
                            <span className="text-gray-500">Fill in the rental specific information of your item</span>
                        </div>

                        <div className="inputContainer">
                            <div className="inputWrapper">
                                <label htmlFor="">Cost</label>
                                <p className="text-gray-500">What is the cost for this package</p>
                                <input type="text" name="" id="" className="border border-gray-300"/>
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="">Booking Type</label>
                                <p className="text-gray-500">This determines if request is made before payment</p>
                                <select name="" id="" className="border border-gray-300">
                                    <option value="">Select an option</option>
                                    <option value="">Instant</option>
                                    <option value="">Request</option>
                                </select>
                            </div>
                        </div>

                        <div className="inputWrapper">
                            <label htmlFor="">Package Details</label>
                            <p className="text-gray-500">Add a list of what this package offers</p>
                            <div className="space-y-2">
                                {form.multipleInput.map((term, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={term}
                                            onChange={(e) => handleMultipleInputChange(index, e.target.value)}
                                            className="border border-gray-300 flex-1"
                                            placeholder="Enter rental term"
                                        />
                                        {form.multipleInput.length > 1 && (
                                            <IoClose className="w-5 h-5 cursor-pointer text-red-900 hover:text-red-500" 
                                                onClick={() => removeInput(index)}
                                            />
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addInput}
                                    className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                >
                                    <span>+ Add another offer</span>
                                </button>
                            </div>
                        </div>

                        <div className="inputWrapper">
                            <label htmlFor="rentalLocations">Available Locations</label>
                            <p className="text-gray-500">Select all states where this item is available for rental</p>
                            
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
                                        className={`transition-transform ${showStatesDropdown ? 'transform rotate-180' : ''}`} 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                                            {nigerianStates.map(state => (
                                                <label key={state} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={form.rentalLocations.includes(state)}
                                                        onChange={() => handleLocationChange(state)}
                                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <span className="text-[12px] text-gray-800 xsm:text-[13px]">{state}</span>
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
                                        {form.rentalLocations.map(state => (
                                            <span 
                                                key={state} 
                                                className="bg-gray-200  rounded-sm text-[11px] xsm:text-[12px] flex items-center w-fit px-2 py-1 gap-3"
                                            >
                                                {state}
                                                <IoClose className="w-3 h-3 text-gray-500 hover:text-red-500 cursor-pointer" 
                                                    onClick={() => handleLocationChange(state)}
                                                />
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="addFormbuttonWrapper">
                            <button type="button" className="bg-[#0B544C] text-white hover:bg-green-800"  >Submit</button>
                        </div>
                    </section>
                : ""

                )
            }

        </form>
            
            

    </>

}

export default DashboardCreateItem