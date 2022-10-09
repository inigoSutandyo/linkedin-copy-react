import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'

import '../../styles/pages/layout.scss'
import { ApiURL } from '../../utils/Server'
import Footer from '../Footer'

type Props = {}

const Jobs = (props: Props) => {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState<Array<Job>>()

  useEffect(() => {
    axios.get(ApiURL("/jobs"))
    .then((response) => {
      console.log(response.data)
      setJobs(response.data.jobs)
    })
    .catch((error) => {
      console.log(error.response)
    })
  }, [])
  
  return (
    <div className='main-page-layout'>
        <Navbar/>
        <div className='d-flex flex-row layout-page main-body'>
            <div className='layout-side'>
              <button className='btn-primary-outline' onClick={() => {
                navigate("/jobs/add")
              }}>Post A New Job</button>
            </div>
            <div className='layout-main'>
              {jobs && jobs.length > 0 ? (
                jobs.map((j) => (
                  <div className='d-flex flex-row justify-between border-bottom-light w-10' key={j.ID}>
                    <div>
                      <h3>{j.title}</h3>
                      <p className='text-subtitle'>{j.company}</p>
                      <p className='text-subtitle'>{j.location}</p>
                    </div>
                  </div>
                ))
              ) : <></>}
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Jobs