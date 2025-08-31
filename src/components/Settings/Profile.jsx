import { useRef, useState, useEffect } from "react";
import api from "../../AxiosInstance"; // Import the configured axios instance
import { toast } from "react-toastify"; // Optional: For user

const Profile = ({ setTab }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        verified: false,
        address: "",
        city: "",
        state: "",
        country: "",
        profile: "",
    });
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);

    // Fetch logged-in user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await api.get("/auth/logged-user");
                const user = response.data;
                setUserData({
                    name: user.name || "",
                    email: user.email || "",
                    phone: user.phone || "",
                    role: user.role || "",
                    verified: user.verified || false,
                    address: user.address || "",
                    city: user.city || "",
                    state: user.state || "",
                    country: user.country || "",
                    profile: user.profile || "",
                });
                if (user.profile) {
                    setPreview(user.profile); // Set profile picture preview if it exists
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error(error.response?.data?.message || "Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    // Handle profile picture change
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);

            // Upload profile picture to Cloudinary
            setUpdating(true);
            try {
                const formData = new FormData();
                formData.append("file", file);
                const response = await api.patch("/auth/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                setUserData((prev) => ({ ...prev, profile: response.data.imageUrl }));
                toast.success("Profile picture updated successfully");
            } catch (error) {
                console.error("Error uploading profile picture:", error);
                toast.error(error.response?.data?.message || "Failed to upload profile picture");
            } finally {
                setUpdating(false);
            }
        }
    };

    // Handle removing profile picture
    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        // Optionally, you could make an API call to clear the profile picture in the database
    };

    // Trigger file input click
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    // Handle form submission for user details and address
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            // Update user details (name, phone)
            const userDetailsDto = {
                name: userData.name,
                phone: userData.phone,
                email: userData.email, // Included but not updated (as per UI)
                role: userData.role, // Included but not updated (as per UI)
            };
            await api.patch("/auth/user", userDetailsDto);

            // Update user address
            const userAddressDto = {
                address: userData.address,
                city: userData.city,
                state: userData.state,
                country: userData.country,
            };
            await api.patch("/auth/address", userAddressDto);

            toast.success("Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setUpdating(false);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="settingsSectionHeading">
                <h2>Profile</h2>
                <p className="text-gray-500">Information you share here may be displayed publicly.</p>
            </div>

            <div className="photoWrapper">
                <div className="leftPhotoWrapper">
                    <label htmlFor="" className="text-gray-600">Photo</label>
                    {loading ? (
                        <div className="w-[100px] h-[100px] rounded-full bg-gray-100 flex items-center justify-center">
                            <span>Loading...</span>
                        </div>
                    ) : preview ? (
                        <div className="relative">
                            <img
                                src={preview}
                                alt="Profile preview"
                                className="w-32 h-32 rounded-full object-cover border border-gray-200"
                            />
                        </div>
                    ) : (
                        <div className="w-[100px] h-[100px] rounded-full bg-gray-100 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
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
                            disabled={updating}
                        >
                            {preview ? "Change Image" : "Upload Image"}
                        </button>
                        {preview && (
                            <button
                                type="button"
                                className="text-gray-600 hover:text-red-800 px-4 py-2 rounded"
                                onClick={handleRemoveImage}
                                disabled={updating}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                    <p className="text-gray-500">
                        Upload a decent picture of yourself, it will also be used for verification purposes
                    </p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                    />
                </div>
            </div>

            <hr className="border-[1px] border-gray-200 bg-gray-200" />

            <section>
                <div className="inputContainer">
                    <div className="inputWrapper">
                        <label htmlFor="name" className="text-gray-700">Full Name</label>
                        <p>Please always include your firstname and lastname</p>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            className="border border-gray-300"
                            required
                            disabled={loading || updating}
                        />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="role" className="text-gray-700">Account Type</label>
                        <p>This is your account type, the value cannot be changed</p>
                        <input
                            type="text"
                            name="role"
                            value={userData.role}
                            className="border border-gray-300"
                            disabled
                            required
                        />
                    </div>
                </div>
                <div className="inputContainer">
                    <div className="inputWrapper">
                        <label htmlFor="email" className="text-gray-700">Email Address</label>
                        <p>Your email address cannot be changed</p>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            className="border border-gray-300"
                            disabled
                            required
                        />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="phone" className="text-gray-700">Phone Number</label>
                        <p>Write a valid phone number. We may call you with it</p>
                        <input
                            type="tel"
                            name="phone"
                            value={userData.phone}
                            onChange={handleInputChange}
                            className="border border-gray-300"
                            required
                            disabled={loading || updating}
                        />
                    </div>
                </div>
                <div className="inputContainer">
                    <div className="inputWrapper">
                        <label htmlFor="verified" className="text-gray-700">Account Status</label>
                        <p>
                            Your account is {userData.verified ? "verified" : "not verified"}.{" "}
                            {!userData.verified && (
                                <span
                                    className="text-blue-700 underline cursor-pointer font-medium"
                                    onClick={() => setTab("verification")}
                                >
                                    Click here
                                </span>
                            )}{" "}
                            {!userData.verified && "to verify now"}
                        </p>
                        <input
                            type="text"
                            value={userData.verified ? "Verified" : "Not Verified"}
                            className={`border border-gray-300 ${userData.verified ? "text-green-700" : "text-red-700"}`}
                            disabled
                            required
                        />
                    </div>
                </div>
            </section>

            <hr className="border-[1px] border-gray-200 bg-gray-200" />

            <section>
                <div className="inputContainer">
                    <div className="inputWrapper">
                        <label htmlFor="address" className="text-gray-700">Street Address</label>
                        <p>Address written here should be your current street address of residence</p>
                        <input
                            type="text"
                            name="address"
                            value={userData.address}
                            onChange={handleInputChange}
                            className="border border-gray-300"
                            disabled={loading || updating}
                        />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="city" className="text-gray-700">City</label>
                        <p>City written here should be your current city of residence</p>
                        <input
                            type="text"
                            name="city"
                            value={userData.city}
                            onChange={handleInputChange}
                            className="border border-gray-300"
                            disabled={loading || updating}
                        />
                    </div>
                </div>
                <div className="inputContainer">
                    <div className="inputWrapper">
                        <label htmlFor="state" className="text-gray-700">State</label>
                        <p>State written here should be your current state of residence</p>
                        <input
                            type="text"
                            name="state"
                            value={userData.state}
                            onChange={handleInputChange}
                            className="border border-gray-300"
                            disabled={loading || updating}
                        />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="country" className="text-gray-700">Country</label>
                        <p>Country written here should be your current country of residence</p>
                        <input
                            type="text"
                            name="country"
                            value={userData.country}
                            onChange={handleInputChange}
                            className="border border-gray-300"
                            disabled={loading || updating}
                        />
                    </div>
                </div>
            </section>

            <hr className="border-[1px] border-gray-200 bg-gray-200" />

            <div className="settingsButton">
                <button
                    type="submit"
                    className="bg-[#0B544C] text-white hover:bg-green-950"
                    disabled={loading || updating}
                >
                    {updating ? "Updating..." : "Update Changes"}
                </button>
            </div>
        </form>
    );
};

export default Profile;