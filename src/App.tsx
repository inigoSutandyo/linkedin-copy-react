import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgetPassword from './pages/auth/ForgetPassword'
import Profile from './pages/user/Profile'
import Search from './pages/Search'


function App() {  
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path='/profile' element={<Profile/>}/> 
          <Route path='/search/:q' element={<Search/>}/> 
          <Route path='/auth/login' element={<Login/>}/>
          <Route path='/auth/register' element={<Register/>}/>
          <Route path='/auth/forget' element={<ForgetPassword/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
