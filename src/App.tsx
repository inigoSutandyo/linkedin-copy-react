import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgetPassword from './pages/auth/ForgetPassword'
import Profile from './pages/user/Profile'


function App() {  
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path='/profile' element={<Profile/>}/> 
          <Route path='/auth/login' element={<Login/>}/>
          <Route path='/auth/register' element={<Register/>}/>
          <Route path='/auth/forget' element={<ForgetPassword/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
