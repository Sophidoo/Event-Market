import { PencilSquareIcon } from "@heroicons/react/24/outline"
import "../styles/Profile.css"
import { useState } from "react";

const Profile = () => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        city: "",
        state: "",
        country: "",
        acctStatus: "Verified",
        role: "User",
    });
    const [img, setImg] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value, 
        }));
    };

    return<>
        <div className="profileWrapper">
            <div className="profileHeading">
                <h1>My Profile</h1>
                <hr className="border-gray-100 border-[1px]"/>
            </div>

            <div className="profileInfoWrapper border-gray-200 border-[1px]">
                <div className="leftProfileInfo">
                    <img src="" alt="" />
                    <div className="profileDetails">
                        <h2 className="text-[#0B544C]">John Doeoe</h2>
                        <p className="text-gray-600">User</p>
                        <p className="text-gray-600">Port Harcourt, Rivers State</p>
                    </div>
                </div>
                {/* <button><PencilSquareIcon/> Edit</button> */}
            </div>

            <div className="profileInfoWrapper border-gray-200 border-[1px]">
                <div className="leftProfileDetails">
                    <h1 className="text-[#0B544C]">Personal Information</h1>

                    <form action="">
                        <div className="inputContainer">
                            <div className="inputWrapper">
                                <label htmlFor="">First Name</label>
                                <p>Enter your first name</p>
                                <input type="text" name="firstName" placeholder="Type here..." value={user.firstName} onChange={handleChange}/>
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="">Last Name</label>
                                <p>Enter your last name</p>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Type here..."
                                    value={user.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="">Account Status</label>
                                <p>This is your current account status</p>
                                <input
                                    type="text"
                                    name="acctStatus"
                                    value={user.acctStatus}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="inputContainer">
                            <div className="inputWrapper">
                                <label htmlFor="">Email</label>
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
                                <label htmlFor="">Phone Number</label>
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
                                <label htmlFor="">Role</label>
                                <p>This is your current role</p>
                                <input
                                    type="text"
                                    name="role"
                                    value={user.role}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <button 
                    className="bg-[#128D7F] text-white border-[1px] border-[#128D7F] hover:bg-white hover:text-[#128D7F] transition-all duration-300"
                ><PencilSquareIcon/> Edit</button>
            </div>

            <div className="profileInfoWrapper border-gray-200 border-[1px]">
                <div className="leftProfileDetails">
                    <h1 className="text-[#0B544C]">Personal Information</h1>

                    <form action="">
                        <div className="inputContainer">
                            <div className="inputWrapper">
                                <label htmlFor="">City</label>
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
                                <label htmlFor="">State</label>
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
                                <label htmlFor="">Country</label>
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
                    className="bg-[#128D7F] text-white border-[1px] border-[#128D7F] hover:bg-white hover:text-[#128D7F] transition-all duration-300"
                ><PencilSquareIcon/> Edit</button>
            </div>
        </div>
    </>

}

export default Profile