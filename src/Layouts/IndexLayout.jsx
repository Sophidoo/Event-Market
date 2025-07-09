import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"


const IndexLayout = () => {

    return<>
        <Navbar/>

        <main className="indexPagesMain bg-white min-h-[89vh]">
            <Outlet/>
        </main>

        <Footer/>

    </>

}

export default IndexLayout