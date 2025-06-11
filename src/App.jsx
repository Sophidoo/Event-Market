
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
        <Route path='wishlist' element={<Wishlist/>}/>
      </Route>
      <Route index element={<Home/>}/>
    </Routes> 
  </>
  
}

export default App
