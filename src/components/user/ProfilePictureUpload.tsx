import axios from 'axios'
import React, { SyntheticEvent, useState } from 'react'
import "../../styles/forms/form.css";
import { ApiURL, CloudinaryURL } from '../../utils/Server';

type Props = {}

const ProfilePictureUpload = (props: Props) => {
  const [file, setFile] = useState<Blob>()
  const [error, setError] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const uploadToDatabase = (imageUrl: string) => {

    axios.post(ApiURL("/user/profile/image"), {}, {
        withCredentials: true,
        params: {
            url: imageUrl
        }
    })
    .then((response) => {
        console.log(response.data)
        // window.location.reload()
    })
    .catch((error) => {
        console.log(error.response)
    })
  }
  const uploadProfilePicture = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!file) return
    const bodyFormData = new FormData();
    bodyFormData.append("file", file)
    bodyFormData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_USER_PROFILE)
    bodyFormData.append("folder", "users/profiles")
    
    axios({
        method: "post",
        url: CloudinaryURL(),
        data: bodyFormData,
        // headers: { "Content-Type": "multipart/form-data" },
        // withCredentials: true,
    })
    .then((response) => {
        const secureUrl = response.data.secure_url
        uploadToDatabase(secureUrl)
    })
    .catch((error) => {
        console.log(error)
    })
  }
  return (
    <form action="POST" onSubmit={uploadProfilePicture}>
        <div className='input-container'>
            <input type="file" name="picture" id="picture"  onChange={(event: SyntheticEvent) => {
                const target = event.target as HTMLInputElement;

                const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
         
                if (!allowedExtensions.exec(target.value)) {
                    target.value = ""
                    setError("File type must be JPG/JPEG/PNG")
                    return
                }
                if (!target.files) return
                const lastIdx = target.files.length-1
                setFile(target.files[lastIdx])
                setImageUrl(URL.createObjectURL(target.files[lastIdx]))
            }}/>
        </div>
        <div className='image-preview'>
            {imageUrl != "" ? (
                <img src={imageUrl} alt="" style={{width: "95%"}}/>
            ) : <></>}
        </div>
        <input type="submit" value="Save" className='btn-primary'/>
        <p style={{
            color: "red"
        }}>
            {error}
        </p>
    </form>
  )
}

export default ProfilePictureUpload