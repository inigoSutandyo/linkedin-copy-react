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
import { useAppDispatch, useAppSelector } from './app/hooks'
import {useEffect, useState} from 'react'
import { setTheme } from './features/theme/themeSlice'
import { Cookies } from 'react-cookie'


function App() {  
  const [currTheme, setCurrTheme] = useState("light-theme")
  const theme = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch();

  useEffect(() => {
    const c = new Cookies()
    const t = c.get("theme")
    if (t != null) {
      dispatch(setTheme(t))
    }
  }, [])

  useEffect(() => {
    if (theme == "light") {
      setCurrTheme("light-theme")
    } else {
      setCurrTheme("dark-theme")
    }
  }, [theme])
  
  return (
    <div className={currTheme}>
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
    </div>

  )
}

export default App
