
import './App.css'
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
      </Route>
    </Routes> 
  </>
  
}

export default App
