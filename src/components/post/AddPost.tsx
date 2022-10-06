import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addPost } from "../../features/post/postSlice";
import "../../styles/forms/form.scss";
import { ApiURL, CloudinaryURL } from "../../utils/Server";
import { BsImageFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { BiVideoPlus } from "react-icons/bi";
import { stringify } from "querystring";

type User = {
  ID: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};

interface Props {
  user: User;
  closeModal: any;
}

const AddPost = (props: Props) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState<Blob>();
  const [imageUrl, setImageUrl] = useState("");

  const posts = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  function handleChange(content: any, delta: any, source: any, editor: any) {
    if (editor.getLength() > 255) {
      setError("Length of post exceeded limit of 255 characters");
    } else {
      setError("");
    }
    // console.log(content)
    setValue(content);
  }

  const uploadPost = (url: string, publicid: string) => {
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
      });
  };

  const handleAddPost = (e: SyntheticEvent) => {
    e.preventDefault();
    if (error !== "") return;
    if (value.replace(/<(.|\n)*?>/g, "").trim().length < 1 && !file) return;

    if (file) {
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
          uploadPost(secureUrl, publicId);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      uploadPost("", "");
    }
  };

  const handleImageUpload = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    setError("");
    if (!allowedExtensions.exec(target.value)) {
      target.value = "";
      setError("File type must be JPG/JPEG/PNG");
      return;
    }
    if (!target.files) {
      return;
    }

    const lastIdx = target.files.length - 1;
    setFile(target.files[lastIdx]);
    setImageUrl(URL.createObjectURL(target.files[lastIdx]));
  };

  const handleVideoUpload = () => {};

  return (
    <form action="POST" onSubmit={handleAddPost}>
      <div id="editor-container" className="editor-container">
        <ReactQuill
          id="quill"
          theme="bubble"
          value={value}
          onChange={handleChange}
          bounds={"#editor-container"}
          style={{
            overflow: "auto",
            width: "95%",
            height: "128px",
            maxHeight: "250px",
          }}
          placeholder={"What are you thinking about?"}
        />
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
          onClick={handleVideoUpload}
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
      <div style={{ color: "red" }}>{error}</div>
    </form>
  );
};

export default AddPost;
