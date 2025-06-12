import "../../styles/Auth.css";
import dashboardImg from "../../assets/images/auth dashbpard.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Verify = () => {
  const [user, setUser] = useState({
    code: ""
  });

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
            <h2>Verify your account</h2>
            <p className="text-gray-600">
              Before we get started, please take 5mins to verify your account.
            </p>
          </div>

          <form action="">
            <div className="inputWrapper">
              <label htmlFor="Email Address or Phone Number">
                Verification Code <span className="text-red-600">*</span>
              </label>
              <p className="text-gray-600">Enter the verification code sent to your email address</p>
              <input
                type="text"
                name="code"
                placeholder="Type here..."
                value={user.code}
                onChange={handleChange}
              />
            </div>
            
            <button
              className="bg-[#128D7F] hover:bg-[#0B544C] text-white "
              type="submit"
            >SUBMIT</button>

            <div className="authLinks">
                <NavLink className="hover:text-[#128D7F]">Resend Verification Code</NavLink>
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

export default Verify;
