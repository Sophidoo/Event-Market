import { ChevronRightIcon } from "@heroicons/react/24/outline"
import "../../styles/dashboard/Reveiw.css"
import review from "../../assets/images/satisfaction.png"

const DashboardReviews = () => {

    return<>
        <div className="dashboardReviewContainer">
            <div className="overviewHeader flex-col">
                <h1>
                    Dashboard <ChevronRightIcon/>
                    <span className="text-gray-600">Reviews</span>
                </h1>
                <p className="text-gray-500 text-[12px] sm:text-[13px]">Keep track and manage reviews made by users.</p>
            </div>
        </div>

        <div className="reviewSummary border-[1px] border-gray-200">
            <div className="leftReviewSummaryContainer">
                <img src={review} alt="" />
                <div className="leftReviewSummary">
                    <h1>4.84</h1>
                    <p className="text-gray-600">- of 7 reviews </p>
                </div>
            </div>

            <div className="rightReviewSummary">
            
                <div className="reviewBarWrap">
                    <small>5 Star</small>
                    <div className="reviewBar">
                        <div className="reviewInnerBar w-[80%]"></div>
                    </div>
                    <small>920</small>
                </div>

                <div className="reviewBarWrap">
                    <small>4 Star</small>
                    <div className="reviewBar">
                        <div className="reviewInnerBar w-[70%]"></div>
                    </div>
                    <small>800</small>
                </div>

                <div className="reviewBarWrap">
                    <small>3 Star</small>
                    <div className="reviewBar">
                        <div className="reviewInnerBar w-[10%]"></div>
                    </div>
                    <small>4</small>
                </div>

                <div className="reviewBarWrap">
                    <small>2 Star</small>
                    <div className="reviewBar">
                        <div className="reviewInnerBar w-[50%]"></div>
                    </div>
                    <small>504</small>
                </div>

                <div className="reviewBarWrap">
                    <small>1 Star</small>
                    <div className="reviewBar">
                        <div className="reviewInnerBar w-[18%]"></div>
                    </div>
                    <small>23</small>
                </div>

            </div>
        </div>
    </>

}

export default DashboardReviews