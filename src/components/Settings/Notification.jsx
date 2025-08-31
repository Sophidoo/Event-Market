import { useState } from "react"
import { MdToggleOff, MdToggleOn } from "react-icons/md"


const Notification = () => {
    const [notifications, setNotifications] = useState({
        email: false,
        sms: false
    })

    return <>
        <form>
            <div className="settingsSectionHeading mb-[-10px]">
                <h2>Notifications</h2>
                <p className="text-gray-500">Once enabled you'll receive relevant notifications within your selected choice</p>
            </div>

            <hr className="border-[1px] border-gray-200 bg-gray-200"/>
            
            <section className="mt-[-25px] settingsNotification">
                <label>
                    {
                        notifications.email ?
                        <MdToggleOn 
                            className="invert-0 text-green-700"
                            onClick={() => setNotifications(prev => ({
                                ...prev,
                                email: false
                            }))}
                        /> :
                        <MdToggleOff 
                            className="text-gray-300"
                            onClick={() => setNotifications(prev => ({
                                ...prev,
                                email: true
                            }))}
                        />
                    }
                    Email 
                </label>
                <label>
                    {
                        notifications.sms ?
                        <MdToggleOn 
                            className="invert-0 text-green-700"
                            onClick={() => setNotifications(prev => ({
                                ...prev,
                                email: false
                            }))}
                        /> :
                        <MdToggleOff 
                            className="text-gray-300"
                            onClick={() => setNotifications(prev => ({
                                ...prev,
                                email: true
                            }))}
                        />
                    }
                    Sms
                </label>
            </section>

        </form>
    </>

}

export default Notification