import { ChevronRightIcon } from "@heroicons/react/24/outline"
import "../../styles/dashboard/Reveiw.css"
import review from "../../assets/images/satisfaction.png"
import { RiDeleteBin6Line } from "react-icons/ri";
import "../../styles/dashboard/Inventory.css"
import { useState } from "react";
import DeleteReviewModal from "../../components/Modals/DeleteReviewModal";

const DashboardReviews = () => {
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const reviews = [
        {
            id: 1,
            productName: "Brown Hat",
            productImage: "https://images.unsplash.com/photo-1595642527925-4d41cb781653", // Hat image
            customerName: "Ananda Harvey",
            customerImage: "https://randomuser.me/api/portraits/women/44.jpg", // Customer avatar
            email: "amanda@site.com",
            review: "Just love it! I bought this hat for my boyfriend, but kept it after a breakup. Fits perfectly!",
            date: "Aug 17, 2020, 5:48",
            status: "Completed",
            category: "Rentals", // Rentals/Services/Packages
            rating: 5, // 1-5 stars
            quantity: 1,
            location: "Lagos, Nigeria"
        },
        {
            id: 2,
            productName: "Calvin Klein T-Shirt",
            productImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27", // T-shirt image
            customerName: "Anne Richard",
            customerImage: "https://randomuser.me/api/portraits/women/68.jpg",
            email: "anne@site.com",
            review: "Really nice. Comfortable and stylish.",
            date: "Aug 04, 2020, 3:17",
            status: "Pending",
            category: "Services", 
            rating: 4,
            quantity: 2,
            location: "Abuja, Nigeria"
        },
        {
            id: 3,
            productName: "Clarks Shoes",
            productImage: "https://images.unsplash.com/photo-1549298916-f52d724204b4", // Shoes image
            customerName: "David Harrison",
            customerImage: "https://randomuser.me/api/portraits/men/32.jpg",
            email: "david@site.com",
            review: "Well-built and comfortable. Great for daily wear.",
            date: "June 18, 2020, 09:19",
            status: "Approved",
            category: "Packages",
            rating: 5,
            quantity: 1,
            location: "Port Harcourt, Nigeria"
        },
        {
            id: 4,
            productName: "Leather Jacket",
            productImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5", // Jacket image
            customerName: "Michael Brown",
            customerImage: "https://randomuser.me/api/portraits/men/75.jpg",
            email: "michael@site.com",
            review: "Premium quality leather. Worth every penny!",
            date: "Sep 12, 2020, 14:22",
            status: "Completed",
            category: "Rentals",
            rating: 5,
            quantity: 1,
            location: "Kano, Nigeria"
        },
        {
            id: 5,
            productName: "Smart Watch",
            productImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", // Watch image
            customerName: "Sarah Johnson",
            customerImage: "https://randomuser.me/api/portraits/women/90.jpg",
            email: "sarah@site.com",
            review: "Sleek design, but battery life could be better.",
            date: "Jul 05, 2020, 10:45",
            status: "Pending",
            category: "Services",
            rating: 3,
            quantity: 1,
            location: "Enugu, Nigeria"
        },
        {
            id: 6,
            productName: "Wireless Earbuds",
            productImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df", // Earbuds image
            customerName: "James Wilson",
            customerImage: "https://randomuser.me/api/portraits/men/46.jpg",
            email: "james@site.com",
            review: "Good sound quality, but connectivity issues occasionally.",
            date: "Oct 30, 2020, 08:33",
            status: "Approved",
            category: "Packages",
            rating: 4,
            quantity: 2,
            location: "Ibadan, Nigeria"
        },
        {
            id: 7,
            productName: "Yoga Mat",
            productImage: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f", // Yoga mat image
            customerName: "Emily Davis",
            customerImage: "https://randomuser.me/api/portraits/women/33.jpg",
            email: "emily@site.com",
            review: "Non-slip and durable. Perfect for my workouts!",
            date: "Nov 15, 2020, 16:12",
            status: "Completed",
            category: "Rentals",
            rating: 5,
            quantity: 1,
            location: "Benin City, Nigeria"
        },
        {
            id: 8,
            productName: "Blender",
            productImage: "https://images.unsplash.com/photo-1563213126-a4273aed2016", // Blender image
            customerName: "Robert Taylor",
            customerImage: "https://randomuser.me/api/portraits/men/88.jpg",
            email: "robert@site.com",
            review: "Powerful motor, but noisy operation.",
            date: "Dec 03, 2020, 11:27",
            status: "Pending",
            category: "Services",
            rating: 3,
            quantity: 1,
            location: "Uyo, Nigeria"
        },
        {
            id: 9,
            productName: "Backpack",
            productImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62", // Backpack image
            customerName: "Olivia Martinez",
            customerImage: "https://randomuser.me/api/portraits/women/29.jpg",
            email: "olivia@site.com",
            review: "Spacious and water-resistant. Highly recommend!",
            date: "Jan 22, 2021, 09:05",
            status: "Approved",
            category: "Packages",
            rating: 5,
            quantity: 1,
            location: "Calabar, Nigeria"
        },
        {
            id: 10,
            productName: "Camera Lens",
            productImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32", // Lens image
            customerName: "Daniel Anderson",
            customerImage: "https://randomuser.me/api/portraits/men/81.jpg",
            email: "daniel@site.com",
            review: "Crystal clear optics. Perfect for professional photography.",
            date: "Feb 14, 2021, 13:50",
            status: "Completed",
            category: "Rentals",
            rating: 5,
            quantity: 1,
            location: "Abeokuta, Nigeria"
        }
    ];

    const StarRating = ({ rating }) => {
        const totalStars = 5;
        return (
            <div className="flex items-center">
            {[...Array(totalStars)].map((_, index) => (
                <svg
                key={index}
                className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
            </div>
        );
        };

    return<>
        {showDeleteModal && (
            <DeleteReviewModal
            onClose={() => setShowDeleteModal(false)}
            onConfirm={() => {
                handleDeleteItem();
                setShowDeleteModal(false);
            }}
            />
        )}
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

        <div className="adminInventoryWrapper">
            <div className="relative overflow-x-auto mt-[-10px]">
                <table className="w-full">
                    <thead className="text-gray-500">
                        <tr className="border-b-[1px] border-gray-200">
                            <th scope="col">
                                <div className="tableHeadingDiv">
                                    <p>Item</p>
                                </div>
                            </th>
                            <th scope="col" className="">
                                Reviewer
                            </th>
                            <th scope="col" className="w-[500px]">
                                Review
                            </th>
                            <th scope="col" className="">
                                Date
                            </th>
                            <th scope="col" className="w-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((el) => (
                            <tr key={el.id} className="bg-white border-b-[1px] border-gray-200">
                                <td scope="row" className="font-medium whitespace-nowrap text-gray-800">
                                    <div className="tableProductDetails">
                                        
                                        <img src={el.productImage} alt="" />
                                        <p>{el.productName} <br/><span className="text-gray-500 text-[11px]">{el.category}</span></p>
                                    </div>
                                </td>
                                <td scope="row" className="font-medium whitespace-nowrap text-gray-800">
                                    <div className="tableProductDetails">
                                        
                                        <img src={el.customerImage} alt="" />
                                        <p>{el.customerName} <br/><span className="text-gray-500 text-[11px]">{el.email}</span></p>
                                    </div>
                                </td>
                                <td scope="row" className="text-gray-500">
                                    <div className=" flex-col items-start">
                                        <StarRating rating={el.rating} />
                                        <p className="mt-[5px]">{el.review}</p>
                                    </div>
                                </td>
                                <td className="text-gray-500 ">{el.date}</td>
                                <td className="text-gray-600 hover:text-red-700 cursor-pointer" onClick={() => setShowDeleteModal(true)}>
                                    <RiDeleteBin6Line className="w-[17px] cursor-pointer"/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="inventoryPagination">
                <p className="text-gray-700">Page 1 of 4</p>

                <div className="inventoryPaginationButtons">
                    <button className="border-[1px] border-gray-300">Previous</button>
                    <button className="border-[1px] border-gray-300">Next</button>
                </div>
            </div>
        </div>
    </>

}

export default DashboardReviews