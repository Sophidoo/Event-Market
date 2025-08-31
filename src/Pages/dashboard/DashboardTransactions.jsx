import { FiDownloadCloud } from "react-icons/fi";
import "../../styles/dashboard/Inventory.css";
import "../../styles/dashboard/Rentals.css";
import { ChevronRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FaCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../AxiosInstance";
import Cookies from "js-cookie";
import Loading from "../../components/Loading";

const DashboardTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false)
  const [pagination, setpagination] = useState(false)
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, page: 1, pageSize: 10, totalPages: 0 });
  const [search, setSearch] = useState("");

  const fetchTransactions = async () => {
    const role = Cookies.get("role");
    if (!Cookies.get("token") || !role) {
      setError("Please login first");
      toast.error("Please login first");
      return;
    }

    setLoading(true);
    try {
      const url =
        role === "ADMIN"
          ? `/transaction/admin/${page}/10`
          : `/transaction/user/${page}/10`;
      const response = await api.get(url);
      setTransactions(response.data.data);
      console.log(response.data)
      setMeta(response.data.meta);
      setpagination(response.data.meta);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch transactions");
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  // Filter transactions based on search term
  useEffect(() => {
    if (!search.trim()) {
      setFilteredTransactions(transactions);
      setMeta({...pagination});
      return;
    }

    const searchTerm = search.toLowerCase();
    const filtered = transactions.filter(
      (txn) =>
        txn.user.name.toLowerCase().includes(searchTerm) ||
        txn.user.email.toLowerCase().includes(searchTerm) ||
        txn.reason.toLowerCase().includes(searchTerm) || 
        txn.transactionId.toLowerCase().includes(searchTerm)
    );

    setFilteredTransactions(filtered);
    setMeta((prev) => ({
      ...prev,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / prev.pageSize),
    }));
    if (page > Math.ceil(filtered.length / meta.pageSize)) {
      setPage(1);
    }
  }, [search, transactions, meta.pageSize, page]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const response = await api.get("/transaction/download");
      setDownloading(false)
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "transactions.csv";
      link.click();
      window.URL.revokeObjectURL(url);
      toast.success("Transactions downloaded successfully");
    } catch (err) {
        setDownloading(false)
      toast.error(err.response?.data?.message || "Failed to download transactions");
    }
  };

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= meta.totalPages) {
      setPage(pageNum);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(meta.totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    buttons.push(
      <button
        key="prev"
        className={`border-[1px] border-gray-300 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
    );

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          className={`border-[1px] border-gray-300 ${1 === page ? "bg-[#0B5850] text-white" : ""}`}
          onClick={() => goToPage(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(<span key="left-ellipsis" className="px-2">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`border-[1px] border-gray-300 ${i === page ? "bg-[#0B5850] text-white" : ""}`}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < meta.totalPages) {
      if (endPage < meta.totalPages - 1) {
        buttons.push(<span key="right-ellipsis" className="px-2">...</span>);
      }
      buttons.push(
        <button
          key={meta.totalPages}
          className={`border-[1px] border-gray-300 ${meta.totalPages === page ? "bg-[#0B5850] text-white" : ""}`}
          onClick={() => goToPage(meta.totalPages)}
        >
          {meta.totalPages}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        className={`border-[1px] border-gray-300 ${page === meta.totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => goToPage(page + 1)}
        disabled={page === meta.totalPages}
      >
        Next
      </button>
    );

    return buttons;
  };

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (error) {
    return <div className="text-center py-10">{error}</div>;
  }

  return (
    <div className="adminInventoryWrapper">
      <div className="adminInventoryHeading">
        <div className="leftInventoryHeading">
          <h2>
            Dashboard <ChevronRightIcon className="h-5 w-5 inline" />{" "}
            <span className="text-gray-600">Transactions</span>
          </h2>
          <p className="text-gray-500">Keep track of transactions made within the app.</p>
        </div>
        <div className="rightInventoryHeading">
          <button
            className={`border-[#0B544C] border-[1px] bg-[#0B544C] text-white hover:bg-green-800 cursor-pointer ${downloading && "opacity-50"}`}
            onClick={handleDownload}
            disabled={downloading}
          >
            <FiDownloadCloud /> {downloading ? "Downloading" : "Download"}
          </button>
        </div>
      </div>

      <div className="inventorySubHeading">
        <div className="inventoryRightSubHeading">
          <form className="text-gray-500 border-[1px] bg-white border-gray-300">
            <MagnifyingGlassIcon className="h-5 w-5" />
            <input
              type="search"
              placeholder="Search by customer, email, or reason..."
              value={search}
              onChange={handleSearch}
            />
          </form>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-[-20px]">
        <table className="w-full">
          <thead className="text-gray-500">
            <tr className="border-b-[1px] border-gray-200">
              <th scope="col">
                <div className="tableHeadingDiv">
                  <p>Txn</p>
                </div>
              </th>
              <th scope="col">Customer</th>
              <th scope="col">Debit</th>
              <th scope="col">Credit</th>
              <th scope="col" className="max-w-[200px] ">
                Reason
              </th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 && search.trim() ? (
              <tr>
                <td colSpan={7} className="text-center py-10">
                  No transactions match your search
                </td>
              </tr>
            ) : (
              filteredTransactions.map((txn) => (
                <tr key={txn.id} className="bg-white border-b-[1px] border-gray-200">
                  <td className="text-gray-500">{txn.transactionId}</td>
                  <td scope="row" className="font-medium whitespace-nowrap text-gray-800">
                    <div className="tableProductDetails">
                      <img
                        src={txn.user?.profile}
                        alt={txn.user.name}
                      />
                      <p>
                        {txn.user.name} <br />
                        <span className="text-gray-500 text-[11px]">{txn.user.email}</span>
                      </p>
                    </div>
                  </td>
                  <td className="text-gray-500">
                    {txn.debit > 0 ? `$${txn.debit.toFixed(2)}` : "-"}
                  </td>
                  <td className="text-gray-500">
                    {txn.credit > 0 ? `$${txn.credit.toFixed(2)}` : "-"}
                  </td>
                  <td className="text-gray-500">{txn.reason}</td>
                  <td className="text-gray-500">
                    <div
                      className={`coloredColumn ${
                        txn.status === "COMPLETED"
                          ? "bg-[#ECFDF3] text-green-600"
                          : txn.status === "PENDING"
                          ? "bg-yellow-50 text-yellow-600"
                          : txn.status === "PROCESSED"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      <FaCircle />
                      {txn.status}
                    </div>
                  </td>
                  <td className="text-gray-500">
                    {new Date(txn.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="inventoryPagination">
        <p className="text-gray-700">
          Page {meta.page} of {meta.totalPages}
        </p>
        <div className="inventoryPaginationButtons">{renderPaginationButtons()}</div>
      </div>
    </div>
  );
};

export default DashboardTransactions;