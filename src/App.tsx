import { useState } from 'react'
import reactLogo from './assets/react.svg'

import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'


function App() {


  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth/login' element={<Login/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
