import { Routes, Route } from 'react-router'
import IndexLayout from './Layouts/IndexLayout'
import Home from './Pages/Home'
import Rentals from './Pages/Rentals'
import Services from './Pages/Services'
import Packages from './Pages/Packages'
import RentalDetails from './Pages/RentalDetails'
import ServiceDetails from './Pages/ServiceDetails'
import PackageDetails from './Pages/PackageDetails'
import Bookings from './Pages/Bookings'
import Wishlist from './Pages/Wishlist'
import Profile from './Pages/Profile'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import Verify from './Pages/Auth/Verify'
import Forgot from './Pages/Auth/Forgot'
import Overview from './Pages/dashboard/Overview'
import DashboardLayout from './Layouts/DashboardLayout'
import DashboardRentals from './Pages/dashboard/DashboardRentals'
import DashboardServices from './Pages/dashboard/DashboardServices'
import DashboardPackages from './Pages/dashboard/DashboardPackages'
import DashboardBookings from './Pages/dashboard/DashboardBookings'
import DashboardUsers from './Pages/dashboard/DashboardUsers'
import DashboardTransactions from './Pages/dashboard/DashboardTransactions'
import DashboardReviews from './Pages/dashboard/DashboardReviews'
import DashboardRentalDetails from './Pages/dashboard/DashboardRentalDetails'
import DashboardServicesDetails from './Pages/dashboard/DashboardServicesDetails'
import DashboardPackagesDetails from './Pages/dashboard/DashboardPackagesDetails'
import DashboardInventory from './Pages/dashboard/DashboardInventory'
import DashboardSettings from './Pages/dashboard/DashboardSettings'


function App() {

  return <>
    <Routes>
      <Route path='/' element={<IndexLayout/>}>
        <Route path='rentals' element={<Rentals/>}/>
        <Route path='services' element={<Services/>}/>
        <Route path='packages' element={<Packages/>}/>
        <Route path='rental/details/:id' element={<RentalDetails/>}/>
        <Route path='service/details/:id' element={<ServiceDetails/>}/>
        <Route path='package/details/:id' element={<PackageDetails/>}/>
        <Route path='my-bookings' element={<Bookings/>}/>
        <Route path='my-wishlist' element={<Wishlist/>}/>
        <Route path='my-profile' element={<Profile/>}/>
      </Route>


      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/email-verification' element={<Verify/>}/>
      <Route path='/forgot-password' element={<Forgot/>}/>
      <Route index element={<Home/>}/>

      <Route path="dashboard" element={<DashboardLayout/>}>
        <Route index element={<Overview/>}/>
        <Route path='rentals' element={<DashboardRentals/>}/>
        <Route path='rentals/:id' element={<DashboardRentalDetails/>}/>
        <Route path='services' element={<DashboardServices/>}/>
        <Route path='services/:id' element={<DashboardServicesDetails/>}/>
        <Route path='packages' element={<DashboardPackages/>}/>
        <Route path='packages/:id' element={<DashboardPackagesDetails/>}/>
        <Route path='bookings' element={<DashboardBookings/>}/>
        <Route path='users' element={<DashboardUsers/>}/>
        <Route path='transactions' element={<DashboardTransactions/>}/>
        <Route path='reviews' element={<DashboardReviews/>}/>
        <Route path='inventory' element={<DashboardInventory/>}/>
        <Route path='settings' element={<DashboardSettings/>}/>
      </Route>
    </Routes> 
  </>
  
}

export default App
