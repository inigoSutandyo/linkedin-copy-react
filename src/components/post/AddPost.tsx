import axios from "axios";
import React, { SyntheticEvent, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addPost } from "../../features/post/postSlice";
import "../../styles/forms/form.scss";
import { ApiURL, CloudinaryURL, HasWhiteSpace } from "../../utils/Server";
import { BsImageFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { BiVideoPlus } from "react-icons/bi";
import Tribute from "tributejs";
import QuillComponent from "./QuillComponent";
import ErrorComponent from "../ErrorComponent";

type User = {
  ID: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};

type Mention = {
  key: string
  value: string
  id: number
}

interface Props {
  user: User;
  closeModal: any;
  handleLoading: any;
}

const AddPost = (props: Props) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const [file, setFile] = useState<Blob>();
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const posts = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  
  const uploadPost = (url: string, publicid: string, filetype: string) => {
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .post(
        ApiURL("/home/post/add"),
        {
          content: value,
          title: "",
          attachment: "",
          likes: 0,
          fileurl: url,
          fileid: publicid,
          filetype: filetype,
        },
        axiosConfig
      )
      .then((response) => {
        console.log(response.data);
        const post = response.data.post as Post;
        dispatch(addPost(post));
        props.closeModal();
      })
      .catch(function (error) {
        console.log(error.response.data);
      })
      .then(()=>{
        props.handleLoading(false)
      });
  };

  const handleAddPost = (e: SyntheticEvent) => {
    console.log(value)
    e.preventDefault();
    setError("")

    if (value.replace(/<(.|\n)*?>/g, "").trim().length < 1 ) {
      setError("Cannot be empty!!")
      return
    };
    console.log("uploading")
    if (file) {
      props.handleLoading(true)
      const bodyFormData = new FormData();
      bodyFormData.append("file", file);
      bodyFormData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_PRESET_UPLOAD
      );
      bodyFormData.append("folder", "posts");
      axios({
        method: "post",
        url: CloudinaryURL(),
        data: bodyFormData,
      })
        .then((response) => {
          const secureUrl = response.data.secure_url;
          const publicId = response.data.public_id;
          uploadPost(secureUrl, publicId, response.data.resource_type);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      uploadPost("", "", "");
    }
  };

  const matchFile = (input: HTMLInputElement, allowedExtensions: RegExp, error: string, type: string) => {  
    setError("")

    if (!allowedExtensions.exec(input.value)) {
      input.value = "";
      setError(error)
      return false;
    }

    if (!input.files) {
      setError("File input is empty...");
      return false;
    }

    const lastIdx = input.files.length - 1;
    setFile(input.files[lastIdx]);
    if (type == 'image') {
      
      setImageUrl(URL.createObjectURL(input.files[lastIdx]));
    } else {
      setVideoUrl(URL.createObjectURL(input.files[lastIdx]))
    }
    return true
  }

  const handleImageUpload = (e: SyntheticEvent) => {
    removeVideo()
    setError("")
    const target = e.target as HTMLInputElement;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    matchFile(target, allowedExtensions, "File type must be JPG/JPEG/PNG", "image")
    console.log(target.files)
  };

  const handleVideoUpload = (e: SyntheticEvent) => {
    removeImage()
    setError("")
    const target = e.target as HTMLInputElement;
    console.log(target)
    const allowedExtensions = /(\.mp4|\.wav)$/i;
    matchFile(target, allowedExtensions, "File type must be WAV/MP4", "video")
    console.log(target.files)
  };

  const removeImage = () => {
    const image = document.getElementById('image') as HTMLInputElement
    image.value = ''
    setImageUrl('')
  }

  const removeVideo = () => {
    const video = document.getElementById('video') as HTMLInputElement
    video.value = ''
    setVideoUrl('')
  }

  const style = {
    overflow: "auto",
    width: "95%",
    height: "128px",
    maxHeight: "250px",
  }

  return (
    <form action="POST" onSubmit={handleAddPost}>
      {error != "" ? (
        <ErrorComponent message={error} />
      ) : <></>}
      <div id="editor-container" className="editor-container quill-editor">
        <QuillComponent setError={setError} setValue={setValue} style={style} id={'ql-editor'}/>
        
      </div>
      <div className="form-preview-image">
        <img
          src={imageUrl}
          alt=""
          style={{
            width: "95%",
            maxHeight: "300px",
          }}
        />
      </div>
      {videoUrl == '' ? <></> : (
        <div className="form-preview-image">
          <video
            style={{
              width: "95%",
              maxHeight: "300px",
            }}
            controls
          >
            <source src={videoUrl}/>
          </video>
        </div>
      )}
   

      <div className="input-container-row">
        <IconContext.Provider
          value={{
            size: "30px",
          }}
        >
          <label htmlFor="image">
            <BsImageFill
              style={{
                cursor: "pointer",
              }}
            />
          </label>
        </IconContext.Provider>
        <IconContext.Provider
          value={{
            size: "40px",
          }}
        >
          <label htmlFor="video">
            <BiVideoPlus
              style={{
                marginLeft: "12px",
                cursor: "pointer",
              }}
            />
          </label>
        </IconContext.Provider>
        <button className="btn-primary" onClick={() => {
          removeVideo()
          removeImage()
          setFile(undefined)
          
        }}>
          Remove Attachments
        </button>
        <input
          type="file"
          name="image"
          id="image"
          style={{
            display: "none",
          }}
          onChange={handleImageUpload}
        />

        <input
          type="file"
          name="video"
          id="video"
          style={{
            display: "none",
          }}
          onChange={handleVideoUpload}
        />
      </div>

      <div className="submit-container justify-end">
        <input
          type="submit"
          value="Post"
          className="btn-primary w-1"
          style={{
            borderRadius: "16px",
          }}
        />
      </div>
    </form>
  );
};

export default AddPost;
