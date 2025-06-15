import { Outlet } from "react-router"
import Sidebar from "../components/Sidebar"


const DashboardLayout = () => {

    return<>
        <Sidebar/>

        <main className="dashboardMain bg-white">
            <Outlet/>
        </main>
    </>

}

export default DashboardLayout