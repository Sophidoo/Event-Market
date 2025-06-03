import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router'
import IndexLayout from './Layouts/IndexLayout'
import Home from './Pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return <>
    <Routes>
      <Route path='/' element={<IndexLayout/>}>
      </Route>
      <Route index element={<Home/>}/>
    </Routes> 
  </>
  
}

export default App
