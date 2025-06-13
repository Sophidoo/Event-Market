import { Outlet } from "react-router"
import Sidebar from "../components/Sidebar"


const DashboardLayout = () => {

    return<>
        <Sidebar/>

        <main className="dashboardMain bg-[#f6f6f6]">
            <Outlet/>
        </main>
    </>

}

export default DashboardLayout