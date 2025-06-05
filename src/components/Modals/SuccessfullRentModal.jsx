import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/16/solid"
import "../../styles/componentStyle/SuccessfullRentModal.css"

const SuccessfullRentModal = () => {

    return<>
        <div className="modalContainer">
            <div className="modalWrapper">
                <p className="closeModal hover:text-red-800"><XMarkIcon/></p>
                <div className="goodMarkIconWrapper">
                    <CheckCircleIcon className="text-[#0B5850]"/>
                </div>
                <h3>Thank you for renting!</h3>
                <p className="text-gray-600">
                    <span>The vendor will contact you through your provided email address or phone number. </span>
                    <span>number. 
                    You can also view your booked items to get the vendor contact details and track your rental.</span>
                </p>
                <div className="modalButtonHolder">
                    <button className="bg-[#0B5850] text-white border-[1px] border-[#0B5850] cursor-pointer hover:bg-[#128D7F] hover:border-[#128D7F]">View My Bookings</button>
                    <button className="border-[1px] border-[#0B5850] cursor-pointer text-[#0B5850] hover:bg-[#128D7F] hover:border-[#128D7F] hover:text-white ">Continue Shopping</button>
                </div>
            </div>

        </div>
    </>

}

export default SuccessfullRentModal