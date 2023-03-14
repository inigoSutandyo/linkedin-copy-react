import axios from "axios";
import React, { SyntheticEvent, useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../components/util/ModalComponent";
import Navbar from "../../components/navbar/Navbar";
import "../../styles/forms/form.scss";
import { ApiURL } from "../../utils/Server";

type Props = {};

const AddJob = (props: Props) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [modal, setModal] = useState(false)

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (title == "" || company == "" || location == "" || description == "") {
        return
    }

    setModal(true)

  };

  const saveJob = () => {
    setModal(false)
    axios.post(ApiURL("/jobs/add"), {
        title: title,
        company: company,
        location: location,
        description: description
    }, {
        withCredentials: true,
    })
    .then((response) => {
        console.log(response.data)
        navigate('/jobs')
    })
    .catch((error) => {
        console.log(error.response.data)
    })
  } 

  return (
    <div id="add-job">
      <Navbar />
      <div className="center-container">
        <h1>Add New Job</h1>
        <div className="input-form">
          <div
            onClick={() => {
              navigate(-1);
            }}
            className="pointer-cursor"
          >
            <IconContext.Provider
              value={{
                size: "25px",
              }}
            >
              <BiArrowBack />
            </IconContext.Provider>
          </div>
          <form action="POST" onSubmit={submit}>
            <div className="input-container" style={{ marginTop: "16px" }}>
              <label htmlFor="title" className="form-label-light">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-input-secondary"
                autoComplete="on"
                onChange={(e: SyntheticEvent) => {
                    const target = e.target as HTMLInputElement
                    setTitle(target.value.trim())
                }}
              />
            </div>

            <div className="input-container">
              <label htmlFor="company" className="form-label-light">
                Company
              </label>
              <input
                type="text"
                name="company"
                id="company"
                className="form-input-secondary"
                autoComplete="on"
                onChange={(e: SyntheticEvent) => {
                    const target = e.target as HTMLInputElement
                    setCompany(target.value.trim())
                }}
              />
            </div>

            <div className="input-container">
              <label htmlFor="location" className="form-label-light">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                className="form-input-secondary"
                autoComplete="on"
                onChange={(e: SyntheticEvent) => {
                    const target = e.target as HTMLInputElement
                    setLocation(target.value.trim())
                }}
              />
            </div>

            <div className="input-container">
              <label htmlFor="description" className="form-label-light">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                cols={25}
                rows={10}
                className="form-input-secondary"
                style={{
                  resize: "vertical",
                }}
                onChange={(e: SyntheticEvent) => {
                    const target = e.target as HTMLInputElement
                    setDescription(target.value.trim())
                }}
              ></textarea>
            </div>

            <div className="input-container">
              <input
                type="submit"
                value="Save"
                className="btn-primary"
                style={{
                  borderRadius: "8px",
                }}
              />
            </div>
          </form>
        </div>
      </div>

      <ModalComponent appElement={"#add-job"} closeModal={() => setModal(false)} contentLabel="Save new job" isOpen={modal} >
        <div className="d-flex flex-column align-center">
            <div>
                <h3>Are you sure you want to post this job?</h3>
            </div>
            <div className='d-flex my-5'>
                <button className='btn-primary mx-2' onClick={saveJob}>Yes</button>
                <button className='btn-primary-outline mx-2' onClick={() => setModal(false)}>No</button>
            </div>    
        </div>
      </ModalComponent>
    </div>
  );
};

export default AddJob;
