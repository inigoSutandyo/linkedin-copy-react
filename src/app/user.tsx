import axios from 'axios';
import { useState, useEffect } from 'react'
import { ApiURL } from '../utils/Server';
import placeholderProfile from "../assets/placeholders/user.png";
import { useAppDispatch, useAppSelector } from './hooks';
import { setLikedPost, setUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { setList } from '../features/user/listSlice';

export const useUser = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        const loadUser = () => {
            const axiosConfig = {
                withCredentials: true,
            };
        
            axios.get(ApiURL("/user/profile"), axiosConfig)
            .then(function (response) {
                console.log(response.data)
                const temp = response.data.user as User;
                if (temp.imageurl == "" || !temp.imageurl) {
                    temp.imageurl = placeholderProfile;
                }
                dispatch(setUser(temp))

                const posts = response.data.likedposts as Array<Number>
                dispatch(setLikedPost(posts))
            })
            .catch(function (error) {
                console.log(error.response);
                navigate('/auth/login')
            })
        };
        loadUser()
    }, [])
    
}

export const useList = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const loadList = () => {
            axios.get(ApiURL("/user/all"))
            .then((response) => {
                console.log(response.data)
                dispatch(setList(response.data.users))
            })
            .catch((error) => {
                console.log(error.response)
            })
        }
        loadList()
      
    }, [])
    
}