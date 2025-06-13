import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/16/solid"
import "../../styles/componentStyle/SuccessfullRentModal.css"
import { useNavigate } from "react-router"

const SuccessfullRegisteration = () => {

    const navigate = useNavigate();

    return<>
        <div className="modalContainer">
            <div className="modalWrapper">
                <p className="closeModal hover:text-red-800"><XMarkIcon/></p>
                <div className="goodMarkIconWrapper">
                    <CheckCircleIcon className="text-[#0B5850]"/>
                </div>
                <h3>Thank you for registering with us</h3>
                <p className="text-gray-600">
                    <span>You can now easily explore event rentals and services, connect with trusted vendors, and manage everything event in one place  </span>
                    <span>You will be redirected to the home page shortly. If you are not redirected, Please click the button below</span>
                </p>
                <div className="modalButtonHolder">
                    <button className="bg-[#0B5850] text-white border-[1px] border-[#0B5850] cursor-pointer hover:bg-[#128D7F] hover:border-[#128D7F] w-[100%]"  onClick={() => navigate("/my-bookings")}>Go to home page</button>
                </div>
            </div>

        </div>
    </>

}

export default SuccessfullRegisteration