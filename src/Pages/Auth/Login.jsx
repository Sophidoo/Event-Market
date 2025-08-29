import "../../styles/Auth.css";
import dashboardImg from "../../assets/images/auth dashbpard.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline"
import api from "../../AxiosInstance";
import Cookies from "js-cookie"
import { toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

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
    
    api.post(`/auth/login`, {...user})
    .then((res) => {
      setLoading(false);
      toast.success(res.data?.message)
      Cookies.set("token", res.data?.token);
      Cookies.set("role", res.data?.user.role)
      Cookies.set("email", res.data?.user.email)
      setTimeout(() => {
        navigate("/")
      }, 2000)
    })
    .catch((err) => {
      console.log(err)
      toast.error(err.response?.data?.message)
      setLoading(false)
    })
  }


  const forgotPassword = (e) => {
     e.preventDefault();

    if(!user.email){
      toast.error("Please input your email address")
      return
    }

    toast.info("Please Wait...")
    
    api.get(`/auth/token/${user.email}`)
    .then((res) => {
      toast.success(res.data)
      console.log(res)
      Cookies.set("email", user.email);
      setTimeout(() => {
        navigate("/forgot-password")
      }, 2000)
    })
    .catch((err) => {
      console.log(err)
      toast.error(err.response?.data?.message)
    })
  }

  const verifyEmail = () => {
    if(!user.email){
      toast.error("Please input your email address")
      return
    }

    Cookies.set("email", user.email);
    navigate("/email-verification")
  }

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

          <form action="" onSubmit={handleSubmit}>
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
              disabled={loading}
            >{loading ? "LOADING..." : "SUBMIT"}</button>

            <div className="text-xs font-medium xsm:text-[13px] flex justify-between w-full">
                <NavLink onClick={verifyEmail} className="hover:text-[#128D7F]">Verify Email</NavLink>
                <NavLink onClick={forgotPassword} className="hover:text-[#128D7F]">Forgot Password</NavLink>
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
