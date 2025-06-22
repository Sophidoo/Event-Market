import { ChevronRightIcon, EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline"
import "../../styles/dashboard/Settings.css"
import { useRef, useState } from "react"
import { HiOutlineUser } from "react-icons/hi"
import { MdOutlineAccountBalanceWallet, MdOutlineNotifications, MdOutlineSecurity, MdToggleOff, MdToggleOn } from "react-icons/md"
import { LiaToggleOnSolid } from "react-icons/lia"
import { VscVerified } from "react-icons/vsc"

const DashboardSettings = () => {
    const [tab, setTab] = useState("profile")
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [notifications, setNotifications] = useState({
        email: false,
        sms: false
    })

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
                        tab === "profile" || tab === "verification" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                    }
                    onClick={() => setTab("profile")}
                ><HiOutlineUser/> Profile</p>
                <p 
                    className={
                        tab === "security" ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                    }
                    onClick={() => setTab("security")}
                ><MdOutlineSecurity/> Security</p>
                {/* <p 
                    className={
                        tab === "verification" ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                    }
                    onClick={() => setTab("verification")}
                ><VscVerified/> Verification</p> */}
                <p 
                    className={
                        tab === "account" ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                    }
                    onClick={() => setTab("account")}
                ><MdOutlineAccountBalanceWallet/> Account</p>
                <p 
                    className={
                        tab === "notifications" ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                    }
                    onClick={() => setTab("notifications")}
                ><MdOutlineNotifications /> Notifications</p>
            </div>

            <div className="rightSettingsWrapper">
                {
                    tab === "security" ? 
                        <form>
                            <div className="settingsSectionHeading mb-[-10px]">
                                <h2>Change Password</h2>
                                <p className="text-gray-500">Input your current password and your new password</p>
                            </div>

                            <hr className="border-[1px] border-gray-200 bg-gray-200"/>

                            <section className="mt-[-10px]">
                            
                                <div className="inputWrapper ">
                                    <label htmlFor="currentPassword" className="text-gray-700">
                                    Current Password
                                    </label>
                                    <p className="text-gray-500">Please enter your current account password</p>
                                    
                                    <div className="relative">
                                    <input
                                        id="currentPassword"
                                        type={showOldPassword ? 'text' : 'password'}
                                        className="w-full border border-gray-300"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                    >
                                        {showOldPassword ? (
                                        <EyeSlashIcon className="h-5 w-5" />
                                        ) : (
                                        <EyeIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                    </div>
                                </div>
                                

                                <div className="inputWrapper ">
                                    <label htmlFor="currentPassword" className="text-gray-700">
                                    New Password
                                    </label>
                                    <p className="text-gray-500">Please enter your new password</p>
                                    
                                    <div className="relative">
                                    <input
                                        id="currentPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        className="w-full border border-gray-300"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5" />
                                        ) : (
                                        <EyeIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                    </div>
                                </div>
                                

                                <div className="inputWrapper ">
                                    <label htmlFor="currentPassword" className="text-gray-700">
                                    Confirm Password
                                    </label>
                                    <p className="text-gray-500">Please enter your confirm password</p>
                                    
                                    <div className="relative">
                                    <input
                                        id="currentPassword"
                                        type={showCPassword ? 'text' : 'password'}
                                        className="w-full border border-gray-300"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                        onClick={() => setShowCPassword(!showCPassword)}
                                    >
                                        {showCPassword ? (
                                        <EyeSlashIcon className="h-5 w-5" />
                                        ) : (
                                        <EyeIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                    </div>
                                </div>
                                
                            </section>

                            <hr className="border-[1px] border-gray-200 bg-gray-200"/>

                            <div className="settingsButton">
                                <button className="bg-[#0B544C] text-white hover:bg-green-950">Save Changes</button>
                            </div>
                        </form>
                    :
                    tab === "notifications" ?
                    <form>
                        <div className="settingsSectionHeading mb-[-10px]">
                            <h2>Notifications</h2>
                            <p className="text-gray-500">Once enabled you'll receive relevant notifications within your selected choice</p>
                        </div>

                        <hr className="border-[1px] border-gray-200 bg-gray-200"/>
                        
                        <section className="mt-[-25px] settingsNotification">
                            <label>
                                {
                                    notifications.email ?
                                    <MdToggleOn 
                                        className="invert-0 text-green-700"
                                        onClick={() => setNotifications(prev => ({
                                            ...prev,
                                            email: false
                                        }))}
                                    /> :
                                    <MdToggleOff 
                                        className="text-gray-300"
                                        onClick={() => setNotifications(prev => ({
                                            ...prev,
                                            email: true
                                        }))}
                                    />
                                }
                                Email 
                            </label>
                            <label>
                                {
                                    notifications.sms ?
                                    <MdToggleOn 
                                        className="invert-0 text-green-700"
                                        onClick={() => setNotifications(prev => ({
                                            ...prev,
                                            email: false
                                        }))}
                                    /> :
                                    <MdToggleOff 
                                        className="text-gray-300"
                                        onClick={() => setNotifications(prev => ({
                                            ...prev,
                                            email: true
                                        }))}
                                    />
                                }
                                Sms
                            </label>
                        </section>

                    </form>
                    :
                    tab  === "verification" ?
                    <form>
                        <div className="settingsSectionHeading mb-[-10px]">
                            <h2>Verification</h2>
                            <p className="text-gray-500">Fill in the input below to verify your account</p>
                        </div>

                        <hr className="border-[1px] border-gray-200 bg-gray-200"/>
                        
                        <section className="mt-[-25px] settingsNotification">
                            
                        </section>
                    </form>
                    : tab === "account" ?
                    <form>
                        <div className="settingsSectionHeading mb-[-10px]">
                            <h2>Account</h2>
                            <p className="text-gray-500">Withdrawals will be made to the account filled in here</p>
                        </div>

                        <hr className="border-[1px] border-gray-200 bg-gray-200"/>
                        
                        <section className="mt-[-10px]">
                            <div className="inputWrapper">
                                <label htmlFor="" className="text-gray-700">Account Name</label>
                                <p>The account name must match with your verified account name</p>
                                <input type="text" className="border border-gray-300"/>
                            </div>
                            <div className="inputContainer">
                                <div className="inputWrapper">
                                    <label htmlFor="" className="text-gray-700">Account Number</label>
                                    <p>Enter your account number</p>
                                    <input type="text" className="border border-gray-300"/>
                                </div>
                                <div className="inputWrapper">
                                    <label htmlFor="" className="text-gray-700">Bank Name</label>
                                    <p>Enter your banck name</p>
                                    <input type="text" className="border border-gray-300"/>
                                </div>
                            </div>
                            <div className="inputContainer">
                                <div className="inputWrapper">
                                    <label htmlFor="" className="text-gray-700">Swift Code / BIC</label>
                                    <p>This is optional, only for countries that require it</p>
                                    <input type="text" className="border border-gray-300"/>
                                </div>
                                <div className="inputWrapper">
                                    <label htmlFor="" className="text-gray-700">Branch</label>
                                    <p>This is optional</p>
                                    <input type="text" className="border border-gray-300"/>
                                </div>
                            </div>
                        </section>

                        <hr className="border-[1px] border-gray-200 bg-gray-200"/>

                        <div className="settingsButton">
                            <button className="bg-[#0B544C] text-white hover:bg-green-950">Save Changes</button>
                        </div>
                    </form>
                    : <form>
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
                                    <p>Write a valid phone number. we may call you with it</p>
                                    <input type="tel" className="border border-gray-300" required/>
                                </div>
                            </div>
                            <div className="inputContainer">
                                <div className="inputWrapper">
                                    <label htmlFor="" className="text-gray-700">Account Status</label>
                                    <p>Your account is not verified. <span className="text-[#0B544C] underline cursor-pointer" onClick={() => setTab("verification")}>Click here</span> to verify now</p>
                                    <input type="email" className="border border-gray-300 text-red-700" value="Not Verified" disabled required/>
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
                }
            </div>

        </div>

    </>

}

export default DashboardSettings