import { FiX } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
import "../../styles/componentStyle/Modal.css"
import { PiWarningBold } from "react-icons/pi";
import { useEffect, useRef } from "react";

const UnsuspendUserModal = ({ onClose, onConfirm }) => {

    const modalRef = useRef();


    useEffect(() => {
        const handleClickOutside = (event) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [onClose]);

    return <>
        <div className="fixed inset-0 w-full bg-[#344054B2] bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div ref={modalRef} className="deleteModalContainer flex gap-[16px] bg-white rounded-[8px] overflow-hidden " onClick={(e) => e.stopPropagation()}>

            <div className="deleteModalIcon bg-green-100 text-green-700">
                <PiWarningBold />
            </div>
            
            <div className="deleteModalBody">

                <div className="deleteModalBodyDetails">
                    <h2 className="text-gray-900">Lift Suspension from this User</h2>
                    <p className="text-[#1A202C]">Do you want to proceed with removing suspension on this user account?</p>
                </div>

                <div className="flex justify-end space-x-3 bg-gray-50 px-4 py-3 gap-[12px]">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={onConfirm}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Confirm 
                </button>
                </div>
            </div>
            
        </div>
        </div>
    </>;
};

export default UnsuspendUserModal;