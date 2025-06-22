import { ChevronRightIcon} from "@heroicons/react/24/outline"
import "../../styles/dashboard/Settings.css"
import { useRef, useState } from "react"
import { HiOutlineUser } from "react-icons/hi"
import { MdOutlineNotifications, MdOutlineSecurity } from "react-icons/md"

const DashboardSettings = () => {
    const [tab, setTab] = useState("profile")
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
        if (fileInputRef.current) {
        fileInputRef.current.value = '';
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return<>
        <div className="settingsHeading">
            <h2>Dashboard <ChevronRightIcon/>
            <span className="text-gray-600">Settings</span></h2>
            <p className="text-gray-500">Change your profile and account settings</p>
        </div>

        <div className="settingsWrapper">

            <div className="leftSettingsWrapper">
                <p 
                    className={
                        tab === "profile" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                    }
                    onClick={() => setTab("profile")}
                ><HiOutlineUser/> Profile</p>
                <p 
                    className={
                        tab === "security" ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                    }
                    onClick={() => setTab("security")}
                ><MdOutlineSecurity/> Security</p>
                <p 
                    className={
                        tab === "notifications" ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                    }
                    onClick={() => setTab("notifications")}
                ><MdOutlineNotifications /> Notifications</p>
            </div>

            <div className="rightSettingsWrapper">
                <form>
                        <div className="settingsSectionHeading">
                            <h2>Profile</h2>
                            <p className="text-gray-500">Information you share here may be displayed publicly.</p>
                        </div>

                        <div className="photoWrapper">
                            <div className="leftPhotoWrapper">
                                <label htmlFor=""  className="text-gray-600">Photo</label>
                                {preview ? (
                                    <div className="relative">
                                        <img 
                                            src={preview} 
                                            alt="Profile preview" 
                                            className="w-32 h-32 rounded-full object-cover border border-gray-200"
                                        />
                                        
                                    </div>
                                ) : (
                                    <div className="w-[100px] h-[100px] rounded-full bg-gray-100 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                )}
                            </div>                  
                            <div className="rightPhotoWrapper">
                                <div className="photoButtonWrapper">
                                    <button 
                                        type="button"
                                        className="border-gray-300 border-[1px] text-gray-600 hover:text-gray-900 transition hover:bg-gray-100 px-4 py-2 rounded"
                                        onClick={triggerFileInput}
                                    >
                                        {preview ? 'Change Image' : 'Upload Image'}
                                    </button>
                                    {preview && (
                                        <button 
                                            type="button"
                                            className="text-gray-600 hover:text-red-800 px-4 py-2 rounded"
                                            onClick={handleRemoveImage}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                                <p className="text-gray-500 ">Upload a decent picture of yourself, it will also be used for verification purposes</p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>  
                        </div>

                        <hr className="border-[1px] border-gray-200 bg-gray-200"/>

                        <section>
                            <div className="inputContainer">
                                <div className="inputWrapper">
                                    <label htmlFor="" className="text-gray-700">Full Name</label>
                                    <p>Please always include your firstname and lastname</p>
                                    <input type="text" className="border border-gray-300" required/>
                                </div>
                                <div className="inputWrapper">
                                    <label htmlFor="" className="text-gray-700">Account Type</label>
                                    <p>This is your account type, the value can not be changed</p>
                                    <input type="text" className="border border-gray-300" required/>
                                </div>
                            </div>
                            <div className="inputContainer">
                                <div className="inputWrapper">
                                    <label htmlFor="" className="text-gray-700">Email Address</label>
                                    <p>Your email address can not be changed</p>
                                    <input type="email" className="border border-gray-300" required/>
                                </div>
                                <div className="inputWrapper">
                                    <label htmlFor="" className="text-gray-700">Phone Number</label>
                                    <p>Ensure you write a valid phone number. we may call you with it</p>
                                    <input type="tel" className="border border-gray-300" required/>
                                </div>
                            </div>
                        </section>

                        <hr className="border-[1px] border-gray-200 bg-gray-200"/>

                        <section>
                            <div className="inputContainer">
                                <div className="inputWrapper">
                                    <label htmlFor="" className="text-gray-700">Street Address</label>
                                    <p>Address written here should be your current street address of residence</p>
                                    <input type="text" className="border border-gray-300" name="" id="" />
                                </div>
                                <div className="inputWrapper">
                                    <label htmlFor="" className="text-gray-700">City</label>
                                    <p>City written here should be your current city of residence</p>
                                    <input type="text" className="border border-gray-300" name="" id="" />
                                </div>
                            </div>
                            <div className="inputContainer">
                                <div className="inputWrapper">
                                    <label htmlFor="" className="text-gray-700">State</label>
                                    <p>State written here should be your current city of residence</p>
                                    <input type="text" className="border border-gray-300" name="" id="" />
                                </div>
                                <div className="inputWrapper">
                                    <label htmlFor="" className="text-gray-700">Country</label>
                                    <p>Country written here should be your current city of residence</p>
                                    <input type="text" className="border border-gray-300" name="" id="" />
                                </div>
                            </div>
                        </section>

                        <hr className="border-[1px] border-gray-200 bg-gray-200"/>

                        <div className="settingsButton">
                            <button className="bg-[#0B544C] text-white hover:bg-green-950">Update Changes</button>
                        </div>
                    </form>
            </div>

        </div>

    </>

}

export default DashboardSettings