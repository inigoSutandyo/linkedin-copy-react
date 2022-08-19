import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Profile from './user/Profile'

type Props = {}

const axiosConfig = {
  withCredentials: true,
}
const Home = (props: Props) => {
  const [user, setUser] = useState(null)

  useEffect(() => {

    const loadUser = async () => {
      axios.get('http://localhost:8080/api/user/profile', axiosConfig)
      .then(function (response) {
        setUser(response.data.user)
        console.log(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response.data);
      })
      .then(function () {
        // always executed
      });
    }
    loadUser()
    // checkAuth()
  }, [])
  
  return (
    <div>
      {user ? <Profile user={user}/> : (
        <p>Empty</p>
      )}
    </div>
  )
}

export default Home