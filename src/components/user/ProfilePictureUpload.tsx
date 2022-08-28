import axios from 'axios'
import React, { SyntheticEvent, useState } from 'react'
import "../../styles/forms/form.css";
import { ApiURL } from '../../utils/Server';

type Props = {}

const ProfilePictureUpload = (props: Props) => {
  const [file, setFile] = useState<Blob>()
  const [error, setError] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const uploadProfilePicture = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!file) return
    const bodyFormData = new FormData();
    bodyFormData.append("picture", file)
    // console.log(file)
    axios({
        method: "post",
        url: ApiURL("/user/profile/image"),
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
    })
    .then((response) => {
        console.log(response.data)
        // const data = response.data.user.image as Uint8Array
        // const type = response.data.image_type
        // setImageUrl(`data:${type};base64,` + data)
    })
    .catch((error) => {
        console.log(error.response.data)
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