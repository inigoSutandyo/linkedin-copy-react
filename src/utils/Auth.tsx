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
    })
    .catch(function (error) {
        console.log(error.response.data);
        isAuth = error.response.data.status
    })
    .then(function () {
        // always executed
    });
    return isAuth
}
