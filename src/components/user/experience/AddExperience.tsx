import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import "../../../styles/forms/form.scss";
import { ApiURL } from "../../../utils/Server";
import ErrorComponent from "../../util/ErrorComponent";

type Props = {
  closeModal: any
};

const AddExperience = (props: Props) => {
  const [errorMsg, setErrorMsg] = useState("")
  const [title, setTitle] = useState("") 
  const [company, setCompany] = useState("")
  const [industry, setIndustry] = useState("")
  const [employment, setEmployment] = useState("")
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
  }, []);

  const handleSaveExperience = () => {
    setErrorMsg("")

    const location = (document.getElementById("location") as HTMLInputElement).value
    const working = (document.getElementById("working") as HTMLInputElement).checked
    const startMonth = parseInt((document.getElementById("startMonth") as HTMLInputElement).value)
    const startYear = parseInt((document.getElementById("startYear") as HTMLInputElement).value)
    const endMonth = parseInt((document.getElementById("endMonth") as HTMLInputElement).value)
    const endYear = parseInt((document.getElementById("endYear") as HTMLInputElement).value)
    const description = (document.getElementById("description") as HTMLInputElement).value
    let startDate = undefined
    let endDate = undefined

    if (title == "") {
      setErrorMsg("Title cannot be empty")
      return
    }
    if (company == "") {
      setErrorMsg("Company cannot be empty")
      return
    }
    if (industry == "") {
      setErrorMsg("Industry cannot be empty")
      return
    }

    if (employment == "-1") {
      setErrorMsg("Employment type must be selected")
      return
    }

    const axiosConfig = {
      headers: {
          "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios.post(ApiURL("/user/experiences/add"), {
      title: title,
      company: company,
      employmenttype: employment,
      location: location,
      industry: industry,
      description: description,
      isworking: working,
      start: startDate,
      end: endDate,
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
    <div className="input-container w-10">
      <div className="input-container w-10">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="form-input-secondary"
          placeholder="Ex: Retail Sales Manager"
          onChange={(e: SyntheticEvent) => {
            const target = e.target as HTMLInputElement 
            setTitle(target.value.trim())
          }}
        />
      </div>

      <div className="input-container w-10">
          <label htmlFor="employment">Employment Type</label>
          <select
            name="employment"
            id="employment"
            className="form-input-secondary"
            onChange={(e: SyntheticEvent) => {
              const target = e.target as HTMLInputElement 
              setEmployment(target.value.trim())
            }}
          >
            <option value="-1">Please Select</option>
            <option value="fulltime">Full-time</option>
            <option value="parttime">Part-time</option>
            <option value="selfemployed">Self-employed</option>
            <option value="freelance">Freelance</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="apprenticeshipe">Apprenticeship</option>
            <option value="seasonal">Seasonal</option>
          </select>
      </div>

      <div className="input-container w-10">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          className="form-input-secondary"
          placeholder="Ex: London"
        />
      </div>

      <div className="d-flex p-1">
        <input type="checkbox" className="input-check" name="working" id="working" />
        <label htmlFor="warning" className="mx-2">I am currently working here.</label>
      </div>

      <div className="input-container w-10">
        <label htmlFor="company">Company Name</label>
        <input
          type="text"
          name="company"
          id="company"
          placeholder="Ex: Microsoft"
          className="form-input-secondary"
          onChange={(e: SyntheticEvent) => {
            const target = e.target as HTMLInputElement 
            setCompany(target.value.trim())
          }}
        ></input>
      </div>

      <div className="d-flex w-10 align-center">
        <div className="input-container mr-3 w-4">
          <label htmlFor="startMonth">Start Month</label>
          <select
            name="startMonth"
            id="startMonth"
            className="form-input-secondary"
          >
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

        <div className="input-container mr-3 w-4">
          <label htmlFor="startYear">Start Year</label>
          <select
            name="startYear"
            id="startYear"
            className="form-input-secondary"
          >
            <option value="-1">Year</option>
          </select>
        </div>
      </div>

      <div className="d-flex w-10">
        <div className="input-container mr-3 w-4">
          <label htmlFor="endMonth">End Month</label>
          <select
            name="endMonth"
            id="endMonth"
            className="form-input-secondary"
          >
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

        <div className="input-container mr-3 w-4">
          <label htmlFor="endYear">End Year</label>
          <select name="endYear" id="endYear" className="form-input-secondary">
            <option value="-1">Year</option>
          </select>
        </div>
      </div>

      <div className="input-container w-10">
        <label htmlFor="industry">Industry</label>
        <input
          type="text"
          name="industry"
          id="industry"
          placeholder="Ex: Retail"
          className="form-input-secondary"
          onChange={(e: SyntheticEvent) => {
            const target = e.target as HTMLInputElement 
            setIndustry(target.value.trim())
          }}
        ></input>
      </div>

      <div className="input-container w-10">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols={10}
          rows={10}
          style={{
            resize: "vertical",
            maxHeight: "75px",
          }}
        ></textarea>
      </div>
      {errorMsg == "" ? <></> : (
        <ErrorComponent message={errorMsg}/>
      )}
      <input
        type="submit"
        value="Save"
        className="btn-primary"
        onClick={handleSaveExperience}
      />
    </div>
  );
};

export default AddExperience;
