import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router'
import IndexLayout from './Layouts/IndexLayout'

function App() {
  const [count, setCount] = useState(0)

  return <>
    <Routes>
      <Route path='/' element={<IndexLayout/>}>

      </Route>
    </Routes> 
  </>
  
}

export default App
