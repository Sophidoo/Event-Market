
import './App.css'
import { Routes, Route } from 'react-router'
import IndexLayout from './Layouts/IndexLayout'
import Home from './Pages/Home'
import Rentals from './Pages/Rentals'
import Services from './Pages/Services'
import Packages from './Pages/Packages'


function App() {

  return <>
    <Routes>
      <Route path='/' element={<IndexLayout/>}>
        <Route path='rentals' element={<Rentals/>}/>
        <Route path='services' element={<Services/>}/>
        <Route path='packages' element={<Packages/>}/>
      </Route>
      <Route index element={<Home/>}/>
    </Routes> 
  </>
  
}

export default App
