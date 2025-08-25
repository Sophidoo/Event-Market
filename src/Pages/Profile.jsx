import { PencilSquareIcon } from "@heroicons/react/24/outline";
import "../styles/Profile.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify"; // Optional: for notifications
import api from "../AxiosInstance";

const Profile = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        city: "",
        state: "",
        country: "",
        acctStatus: "Verified",
        role: "User",
        profile: ""
    });
    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(false)
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // Fetch user data on mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true)
                const response = await api.get(`/auth/logged-user`);
                const userData = response.data;
                console.log(userData)
                setUser({
                    name: userData.name || "",
                    email: userData.email || "",
                    phoneNumber: userData.phone || "",
                    city: userData.city || "",
                    state: userData.state || "",
                    country: userData.country || "",
                    acctStatus: userData.verified ? "Verified" : "Unverified",
                    role: userData.role || "User",
                    profile: userData.profile || "User",
                });
                setImg(userData.profile || "");
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error("Error fetching user data:", error);
                toast.error("Failed to fetch user data");
            }
        };
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setImg(e.target.files[0]);
    };

    const handlePersonalInfoSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await api.patch(`/auth/user`, {
                name: user.name,
                email: user.email,
                phone: user.phoneNumber,
                role: user.role,
            });
            setLoading(false)
            toast.success(response.data);
        } catch (error) {
            setLoading(false)
            console.error("Error updating personal info:", error);
            toast.error(error.response?.data?.message || "Failed to update personal info");
        }
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log(user)
        try {
            const response = await api.patch(`/auth/address`, {
                city: user.city,
                state: user.state,
                country: user.country,
            });
            toast.success(response.data);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error("Error updating address:", error);
            toast.error(error.response?.data?.message || "Failed to update address");
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await api.patch(`/auth/reset-password`, {
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword,
                confirmPassword: passwordData.confirmPassword,
            });
            toast.success(response.data);
            setLoading(false)
            setPasswordData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            setLoading(false)
            console.error("Error updating password:", error);
            toast.error(error.response?.data?.message || "Failed to update password");
        }
    };

    const handleProfilePicSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append("profile", img);
            const response = await api.patch(`/auth/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setUser({...user, profile: response.data.imageUrl})
            toast.success(response.data.message);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error("Error updating profile picture:", error);
            toast.error(error.response?.data?.error || error.response?.data?.message || "Failed to update profile picture");
        }
    };

    return (
        <div className="profileWrapper">
            <div className="profileHeading">
                <h1>My Profile</h1>
                <hr className="border-gray-100 border-[1px]" />
            </div>

            <div className="profileInfoWrapper border-gray-200 border-[1px]">
                <div className="leftProfileInfo">
                    <img src={user.profile || img} alt="Profile" className="object-cover object-top"/>
                    <div className="profileDetails">
                        <h2 className="text-[#0B544C]">{user.name}</h2>
                        <p className="text-gray-600">{user.role}</p>
                        <p className="text-gray-600">{`${user.city}, ${user.state}`}</p>
                    </div>
                </div>
            </div>

            <div className="profileInfoWrapper border-gray-200 border-[1px]">
                <div className="leftProfileDetails">
                    <h1 className="text-[#0B544C]">Personal Information</h1>
                    <form >
                        <div className="inputContainer">
                            <div className="inputWrapper">
                                <label htmlFor="name">Name</label>
                                <p>Enter your first name</p>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Type here..."
                                    value={user.name}
                                    onChange={handleChange}
                                    
                                />
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="email">Email</label>
                                <p>Enter a valid email address</p>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Type here..."
                                    value={user.email}
                                    onChange={handleChange}
                                    
                                />
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="acctStatus">Account Status</label>
                                <p>This is your current account status</p>
                                <input
                                    type="text"
                                    name="acctStatus"
                                    value={user.acctStatus}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="inputContainer">
                            <div className="inputWrapper">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <p>Enter your valid phone number</p>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="Type here..."
                                    value={user.phoneNumber}
                                    onChange={handleChange}
                                    
                                />
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="role">Role</label>
                                <p>This is your current role</p>
                                <input
                                    type="text"
                                    name="role"
                                    value={user.role}
                                    disabled
                                />
                            </div>
                        </div>
                    </form>
                </div>
                    <button
                        type="submit"
                        className="bg-[#128D7F] text-white border-[1px] border-[#128D7F] hover:bg-white hover:text-[#128D7F] transition-all duration-300 cursor-pointer"
                        disabled={loading}
                        onClick={handlePersonalInfoSubmit}
                    >
                        <PencilSquareIcon className="w-5 h-5" /> {loading ? "Loading..." : "Edit"}
                    </button>
            </div>

            <div className="profileInfoWrapper border-gray-200 border-[1px]">
                <div className="leftProfileDetails">
                    <h1 className="text-[#0B544C]">Profile Picture</h1>
                    <form >
                        <div className="inputWrapper w-full">
                            <label htmlFor="image">Profile Picture</label>
                            <p>Change your profile picture here</p>
                            <input
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                                
                            />
                        </div>
                    </form>
                </div>
                <button
                    type="submit"
                    className="bg-[#128D7F] text-white border-[1px] border-[#128D7F] hover:bg-white hover:text-[#128D7F] transition-all duration-300 cursor-pointer"
                    disabled={loading}
                    onClick={handleProfilePicSubmit}
                >
                    <PencilSquareIcon className="w-5 h-5" /> {loading ? "Loading..." : "Edit"}
                </button>
            </div>

            <div className="profileInfoWrapper border-gray-200 border-[1px]">
                <div className="leftProfileDetails">
                    <h1 className="text-[#0B544C]">Address</h1>
                    <form>
                        <div className="inputContainer">
                            <div className="inputWrapper">
                                <label htmlFor="city">City</label>
                                <p>Enter your city of residence</p>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Type here..."
                                    value={user.city}
                                    onChange={handleChange}
                                    
                                />
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="state">State</label>
                                <p>Enter your state of residence</p>
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="Type here..."
                                    value={user.state}
                                    onChange={handleChange}
                                    
                                />
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="country">Country</label>
                                <p>Enter your country of residence</p>
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Type here..."
                                    value={user.country}
                                    onChange={handleChange}
                                    
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <button
                    type="submit"
                    className="bg-[#128D7F] text-white border-[1px] border-[#128D7F] hover:bg-white hover:text-[#128D7F] transition-all duration-300 cursor-pointer"
                    disabled={loading}
                    onClick={handleAddressSubmit}
                >
                    <PencilSquareIcon className="w-5 h-5" /> {loading ? "Loading..." : "Edit"}
                </button>
            </div>

            <div className="profileInfoWrapper border-gray-200 border-[1px]">
                <div className="leftProfileDetails">
                    <h1 className="text-[#0B544C]">Password</h1>
                    <form >
                        <div className="inputContainer">
                            <div className="inputWrapper">
                                <label htmlFor="oldPassword">Old Password</label>
                                <p>Enter your old password</p>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    placeholder="Type here..."
                                    value={passwordData.oldPassword}
                                    onChange={handlePasswordChange}
                                    
                                />
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="newPassword">New Password</label>
                                <p>Enter your new password</p>
                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder="Type here..."
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    
                                />
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <p>Confirm your new password</p>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Type here..."
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <button
                    type="submit"
                    className="bg-[#128D7F] text-white border-[1px] border-[#128D7F] hover:bg-white hover:text-[#128D7F] transition-all duration-300 cursor-pointer"
                    disabled={loading}
                    onClick={handlePasswordSubmit}
                >
                    <PencilSquareIcon className="w-5 h-5" /> {loading ? "Loading..." : "Edit"}
                </button>
            </div>
        </div>
    );
};

export default Profile;