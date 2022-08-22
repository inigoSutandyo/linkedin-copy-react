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
    const navigate = useNavigate()
    const axiosConfig = {
        withCredentials: true,
    }
    axios.get(ApiURL("/auth/isauth"), axiosConfig)
    .then(function (response) {
        if (response.data.status === true) {
            navigate('/')
        }
    })
    .catch(function (error) {
        // handle error
        console.clear()
        console.log(error.response.data);
        if (error.response.data.status === true) {
            navigate('/')
        }
    })
    .then(function () {
        // always executed
    });
}
