import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../../../styles/forms/form.scss";
import { ApiURL } from '../../../utils/Server';
type Props = {
  closeModal: any
}

const AddEducation = (props: Props) => {
  const [errorMsg, setErrorMsg] = useState("")
  useEffect(() => {
    const year = (new Date()).getFullYear()

    const startYears = document.getElementById("startYear");
    const endYears = document.getElementById("endYear")
    for (let index = year; index >= (year-100); index--) {
      const option = document.createElement("option");
      option.innerHTML = index.toString();
      option.value = index.toString();
      startYears?.appendChild(option);
    }

    for (let index = year; index >= (year-100); index--) {
      const option = document.createElement("option");
      option.innerHTML = index.toString();
      option.value = index.toString();
      endYears?.appendChild(option);
    }

  }, [])

  const handleSaveEducation = () => {
    setErrorMsg("")
    const institute = (document.getElementById("institute") as HTMLInputElement).value
    const degree = (document.getElementById("degree") as HTMLInputElement).value
    const fos = (document.getElementById("fos") as HTMLInputElement).value
    const startMonth = parseInt((document.getElementById("startMonth") as HTMLInputElement).value)
    const startYear = parseInt((document.getElementById("startYear") as HTMLInputElement).value)
    const endMonth = parseInt((document.getElementById("endMonth") as HTMLInputElement).value)
    const endYear = parseInt((document.getElementById("endYear") as HTMLInputElement).value)
    const description = (document.getElementById("description") as HTMLInputElement).value
    const activities = (document.getElementById("activities") as HTMLInputElement).value
    let startDate = undefined
    let endDate = undefined

    if (startMonth != -1 && startYear != -1) {
      startDate = new Date(startYear, startMonth-1, 1)
    }

    if (endMonth != -1 && endYear != -1) {
      endDate = new Date(endYear, endMonth-1, 1)
    }

    if (startDate && endDate) {

      const diff = Math.abs(endDate.getTime() - startDate.getTime());
      if (diff <= 0) {
        setErrorMsg("End date cannot be earlier or equal to start date")
        return
      }
    }
    const axiosConfig = {
      headers: {
          "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios.post(ApiURL("/user/educations/add"), {
      institute: institute,
      degree: degree,
      fieldofstudy: fos,
      start: startDate,
      end: endDate,
      description: description,
      activities: activities
    },axiosConfig)
    .then((response) => {
      console.log(response.data)
      props.closeModal()
    })
    .catch((error) => {
      console.log(error.response.data)
    })
  }
  
  return (
    <div className='input-container w-10'>
        <div className='input-container w-10'>
            <label htmlFor="institute">Institute</label>
            <input type="text" name="institute" id="institute" className='form-input-secondary'/>
        </div>

        <div className='input-container w-10'>
            <label htmlFor="degree">Degree</label>
            <input type="text" name="degree" id="degree" className='form-input-secondary' placeholder="Ex: Bachelor's"/>
        </div>
        
        <div className='input-container w-10'>
          <label htmlFor="fos">Field of Study</label>
          <input type="text" name="fos" id="fos" className='form-input-secondary' placeholder="Ex: Business"/>
        </div>

        <div className='d-flex w-10 align-center'>
          <div className='input-container mr-3 w-4'>
            <label htmlFor="startMonth">Start Month</label>
            <select name="startMonth" id="startMonth" className='form-input-secondary'>
              <option value="-1">Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>

          <div className='input-container mr-3 w-4'>
            <label htmlFor="startYear">Start Year</label>
            <select name="startYear" id="startYear" className='form-input-secondary'>
              <option value="-1">Year</option>
            </select>
          </div>
        </div>

        <div className='d-flex w-10'>
          <div className='input-container mr-3 w-4'>
            <label htmlFor="endMonth">End Month</label>
            <select name="endMonth" id="endMonth" className='form-input-secondary'>
              <option value="-1">Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>

          <div className='input-container mr-3 w-4'>
            <label htmlFor="endYear">End Year</label>
            <select name="endYear" id="endYear" className='form-input-secondary'>
              <option value="-1">Year</option>
            </select>
          </div>
        </div>
        
        <div className='input-container w-10'>
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" cols={10} rows={10} style = {{
            resize: "vertical",
            maxHeight: "75px",
          }}></textarea>
        </div>

        <div className='input-container w-10'>
          <label htmlFor="activities">Activities</label>
          <textarea name="activities" id="activities" cols={10} rows={10} style = {{
            resize: "vertical",
            maxHeight: "75px",
          }}></textarea>
        </div>

        <input type="submit" value="Save" className='btn-primary' onClick={handleSaveEducation}/>
    </div>
  )
}

export default AddEducation