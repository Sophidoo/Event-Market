import { ChevronRightIcon, DocumentTextIcon, EyeIcon, EyeSlashIcon, XMarkIcon} from "@heroicons/react/24/outline"
import "../../styles/dashboard/Settings.css"
import { useCallback, useEffect, useRef, useState } from "react"
import { HiOutlineUser } from "react-icons/hi"
import { MdCameraswitch, MdOutlineAccountBalanceWallet, MdOutlineNotifications, MdOutlineSecurity, MdToggleOff, MdToggleOn } from "react-icons/md"

import Webcam from 'react-webcam';
import { IoCameraOutline, IoCameraSharp } from "react-icons/io5"
import { FiCamera } from "react-icons/fi"
import Profile from "../../components/Settings/Profile"
import Security from "../../components/Settings/Security"
import Account from "../../components/Settings/Account"
import Notification from "../../components/Settings/Notification"
import Verification from "../../components/Settings/Verification"

const DashboardSettings = () => {
    const [tab, setTab] = useState("profile")
    

    return<>
        <div className="settingsHeading">
            <h2>Dashboard <ChevronRightIcon/>
            <span className="text-gray-600">Settings</span></h2>
            <p className="text-gray-500">Change your profile and account settings</p>
        </div>

        <div className="settingsWrapper">

            <div className="leftSettingsWrapper">
                <p 
                    className={
                        tab === "profile" || tab === "verification" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                    }
                    onClick={() => setTab("profile")}
                ><HiOutlineUser/> Profile</p>
                <p 
                    className={
                        tab === "security" ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                    }
                    onClick={() => setTab("security")}
                ><MdOutlineSecurity/> Security</p>
                {/* <p 
                    className={
                        tab === "verification" ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                    }
                    onClick={() => setTab("verification")}
                ><VscVerified/> Verification</p> */}
                <p 
                    className={
                        tab === "account" ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                    }
                    onClick={() => setTab("account")}
                ><MdOutlineAccountBalanceWallet/> Account</p>
                {/* <p 
                    className={
                        tab === "notifications" ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                    }
                    onClick={() => setTab("notifications")}
                ><MdOutlineNotifications /> Notifications</p> */}
            </div>

            <div className="rightSettingsWrapper">
                {tab === "profile" && <Profile setTab={setTab} />}
                {tab === "security" && <Security />}
                {tab === "verification" && <Verification />}
                {tab === "account" && <Account />}
                {tab === "notifications" && <Notification />}
            </div>

        </div>

    </>

}

export default DashboardSettings