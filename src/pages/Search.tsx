import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ApiURL } from '../utils/Server'

type Props = {}

const Search = (props: Props) => {
  const {q} = useParams()

  useEffect(() => {
    axios.get(ApiURL("/search"), {
        params: {
            search: q
        }
    })
    .then((response) => {
        console.log(response.data)
    })
    .catch((error) => {
        console.log(error.response)
    })
  }, [])
  

  return (
    <div>
        {q}
    </div>
  )
}

export default Search