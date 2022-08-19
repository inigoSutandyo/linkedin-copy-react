import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Cookies from "universal-cookie"


export const useIsAuth = () => {
    const [auth, setAuth] = useState(null)

    useEffect(() => {   
        
        const axiosConfig = {
            withCredentials: true,
        }
        axios.get('http://localhost:8080/api/auth/isauth', axiosConfig)
        .then(function (response) {
            setAuth(response.data.status)
        })
        .catch(function (error) {
            // handle error
            console.clear()
            console.log(error.response.data);
            setAuth(error.response.data.status)
        })
        .then(function () {
            // always executed
        });
    }, [])
    

    return auth
}