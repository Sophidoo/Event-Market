import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { DocumentTextIcon } from "@heroicons/react/16/solid";
import "../../styles/dashboard/Overview.css";
import Chart from "react-apexcharts";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../AxiosInstance";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

const Overview = () => {
  const [stats, setStats] = useState({
    balance: 0,
    dueToday: [],
    pendingRequests: [],
    revenueGraph: Array(12).fill(0),
    totalBookings: 0,
    currentBookings: 0,
    totalItems: 0,
    percentages: { rentals: 0, services: 0, packages: 0 },
  });
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(Cookies.get("role") || "");

  // Fetch dashboard stats based on role
  const fetchStats = async () => {
    setLoading(true);
    try {
      const endpoint = role === "ADMIN" ? "/dashboard/admin" : "/dashboard/vendor";
      const response = await api.get(endpoint);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      toast.error(error.response?.data?.message || "Failed to fetch dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role) {
      fetchStats();
    }
  }, [role]);

  // Format duration between startDate and endDate
  const formatDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
  };

  // ApexCharts configuration for revenue (area chart)
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
        colors: ["#0B544C"],
      },
      colors: ["#0B544C"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 1,
          gradientToColors: ["#128D7F"],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0,
          stops: [0, 100],
        },
      },
      markers: {
        size: 0,
        colors: ["#79DA11"],
        strokeColors: "#fff",
        strokeWidth: 2,
      },
      xaxis: {
        categories: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
        labels: {
          style: {
            colors: "#52525B",
            fontSize: "11.5px",
            fontFamily: "Inter, sans-serif",
            letterSpacing: "0px",
          },
        },
        crosshairs: {
          show: true,
          stroke: {
            color: "#E4E4E7",
            width: 1,
            dashArray: 0,
          },
        },
        tooltip: { enabled: false },
      },
      dataLabels: { enabled: false },
      yaxis: {
        show: true,
        lines: { show: true },
        labels: {
          formatter: (value) => `₦${value.toLocaleString()}`,
        },
      },
      tooltip: {
        enabled: true,
        style: { fontSize: "10px", fontFamily: undefined, color: "#79DA11" },
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
                  ${names[i]}: ₦${value.toLocaleString()}
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
      grid: { show: true, borderColor: "#F4F4F5" },
      legend: { show: false },
    },
    series: [
      {
        name: "Revenue",
        data: stats.revenueGraph,
      },
    ],
  };

  // ApexCharts configuration for item categories (donut chart)
  const donut = {
    options: {
      chart: { type: "donut", offsetY: 20 },
      colors: ["#0B544C", "#1DC9B5", "#128D7F"],
      labels: ["Rentals", "Services", "Packages"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { offsetY: 0 },
            legend: { position: "bottom" },
          },
        },
      ],
      legend: { show: false },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 4, colors: ["#fff"] },
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
              name: { show: true },
              value: {
                show: false,
                fontSize: "30px",
                fontWeight: 600,
                padding: "0px",
                color: "#18181B",
                offsetY: 10,
                formatter: (val) => `${val}%`,
              },
              total: {
                show: true,
                label: "",
                color: "#18181B",
                formatter: () => `${stats.totalItems}`,
              },
            },
          },
        },
      },
      tooltip: { enabled: true },
      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              pie: {
                donut: {
                  labels: { value: { fontSize: "20px" } },
                },
              },
            },
          },
        },
      ],
    },
    series: [
      stats.percentages.rentals,
      stats.percentages.services,
      stats.percentages.packages,
    ],
  };

  return (
    <div className="overviewContainer">
      <div className="overviewHeader">
        <h1>
          Dashboard <ChevronRightIcon />
          <span className="text-gray-600">Overview</span>
        </h1>
        <div className="overviewHeaderProfile">
          <img src={null} alt="" />
          <div className="overviewHeaderProfileDetails">
            <h4>Sophia Okosodo</h4>
            <p className="text-gray-700">{role || "Vendor"}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <Loading/>
      ) : (
        <>
          <div className="overviewSummaryCardWrapper">
            <div className="balanceCard">
              <p className="text-gray-300">Total Balance</p>
              <div className="balanceCardDetails">
                <h1 className="text-white">
                  ₦{stats.balance.toLocaleString()}
                  <span className="text-green-400">23.2%</span>
                </h1>
                <button className="border-[1px] text-white hover:bg-white hover:text-[#0B544C]">
                  Withdraw Balance
                </button>
              </div>
            </div>

            <div className="overviewSummaryCard border-[1px] border-gray-200">
              <div className="overviewSummaryCardDetails">
                <DocumentTextIcon className="overviewCardIcon bg-gray-200" />
                <div className="overviewSummaryCardInfo">
                  <h4>Total Bookings</h4>
                  <h1>
                    {stats.totalBookings}{" "}
                    <span className="text-green-600">
                      <ChevronDownIcon className="chevronIcon" /> +12 bookings
                    </span>
                  </h1>
                </div>
              </div>
              <span className="text-gray-500">Compared to last month</span>
            </div>

            <div className="overviewSummaryCard border-[1px] border-gray-200">
              <div className="overviewSummaryCardDetails">
                <DocumentTextIcon className="overviewCardIcon bg-gray-200" />
                <div className="overviewSummaryCardInfo">
                  <h4>Currently Booked</h4>
                  <h1>
                    {stats.currentBookings}{" "}
                    <span className="text-green-600">
                      <ChevronDownIcon className="chevronIcon" /> +12 bookings
                    </span>
                  </h1>
                </div>
              </div>
              <span className="text-gray-500">{stats.dueToday.length} booked due today</span>
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
                <Chart options={donut.options} series={donut.series} type="donut" width="100%" />
                <div className="chartTotal">
                  <h1>{stats.totalItems}</h1>
                  <p className="text-gray-600">Total Inventory</p>
                </div>
              </div>
              <div className="donutWrapperDetails">
                <div className="donutWrapperBars">
                  <h3>
                    <span className="bg-[#0B544C]"></span>
                    Rentals
                  </h3>
                  <hr className="border-t-[1px] border-dashed border-gray-400 w-[100%]" />
                  <p>{stats.percentages.rentals.toFixed(1)}%</p>
                </div>
                <div className="donutWrapperBars">
                  <h3>
                    <span className="bg-[#1DC9B5]"></span>
                    Services
                  </h3>
                  <hr className="border-t-[1px] border-dashed border-gray-400 w-[100%]" />
                  <p>{stats.percentages.services.toFixed(1)}%</p>
                </div>
                <div className="donutWrapperBars">
                  <h3>
                    <span className="bg-[#128D7F]"></span>
                    Packages
                  </h3>
                  <hr className="border-t-[1px] border-dashed border-gray-400 w-[100%]" />
                  <p>{stats.percentages.packages.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overviewBookingsWrapper">
            <div className="overviewBookingsTable border-gray-200 border-[1px] bg-white">
              <div className="overviewBookingsHeading">
                <h3>Bookings Due Today</h3>
                <p>{new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
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
                    {stats.dueToday.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-4 text-gray-700">
                          No bookings due today
                        </td>
                      </tr>
                    ) : (
                      stats.dueToday.slice(0, 4).map((booking) => (
                        <tr key={booking.id}>
                          <td>
                            <div>
                              <p>{booking.item?.title || "N/A"}</p>
                              <span>{booking.item?.quantity || 0}pcs</span>
                            </div>
                          </td>
                          <td>
                            <div>
                              <p>{booking.user?.name || "N/A"}</p>
                              <span>{booking.user?.email || "N/A"}</span>
                            </div>
                          </td>
                          <td>{booking.user?.phone || "N/A"}</td>
                          <td>{formatDuration(booking.startDate, booking.endDate)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="overviewBookingsTable border-gray-200 border-[1px] bg-white">
              <div className="overviewBookingsHeading">
                <h3>Pending Booking Requests</h3>
                <NavLink className="text-[#128D7F]" to="/dashboard/bookings">
                  View More
                </NavLink>
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
                    {stats.pendingRequests.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-4 text-gray-700">
                          No pending booking requests
                        </td>
                      </tr>
                    ) : (
                      stats.pendingRequests.slice(0, 4).map((booking) => (
                        <tr key={booking.id}>
                          <td>
                            <div>
                              <p>{booking.item?.title || "N/A"}</p>
                              <span>{booking.item?.quantity || 0}pcs</span>
                            </div>
                          </td>
                          <td>
                            <div>
                              <p>{booking.user?.name || "N/A"}</p>
                              <span>{booking.user?.email || "N/A"}</span>
                            </div>
                          </td>
                          <td>{booking.user?.phone || "N/A"}</td>
                          <td>{formatDuration(booking.startDate, booking.endDate)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;