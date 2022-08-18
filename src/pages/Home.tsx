import axios from 'axios'
import React, { useEffect } from 'react'

type Props = {}

const axiosConfig = {
  withCredentials: true,
}
const Home = (props: Props) => {
  useEffect(() => {
    console.log("Hei")
    const loadUser = async () => {
      axios.get('http://localhost:8080/api/user/profile', axiosConfig)
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    }
    loadUser()
  }, [])
  
  return (
    <div>

    </div>
  )
}

export default Home