import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import "../../styles/dashboard/Overview.css";
import { DocumentTextIcon } from "@heroicons/react/16/solid";
import Chart from "react-apexcharts";
import { NavLink } from "react-router-dom";

const Overview = () => {

  const area = {
    options: {
      chart: {
        type: "area",
        stacked: true,
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      stroke: {
        curve: "smooth",
        width: 2,
        colors: ["#0B544C"], // Outline color for both series
      },
      colors: ["#0B544C"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical", // vertical gradient for area chart
          shadeIntensity: 1,
          gradientToColors: ["#128D7F"], // ending color
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0,
          stops: [0, 100]
        }// Fill colors for stacked series
      },
      markers: {
        size: 0,
        colors: ["#79DA11"],
        strokeColors: "#fff",
        strokeWidth: 2,
      },
      xaxis: {
        categories: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ], // Example X values
        labels: {
          style: {
            colors: "#52525B",
            fontSize: "11.5px",
            fontFamily: "Inter, sans-serif",
            leterSpacing: "0px", // Optional: x-axis label color
          },
        },
        crosshairs: {
          show: true,
          stroke: {
            color: "#E4E4E7",
            width: 1,
            dashArray: 0, // ✅ solid line
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        show: true, // Hide Y-axis
        lines: {
          show: true,
        },
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: "10px", // optional font size
          fontFamily: undefined, // optional font family
          color: "#79DA11", // background color
        },
        custom: ({ series, dataPointIndex, w }) => {
          const names = w.globals.seriesNames;
          const tooltips = series
            .map((s, i) => {
              const value = s[dataPointIndex];
              return `
                        <div style="
                          margin-bottom: 4px;
                          color: #71717A;
                          font-size: 12px;
                          font-family: 'Plus Jakarta Sans', sans-serif;
                        ">
                          ${names[i]}: ${value}
                        </div>
                      `;
            })
            .join("");

          return `
                      <div style="
                        background: #fff;
                        padding: 8px 13px;
                        border: 2px solid #ffffff;
                        border-radius: 4px;
                        width: max-content;
                        box-shadow: 0 2px 6px rgba(0,0,0,0.08);
                        position: relative;
                      ">
                        ${tooltips}
                        <div style="
                          position: absolute;
                          bottom: -6px;
                          left: 50%;
                          transform: translateX(-50%);
                          width: 0;
                          height: 0;
                          border-left: 6px solid transparent;
                          border-right: 6px solid transparent;
                          border-top: 6px solid white;
                        "></div>
                      </div>
                    `;
        },
      },
      grid: {
        show: true,
        borderColor: "#F4F4F5", // Optional: hide grid lines
      },
      legend: {
        show: false, // Optional: hide legend
      },
    },
    series: [
      {
        name: "Series 1",
        data: [10, 20, 15, 30, 25, 40, 5, 10, 10, 15, 10, 20],
      }
    ],
  };
  const donut = {
    options: {
      chart: {
        type: "donut",
        offsetY: 20, // push chart up to visually center it in semi mode
      },
      colors: ["#0B544C", "#1DC9B5", "#128D7F"],
      labels: ["Rentals", "Services", "Packages"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              offsetY: 0, // reset offset for smaller screens
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 4, // spacing between segments
        colors: ['#fff'], // or match your background color
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10,
          expandOnClick: false,
          donut: {
            size: "65%",
            labels: {
              show: true,
              name: {
                show: true,
              },
              value: {
                show: false,
                fontSize: "30px",
                fontWeight: 600,
                padding: "0px",
                color: "#18181B",
                offsetY: 10,
                formatter: function (val) {
                  return `${val}%`;
                },
              },
              total: {
                show: true,
                label: '',
                color: '#18181B',
                formatter: function (w) {
                  return `${w.globals.series[0]}%`;
                },
              },
            },
          },
        },
      },
      tooltip: {
        enabled: true,
      },
      responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  value: {
                    fontSize: "20px",
                  },
                },
              },
            },
          },
        },
      },
    ],
    },
    series: [42.2, 27.8, 30],
  };
    
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


      <div className="overviewChartWrapper">
        <div className="revenueWrapper border-gray-200 border-[1px] bg-white">
          <h2>Revenue</h2>

           <div className="revenueChartScroll">
              <div className="revenueChart">
                <Chart
                  options={area.options}
                  series={area.series}
                  type="area"
                  height={250}
                  width="100%"
                />

                
              </div>
            </div>
        </div>

        <div className="donutWrapper border-gray-200 border-[1px] bg-white">

          <div className="donutChart">
            <Chart
              options={donut.options}
              series={donut.series}
              type="donut"
              width="100%"
            />
            <div className="chartTotal">
                  <h1>459</h1>
                  <p className="text-gray-600">Total Inventory</p>
                </div>
          </div>

          <div className="donutWrapperDetails">

            <div className="donutWrapperBars">
              <h3>
                <span className="bg-[#0B544C]"></span>
                Rentals
              </h3>
              <hr className="border-t-[1px] border-dashed border-gray-400 w-[100%]"/>
              <p>30%</p>
            </div>

            <div className="donutWrapperBars">
              <h3>
                <span className="bg-[#1DC9B5]"></span>
                Services
              </h3>
              <hr className="border-t-[1px] border-dashed border-gray-400 w-[100%]"/>
              <p>50%</p>
            </div>

            <div className="donutWrapperBars">
              <h3>
                <span className="bg-[#128D7F]"></span>
                Packages
              </h3>
              <hr className="border-t-[1px] border-dashed border-gray-400 w-[100%]"/>
              <p>15%</p>
            </div>

          </div>
        </div>
      </div>

      <div className="overviewBookingsWrapper">
        
        <div className="overviewBookingsTable  border-gray-200 border-[1px] bg-white">
          <div className="overviewBookingsHeading">
            <h3>Bookings Due Today</h3>
            <p>23rd May, 2025</p>
          </div>

          <div className="overviewTableScroll overflow-x-auto">
            <table>
              <thead className="bg-[#E5F3F1]">
                <th>Item</th>
                <th>Client</th>
                <th>Client Phone</th>
                <th>Duration</th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>
                      <p>Banquet Chairs</p>
                      <span>500pcs</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p>Mary Celestia</p>
                      <span>sophieokosodo@gmail.com</span>
                    </div>
                  </td>
                  <td>08033099087</td>
                  <td>5 days</td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <p>Banquet Chairs</p>
                      <span>500pcs</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p>Mary Celestia</p>
                      <span>sophieokosodo@gmail.com</span>
                    </div>
                  </td>
                  <td>08033099087</td>
                  <td>5 days</td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <p>Banquet Chairs</p>
                      <span>500pcs</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p>Mary Celestia</p>
                      <span>sophieokosodo@gmail.com</span>
                    </div>
                  </td>
                  <td>08033099087</td>
                  <td>5 days</td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <p>Banquet Chairs</p>
                      <span>500pcs</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p>Mary Celestia</p>
                      <span>sophieokosodo@gmail.com</span>
                    </div>
                  </td>
                  <td>08033099087</td>
                  <td>5 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="overviewBookingsTable  border-gray-200 border-[1px] bg-white">
          <div className="overviewBookingsHeading">
            <h3>Bookings Due Today</h3>
            <NavLink className="text-[#128D7F]">View More</NavLink>
          </div>

          <div className="overviewTableScroll overflow-x-auto">
            <table>
            <thead className="bg-[#E5F3F1]">
              <th>Item</th>
              <th>Client</th>
              <th>Client Phone</th>
              <th>Duration</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                    <p>Banquet Chairs</p>
                    <span>500pcs</span>
                  </div>
                </td>
                <td>
                  <div>
                    <p>Mary Celestia</p>
                    <span>sophieokosodo@gmail.com</span>
                  </div>
                </td>
                <td>08033099087</td>
                <td>5 days</td>
              </tr>
              <tr>
                <td>
                  <div>
                    <p>Banquet Chairs</p>
                    <span>500pcs</span>
                  </div>
                </td>
                <td>
                  <div>
                    <p>Mary Celestia</p>
                    <span>sophieokosodo@gmail.com</span>
                  </div>
                </td>
                <td>08033099087</td>
                <td>5 days</td>
              </tr>
              <tr>
                <td>
                  <div>
                    <p>Banquet Chairs</p>
                    <span>500pcs</span>
                  </div>
                </td>
                <td>
                  <div>
                    <p>Mary Celestia</p>
                    <span>sophieokosodo@gmail.com</span>
                  </div>
                </td>
                <td>08033099087</td>
                <td>5 days</td>
              </tr>
              <tr>
                <td>
                  <div>
                    <p>Banquet Chairs</p>
                    <span>500pcs</span>
                  </div>
                </td>
                <td>
                  <div>
                    <p>Mary Celestia</p>
                    <span>sophieokosodo@gmail.com</span>
                  </div>
                </td>
                <td>08033099087</td>
                <td>5 days</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>

    </div>
  </>

}

export default Overview;