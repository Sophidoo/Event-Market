import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import "../../styles/dashboard/overview.css";
import { DocumentTextIcon } from "@heroicons/react/16/solid";

const Overview = () => {
    
  return <>
    <div className="overviewContainer">

      <div className="overviewHeader">
        <h1>
          Dashboard <ChevronRightIcon/>
          <span className="text-gray-600">Overview</span>
        </h1>

        <div className="overviewHeaderProfile">
          <img src={null} alt="" />

          <div className="overviewHeaderProfileDetails">
            <h4>Sophia Okosodo</h4>
            <p className="text-gray-700">Vendor</p>
          </div>
        </div>
      </div>


      <div className="overviewSummaryCardWrapper">
        <div className="balanceCard">
          <p className="text-gray-300">Total Balance</p>

          <div className="balanceCardDetails">
            <h1 className="text-white">N420,000,000 <span className="text-green-400">23.2%</span></h1>
            <button className="border-[1px] text-white hover:bg-white hover:text-[#0B544C]">Withdraw Balance</button>
          </div>
        </div>

        <div className="overviewSummaryCard border-[1px] border-gray-200">
          <div className="overviewSummaryCardDetails">
            <DocumentTextIcon className="overviewCardIcon bg-gray-200"/>
            <div className="overviewSummaryCardInfo">
              <h4>Total Bookings</h4>
              <h1>400 <span className="text-green-600"><ChevronDownIcon className="chevronIcon"/> +12 bookings</span></h1>
            </div>
          </div>

          <span className="text-gray-500">Compared to last month</span>
        </div>

        <div className="overviewSummaryCard border-[1px] border-gray-200">
          <div className="overviewSummaryCardDetails">
            <DocumentTextIcon className="overviewCardIcon bg-gray-200"/>
            <div className="overviewSummaryCardInfo">
              <h4>Currently Booked</h4>
              <h1>400 <span className="text-green-600"><ChevronDownIcon className="chevronIcon"/> +12 bookings</span></h1>
            </div>
          </div>

          <span className="text-gray-500">50 booked due today</span>
        </div>
      </div>



    </div>
  </>

}

export default Overview;