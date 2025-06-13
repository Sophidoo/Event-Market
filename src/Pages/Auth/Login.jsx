import "../../styles/Auth.css";
import dashboardImg from "../../assets/images/auth dashbpard.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline"

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="authWrapper">
        <div className="leftAuth">
          <div className="leftAuthLogo">
            <img src="" alt="" />
          </div>
          <div className="authHeading">
            <h2>Welcome Back</h2>
            <p className="text-gray-600">
              Login to enjoy our features and streamline your event planning or <NavLink to={"/register"} className="text-[#0B544C]">Create account</NavLink> if you don't have an
              account
            </p>
          </div>

          <form action="">
            <div className="inputWrapper">
              <label htmlFor="Email Address or Phone Number">
                Email Address <span className="text-red-600">*</span>
              </label>
              <p className="text-gray-600">Enter the emaill address or phone number used during your registration with us. </p>
              <input
                type="text"
                name="email"
                placeholder="Type here..."
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="inputWrapper">
                <label htmlFor="">Password <span className="text-red-600">*</span></label>
              <p className="text-gray-600">
                Password should be more than 6 digits and contain special
                characters{" "}
              </p>
                <div className="inputHolder border-[1px] border-[#D1D5DB] rounded-[5px]">
                    <input type={showPassword ? "text" : "password"} className="" name="password" 
                    placeholder="Type here..."
                    value={user.password}
                    onChange={handleChange}/>
                    <span className="text-gray-500 border-0"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeSlashIcon /> : <EyeIcon  />}
                    </span>
                </div>
            </div>
            <button
              className="bg-[#128D7F] hover:bg-[#0B544C] text-white "
              type="submit"
            >SUBMIT</button>

            <div className="authLinks">
                <NavLink className="hover:text-[#128D7F]">Forgot Password</NavLink>
            </div>
          </form>
        </div>

        <div className="rightAuth">
          <h1 className="text-white">
            The all-in-one platform for event rentals, services, and vendor
            control.
          </h1>
          <p className="text-gray-300">Manage bookings, services, and everything in one place.</p>
          <img src={dashboardImg} alt="" />
        </div>
      </div>
    </>
  );
};

export default Login;
