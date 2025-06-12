import "../../styles/Auth.css";
import dashboardImg from "../../assets/images/auth dashbpard.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    type: "",
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
            <h2>Create an Account</h2>
            <p className="text-gray-600">
              Create an account to enjoy our features and streamline your event
              planning or <NavLink className="text-[#0B544C]">Login</NavLink> if you already have an
              account
            </p>
          </div>

          <form action="">
            <div className="inputWrapper">
              <label htmlFor="Name">
                Name <span className="text-red-600">*</span>
              </label>
              <p className="text-gray-600">
                Enter your full name as a user or business name as a vendor{" "}
              </p>
              <input
                type="text"
                name="name"
                placeholder="Type here..."
                value={user.name}
                onChange={handleChange}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="Email">
                Email Address <span className="text-red-600">*</span>
              </label>
              <p className="text-gray-600">Enter your valid email address </p>
              <input
                type="text"
                name="email"
                placeholder="Type here..."
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="Email">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <p className="text-gray-600">
                Enter your valid phone number starting with your country code{" "}
              </p>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Type here..."
                value={user.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="Email">
                Password <span className="text-red-600">*</span>
              </label>
              <p className="text-gray-600">
                Password should be more than 6 digits and contain special
                characters{" "}
              </p>
              <input
                type="text"
                name="password"
                placeholder="Type here..."
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="Email">
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <p className="text-gray-600">
                Password should be more than 6 digits and contain special
                characters{" "}
              </p>
              <input
                type="text"
                name="password"
                placeholder="Type here..."
                value={user.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="Email">
                Account Type <span className="text-red-600">*</span>
              </label>
              <p className="text-gray-600">
                Are you a vendor (have equipments, services, e.t.c to rent out)
                or an organizer (here to view and book rentals and services)
              </p>
              <input
                type="text"
                name="type"
                placeholder="Type here..."
                value={user.type}
                onChange={handleChange}
              />
            </div>
            <button
              className="bg-[#128D7F] hover:bg-[#0B544C] text-white "
              type="submit"
            >SUBMIT</button>
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

export default Register;
