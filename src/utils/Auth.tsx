import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { ApiURL } from "./Server";



export const checkSignIn = (target: boolean) => {
    const isSignedIn = useAppSelector((state) => state.user.isSignedIn)
    const user = useAppSelector((state) => state.user.user)
    const navigate = useNavigate()
    console.log(user)
    console.log(isSignedIn)
    if (isSignedIn === target) return

    if (isSignedIn !== target) {
        navigate('/')
    }
    
}


export const checkAuth = () => {
    let isAuth = false
    const axiosConfig = {
        withCredentials: true,
    }
    axios.get(ApiURL("/auth/isauth"), axiosConfig)
    .then(function (response) {
        isAuth = response.data.status
        console.log(response.data)
    })
    .catch(function (error) {
        console.log(error.response.data);
        isAuth = error.response.data.status
    })
    return isAuth
}


export const useAuth = () => { 
    const [auth, setAuth] = useState()

    useEffect(() => {
        axios.get(ApiURL("/auth/isauth"), {
            withCredentials: true
        })
        .then(function (response) {
            console.log(response.data)
            setAuth(response.data.status)
        })
        .catch(function (error) {
            console.log(error.response.data)
            setAuth(error.response.data.status)
        })
    }, [])
    
    console.log(auth)
    return auth
}