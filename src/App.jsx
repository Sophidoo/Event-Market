
import './App.css'
import { Routes, Route } from 'react-router'
import IndexLayout from './Layouts/IndexLayout'
import Home from './Pages/Home'


function App() {

  return <>
    <Routes>
      <Route path='/' element={<IndexLayout/>}>
      </Route>
      <Route index element={<Home/>}/>
    </Routes> 
  </>
  
}

export default App
