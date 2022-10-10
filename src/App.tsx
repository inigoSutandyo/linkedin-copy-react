import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgetPassword from './pages/auth/ForgetPassword'
import Profile from './pages/user/Profile'
import Search from './pages/Search'
import ErrorPage from './pages/ErrorPage'
import Connection from './pages/user/Connection'
import Notification from './pages/Notification'
import Jobs from './pages/job/Jobs'
import AddJob from './pages/job/AddJob'
import Message from './pages/message/Message'
import ResetPassword from './pages/auth/ResetPassword'
import VerifPage from './pages/VerifPage'


function App() {  
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path='/profile/:id' element={<Profile/>}/> 
          <Route path='/reset/:token' element={<ResetPassword/>}/> 
          <Route path='/verification/:token' element={<VerifPage/>}/> 
          <Route path='/connection' element={<Connection/>}/> 
          <Route path='/search/:q' element={<Search/>}/> 
          <Route path='/notifications' element={<Notification/>}/> 
          <Route path='/message' element={<Message/>}/> 
          <Route path='/jobs' element={<Jobs/>}/> 
          <Route path='/jobs/add' element={<AddJob/>}/> 
          <Route path='/auth/login' element={<Login/>}/>
          <Route path='/auth/register' element={<Register/>}/>
          <Route path='/auth/forget' element={<ForgetPassword/>}/>
          
          <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
