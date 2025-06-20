import { Outlet } from "react-router"
import Sidebar from "../components/Sidebar"


const DashboardLayout = () => {

    return<>
        <Sidebar/>

        <main className="dashboardMain bg-gray-50">
            <Outlet/>
        </main>
    </>

}

export default DashboardLayout