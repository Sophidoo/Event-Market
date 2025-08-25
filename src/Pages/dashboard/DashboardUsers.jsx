import { FiDownloadCloud } from "react-icons/fi";
import "../../styles/dashboard/Inventory.css";
import "../../styles/dashboard/Rentals.css";
import { ChevronRightIcon, MagnifyingGlassIcon, UserMinusIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { FaCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import SuspendUserModal from "../../components/Modals/SuspendUserModal";
import UnsuspendUserModal from "../../components/Modals/UnsuspendUserModal";
import api from "../../AxiosInstance"; // Import the axios instance
import { toast } from "react-toastify";

const DashboardUsers = () => {
  const [checkedRows, setCheckedRows] = useState({});
  const [tab, setTab] = useState("Users");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLiftModal, setShowLiftModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); // Track selected user
  const [users, setUsers] = useState([]); // State for fetched users
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [page, setPage] = useState(1); // Current page
  const [pageSize] = useState(10); // Users per page
  const [totalPages, setTotalPages] = useState(1); // Total pages from API
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to toggle row check
  const toggleRowCheck = (rowId) => {
    setCheckedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  // Fetch users from API
  const fetchUsers = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await api.get(`/auth/users/${pageNumber}/${pageSize}`);
      const { data, meta } = response.data;
      console.log("API Response:", response.data); // For debugging
      setUsers(
        data.map((user) => ({
          id: user.id,
          user: user.name || "N/A", // Fallback for name
          accountType: user.role.toLowerCase(),
          email: user.email,
          phone: user.phone || "N/A",
          address: user.address || "N/A",
          accountStatus: user.suspended ? "suspended" : user.verified ? "active" : "pending",
          verified: user.verified, // Add verified field
          suspended: user.suspended, // Add suspended field
          joined: new Date(user.createdAt).toISOString().split("T")[0], // Format date
          imageUrl: user.profile || "https://randomuser.me/api/portraits/lego/1.jpg", // Fallback image
        }))
      );
      setTotalPages(meta.totalPages);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle suspend user
  const handleSuspendUser = async () => {
    if (!selectedUserId) {
      toast.error("No user selected for suspension.");
      return;
    }
    try {
      await api.patch(`/auth/suspend`, {}, { headers: { "X-User-Id": selectedUserId } });
      toast.success("User has been suspended successfully.", { autoClose: 2000 });
      setTimeout(() => {
        fetchUsers(page).catch((err) => {
          setError("Failed to refresh user list. Please try again.");
          console.error("Refresh error:", err);
        });
      }, 2000);
      setSelectedUserId(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to suspend user. Please try again.";
      toast.error(errorMessage);
      setError(errorMessage);
      console.error("Suspend error:", err);
    }
  };

  // Handle lift suspension
  const handleLiftSuspension = async () => {
    if (!selectedUserId) {
      toast.error("No user selected for lifting suspension.");
      return;
    }
    try {
      await api.patch(`/auth/liftSuspension`, {}, { headers: { "X-User-Id": selectedUserId } });
      toast.success("User suspension has been lifted successfully.", { autoClose: 2000 });
      setTimeout(() => {
        fetchUsers(page).catch((err) => {
          setError("Failed to refresh user list. Please try again.");
          console.error("Refresh error:", err);
        });
      }, 2000);
      setSelectedUserId(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to lift user suspension. Please try again.";
      toast.error(errorMessage);
      setError(errorMessage);
      console.error("Lift suspension error:", err);
    }
  };

  // Handle clicking the suspend/lift suspension icon
  const handleActionClick = (userId, suspended) => {
    setSelectedUserId(userId);
    if (suspended) {
      setShowLiftModal(true); // Show UnsuspendUserModal for suspended users
    } else {
      setShowDeleteModal(true); // Show SuspendUserModal for non-suspended users
    }
  };

  // Handle tab click
  const handleTabClick = (tabName) => {
    setTab(tabName);
    setPage(1); // Reset to page 1 when changing tabs
    setSearchQuery(""); // Clear search query when changing tabs
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to page 1 when searching
  };

  // Filter users based on tab and search query
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return  matchesSearch;
  });

  // Handle pagination
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  // Fetch users on component mount and page change
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <>
      {showDeleteModal && (
        <SuspendUserModal
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedUserId(null);
          }}
          onConfirm={() => {
            handleSuspendUser();
            setShowDeleteModal(false);
          }}
        />
      )}
      {showLiftModal && (
        <UnsuspendUserModal
          onClose={() => {
            setShowLiftModal(false);
            setSelectedUserId(null);
          }}
          onConfirm={() => {
            handleLiftSuspension();
            setShowLiftModal(false);
          }}
        />
      )}
      <div className="adminInventoryWrapper">
        <div className="adminInventoryHeading">
          <div className="leftInventoryHeading">
            <h2>
              Dashboard <ChevronRightIcon />
              <span className="text-gray-600">Users</span>
            </h2>
            <p className="text-gray-500">Keep track of users and manage users.</p>
          </div>
          <div className="rightInventoryHeading">
            <button className="border-[#0B544C] border-[1px] bg-[#0B544C] text-white hover:bg-green-800">
              <FiDownloadCloud /> Download
            </button>
          </div>
        </div>

        <div className="inventorySubHeading">
          <div className="inventoryRightSubHeading">
            <form
              className="text-gray-500 border-[1px] bg-white border-gray-300 flex items-center"
              onSubmit={(e) => e.preventDefault()}
            >
              <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
              <input
                type="search"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={handleSearchChange}
                className="outline-none"
              />
            </form>
          </div>
        </div>

        {loading && <p>Loading users...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          <div className="relative overflow-x-auto mt-[-20px]">
            <table className="w-full">
              <thead className="text-gray-500">
                <tr className="border-b-[1px] border-gray-200">
                  <th scope="col">
                    <div className="tableHeadingDiv">
                      <p>User</p>
                    </div>
                  </th>
                  <th scope="col">Address</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Status</th>
                  <th scope="col">Joined</th>
                  <th scope="col" className="w-1"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="bg-white border-b-[1px] border-gray-200">
                    <td scope="row" className="font-medium whitespace-nowrap text-gray-800">
                      <div className="tableProductDetails">
                        <img src={user.imageUrl} alt="" />
                        <p>
                          {user.user} <br />
                          <span className="text-gray-500 text-[11px]">{user.accountType}</span>
                        </p>
                      </div>
                    </td>
                    <td className="text-gray-500">{user.address}</td>
                    <td className="text-gray-500">{user.email}</td>
                    <td className="text-gray-500">{user.phone}</td>
                    <td className="text-gray-500">
                      <div
                        className={`coloredColumn ${
                          user.suspended
                            ? "bg-red-100 text-red-600"
                            : user.verified
                            ? "bg-[#ECFDF3] text-green-600"
                            : "bg-yellow-50 text-yellow-600"
                        }`}
                      >
                        <FaCircle />
                        {user.suspended ? "Suspended" : user.verified ? "Verified" : "Pending"}
                      </div>
                    </td>
                    <td className="text-gray-500">{user.joined}</td>
                    <td
                      className="text-gray-600 hover:text-red-700 cursor-pointer"
                      onClick={() => handleActionClick(user.id, user.suspended)}
                    >
                      {user.suspended ? (
                        <UserPlusIcon className="w-[17px] cursor-pointer" />
                      ) : (
                        <UserMinusIcon className="w-[17px] cursor-pointer" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <p className="text-gray-500 text-center mt-4">No users found.</p>
            )}
          </div>
        )}

        <div className="inventoryPagination">
          <p className="text-gray-700">
            Page {page} of {totalPages}
          </p>
          <div className="inventoryPaginationButtons">
            <button
              className="border-[1px] border-gray-300"
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className="border-[1px] border-gray-300"
              onClick={handleNextPage}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardUsers;