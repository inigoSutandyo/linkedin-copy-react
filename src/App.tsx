import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgetPassword from './pages/auth/ForgetPassword'
import Profile from './pages/user/Profile'
import Search from './pages/Search'
import ErrorPage from './pages/ErrorPage'


function App() {  
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path='/profile/:id' element={<Profile/>}/> 
          <Route path='/search/:q' element={<Search/>}/> 
          <Route path='/auth/login' element={<Login/>}/>
          <Route path='/auth/register' element={<Register/>}/>
          <Route path='/auth/forget' element={<ForgetPassword/>}/>

          <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
