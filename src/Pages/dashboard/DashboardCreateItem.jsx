import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { FiDownloadCloud } from "react-icons/fi"


const DashboardCreateItem = () => {

    return<>
        <div className="adminInventoryWrapper ">
            <div className="adminInventoryHeading">
                <div className="leftInventoryHeading">
                    <h2>Dashboard <ChevronRightIcon/>
                    Inventory<ChevronRightIcon/>  <span className="text-gray-600">Add Item</span></h2>
                    <p className="text-gray-500">Use the form below to add a rental, service or package to your inventory.</p>
                </div>
            </div>

        </div>
            
            

    </>

}

export default DashboardCreateItem