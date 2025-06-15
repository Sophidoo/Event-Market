import { ChevronRightIcon } from "@heroicons/react/24/outline"
import "../../styles/dashboard/Reveiw.css"

const DashboardReviews = () => {

    return<>
        <div className="dashboardReviewContainer">
            <div className="overviewHeader">
                <h1>
                    Dashboard <ChevronRightIcon/>
                    <span className="text-gray-600">Reviews</span>
                </h1>

                <div className="overviewHeaderProfile">
                    <img src={null} alt="" />

                    <div className="overviewHeaderProfileDetails">
                        <h4>Sophia Okosodo</h4>
                        <p className="text-gray-700">Vendor</p>
                    </div>
                </div>
            </div>

             <hr className="border-t-[1px] border-gray-200"/>
        </div>
    </>

}

export default DashboardReviews