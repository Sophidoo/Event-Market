import "../../styles/Auth.css";
import dashboardImg from "../../assets/images/auth dashbpard.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline"
import api from "../../AxiosInstance";
import Cookies from "js-cookie"
import { toast } from "react-toastify";

const Forgot = () => {
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
    code: "",
  });
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showCpassword, setShowCpassword] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    api.post(`/auth/forgot-password/${Cookies.get("email")}`, {
      otp: user.code,
      password: user.password,
      confirmPassword: user.confirmPassword
    })
    .then((res) => {
      setLoading(false);
      toast.success(res.data)
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    })
    .catch((err) => {
      console.log(err)
      toast.error(err.response?.data?.message)
      setLoading(false)
    })
  }

  const resendCode = (e) => {
    e.preventDefault();
    setLoading(true);
    
    api.get(`/auth/token/${Cookies.get("email")}`)
    .then((res) => {
      setLoading(false);
      console.log(res)
      toast.success(res.data)
    })
    .catch((err) => {
      console.log(err)
      toast.error(err.response?.data?.message)
      setLoading(false)
    })
  }


  return (
    <>
      <div className="authWrapper">
        <div className="leftAuth">
          <div className="leftAuthLogo">
            <img src="" alt="" />
          </div>
          <div className="authHeading">
            <h2>Reset Password</h2>
            <p className="text-gray-600">
              A 6 digit verifiction code has been sent to your mail, use it to reset your password.
            </p>
          </div>

          <form action="" onSubmit={handleSubmit}>
            <div className="inputWrapper">
              <label htmlFor="">
                Otp <span className="text-red-600">*</span>
              </label>
              <p className="text-gray-600">Enter the 6 digit verification code sent to your registered email address. </p>
              <input
                type="text"
                name="code"
                placeholder="Type here..."
                value={user.code}
                onChange={handleChange}
              />
            </div>
            <div className="inputWrapper">
                <label htmlFor="">New Password <span className="text-red-600">*</span></label>
              <p className="text-gray-600">
                Enter your new password. It should be at least 8 characters long and contain a mix of letters, numbers, and special characters.
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
            
            <div className="inputWrapper">
                <label htmlFor="">Confirm Password <span className="text-red-600">*</span></label>
              <p className="text-gray-600">
                Confirm your new password by entering it again.
              </p>
                <div className="inputHolder border-[1px] border-[#D1D5DB] rounded-[5px]">
                    <input type={showCpassword ? "text" : "password"} className="" name="confirmPassword" 
                    placeholder="Type here..."
                    value={user.confirmPassword}
                    onChange={handleChange}/>
                    <span className="text-gray-500 border-0"
                    onClick={() => setShowCpassword(!showCpassword)}
                    >
                        {showCpassword ? <EyeSlashIcon /> : <EyeIcon  />}
                    </span>
                </div>
            </div>
            
            
            <button
              className="bg-[#128D7F] hover:bg-[#0B544C] text-white "
              type="submit"
              disabled={loading}
            >{loading ? "LOADING..." : "SUBMIT"}</button>

            <div className="authLinks">
                <NavLink onClick={resendCode} className="hover:text-[#128D7F]">Resend Code</NavLink>
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

export default Forgot;
