import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import api from "../../AxiosInstance"; // Import the configured axios instance
import { toast } from "react-toastify"; // Optional: For user feedback
import { StatusCodes } from "http-status-codes";

const Security = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [updating, setUpdating] = useState(false);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear errors for the field being edited
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // Client-side form validation
    const validateForm = () => {
        const newErrors = {};
        if (!formData.oldPassword) {
            newErrors.oldPassword = "Current password is required";
        }
        if (!formData.newPassword) {
            newErrors.newPassword = "New password is required";
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = "New password must be at least 6 characters";
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required";
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setUpdating(true);
        try {
            const response = await api.patch("/auth/reset-password", {
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword,
            });
            toast.success(response.data || "Password updated successfully");
            // Reset form after successful update
            setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            console.error("Error updating password:", error);
            const message =
                error.response?.data?.message || "Failed to update password";
            toast.error(message);
            if (error.response?.status === StatusCodes.BAD_REQUEST) {
                setErrors((prev) => ({
                    ...prev,
                    oldPassword: message.includes("Incorrect") ? message : "",
                    confirmPassword: message.includes("match") ? message : "",
                }));
            }
        } finally {
            setUpdating(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="settingsSectionHeading mb-[-10px]">
                <h2>Change Password</h2>
                <p className="text-gray-500">Input your current password and your new password</p>
            </div>

            <hr className="border-[1px] border-gray-200 bg-gray-200" />

            <section className="mt-[-10px]">
                <div className="inputWrapper">
                    <label htmlFor="oldPassword" className="text-gray-700">
                        Current Password
                    </label>
                    <p className="text-gray-500">Please enter your current account password</p>
                    <div className="relative">
                        <input
                            id="oldPassword"
                            name="oldPassword"
                            type={showOldPassword ? "text" : "password"}
                            value={formData.oldPassword}
                            onChange={handleInputChange}
                            className={`w-full border border-gray-300 ${errors.oldPassword ? "border-red-500" : ""}`}
                            required
                            disabled={updating}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            disabled={updating}
                        >
                            {showOldPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    {errors.oldPassword && (
                        <p className="text-red-500 text-xs mt-1">{errors.oldPassword}</p>
                    )}
                </div>

                <div className="inputWrapper">
                    <label htmlFor="newPassword" className="text-gray-700">
                        New Password
                    </label>
                    <p className="text-gray-500">Please enter your new password</p>
                    <div className="relative">
                        <input
                            id="newPassword"
                            name="newPassword"
                            type={showPassword ? "text" : "password"}
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className={`w-full border border-gray-300 ${errors.newPassword ? "border-red-500" : ""}`}
                            required
                            disabled={updating}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={updating}
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    {errors.newPassword && (
                        <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
                    )}
                </div>

                <div className="inputWrapper">
                    <label htmlFor="confirmPassword" className="text-gray-700">
                        Confirm Password
                    </label>
                    <p className="text-gray-500">Please enter your confirm password</p>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showCPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`w-full border border-gray-300 ${errors.confirmPassword ? "border-red-500" : ""}`}
                            required
                            disabled={updating}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowCPassword(!showCPassword)}
                            disabled={updating}
                        >
                            {showCPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                    )}
                </div>
            </section>

            <hr className="border-[1px] border-gray-200 bg-gray-200" />

            <div className="settingsButton">
                <button
                    type="submit"
                    className="bg-[#0B544C] text-white hover:bg-green-950 cursor-pointer transition"
                    disabled={updating}
                >
                    {updating ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
};

export default Security;