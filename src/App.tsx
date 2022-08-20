import { useState } from 'react'
import reactLogo from './assets/react.svg'

import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgetPassword from './pages/auth/ForgetPassword'


function App() {  
  return (
    <div className='full-screen bg-primary'>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/auth/login' element={<Login/>}/>
            <Route path='/auth/register' element={<Register/>}/>
            <Route path='/auth/forget' element={<ForgetPassword/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
