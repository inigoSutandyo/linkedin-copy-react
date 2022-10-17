import axios from "axios";
import { error } from "console";
import React, { useState, useEffect, useRef, SyntheticEvent } from "react";
import { IconContext } from "react-icons";
import { FiSend } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ApiURL, CloudinaryURL } from "../../utils/Server";
import MyMessage from "./MyMessage";
import OtherMessage from "./OtherMessage";

import "../../styles/components/chat.scss";
import { connect, sendMsg, useSocket } from "../../app/socket";
import {
  appendMessage,
  setMessages,
} from "../../features/message/messageSlice";
import UserSmallComponent from "../user/UserSmallComponent";
import { BsImageFill } from "react-icons/bs";

type Props = {
  chat: Chats;
};

const Chat = (props: Props) => {
  const user = useAppSelector((state) => state.user.user);
  const messages = useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [other, setOther] = useState<User>();
  const [file, setFile] = useState<Blob>();
  const [imageUrl, setImageUrl] = useState("");
  const socket = useSocket(props.chat.ID, user.ID);

  useEffect(() => {
    props.chat.users.forEach((u) => {
      if (u.ID != user.ID) {
        setOther(u);
      }
    });
  }, [props]);

  const handleSocket = () => {
    if (!socket) return;
    socket.onmessage = (message) => {
      dispatch(appendMessage(JSON.parse(message.data)));
    };
  };

  useEffect(() => {
    axios
      .get(ApiURL("/message"), {
        params: {
          id: props.chat.ID,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(setMessages(response.data.messages));
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [props.chat]);

  useEffect(() => {
    if (socket) {
      // connect(socket)
      handleSocket();
    }
  }, [socket]);

  const send = () => {
    const target = document.getElementById("chat") as HTMLInputElement;

    if (!target.value || target.value.trim() == "") {
      return;
    }
    console.log(target.value);
    if (socket) {
      sendMsg(target.value, socket);
    }

    target.value = "";
  };
  const scrollToBottom = () => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log(messages);
    scrollToBottom();
  }, [messages]);

  const sendImage = (url: string) => {
    axios
      .post(
        ApiURL("/chat/image"),
        {
          fileurl: url,
        },
        {
          withCredentials: true,
          params: {
            chat_id: props.chat.ID,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const matchFile = (
    input: HTMLInputElement,
    allowedExtensions: RegExp,
    error: string,
    type: string
  ) => {
    if (!allowedExtensions.exec(input.value)) {
      input.value = "";
      return false;
    }

    if (!input.files) {
      return false;
    }

    const lastIdx = input.files.length - 1;
    setFile(input.files[lastIdx]);
    if (type == "image" && input.files[lastIdx]) {
      const bodyFormData = new FormData();
      bodyFormData.append("file", input.files[lastIdx]);
      bodyFormData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_PRESET_UPLOAD
      );
      bodyFormData.append("folder", "chats");
      axios({
        method: "post",
        url: CloudinaryURL(),
        data: bodyFormData,
      })
        .then((response) => {
          const secureUrl = response.data.secure_url;
          const publicId = response.data.public_id;
          sendImage(secureUrl);
        })
        .catch((error) => {
          console.log(error);
        });
      return true;
    }
  };

  const handleImageUpload = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    matchFile(
      target,
      allowedExtensions,
      "File type must be JPG/JPEG/PNG",
      "image"
    );
  };

  return (
    <>
      {other ? <UserSmallComponent user={other} /> : <></>}
      <div
        style={{
          height: "360px",
          overflow: "auto",
        }}
        className="bg-primary py-2"
      >
        {messages ? (
          <div className="d-flex flex-column">
            {messages.map((m, i) =>
              m.user.ID == user.ID ? (
                <MyMessage message={m} key={i} />
              ) : (
                <OtherMessage message={m} key={i} />
              )
            )}
            <div ref={messagesEndRef}></div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="w-10 d-flex">
        <input
          type="text"
          name="chat"
          id="chat"
          className="form-input-secondary w-10"
          placeholder="Input message..."
        />
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
          <input
            type="file"
            name="image"
            id="image"
            style={{
              display: "none",
            }}
            onChange={handleImageUpload}
          />
        </div>
        <button className="btn-primary-outline" onClick={send}>
          <IconContext.Provider
            value={{
              size: "25px",
            }}
          >
            <FiSend />
          </IconContext.Provider>
        </button>
      </div>
    </>
  );
};

export default Chat;
