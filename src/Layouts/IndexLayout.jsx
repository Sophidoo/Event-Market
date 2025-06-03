import { Outlet } from "react-router"
import Navbar from "../components/Navbar"


const IndexLayout = () => {

    return<>
        <Navbar/>

        <main className="bg-white">
            <Outlet/>
        </main>

    </>

}

export default IndexLayout