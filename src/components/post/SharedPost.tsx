import React from "react";
import { useState, useEffect } from "react";
import parse from "html-react-parser";
import "../../styles/components/post.scss";
import PostUser from "./PostUser";
import axios from "axios";
import { ApiURL } from "../../utils/Server";

type Props = {
  post_id: number;
};

const SharedPost = (props: Props) => {
  const [post, setPost] = useState<Post>();
  useEffect(() => {
    axios
      .get(ApiURL("/get/post"), {
        params: {
            id: props.post_id
        }
      })
      .then((response) => {
        setPost(response.data.post);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    console.log(post)
  }, []);

  return (
    <>
      {post ? (
        <div className="post-container message-container">
          <div className="d-flex flex-row align-center justify-between w-10 border-bottom-light">
            <PostUser user={post.user} imageSize="35px" />
          </div>
          <div className="content-container">
            <div className="post-content">{parse(post.content)}</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              margin: "8px",
            }}
          >
            {post.filetype == "image" ? (
              <img
                src={post.fileurl}
                alt=""
                style={{
                  width: "95%",
                  maxWidth: "300px",
                }}
              />
            ) : post.filetype == "video" ? (
              <video
                style={{
                  width: "95%",
                  maxHeight: "300px",
                }}
                controls
                src={post.fileurl}
              ></video>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SharedPost;
