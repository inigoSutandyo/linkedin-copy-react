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

type Props = {
  setError: any;
  setValue: any;
  style: any;
  id: string;
};

const QuillComponent = (props: Props) => {
  const [reactQuillRef, setReactQuillRef] = useState<any>();
  const [quillRef, setQuillRef] = useState<any>();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const userList = useAppSelector((state) => state.list);
  const [data, setData] = useState<Tribute<Object>>();
  const [mention, setMention] = useState<number>()
  const [name, setName] = useState("")
  useEffect(() => {
    const el = document.getElementById(props.id) as HTMLDivElement
    el?.addEventListener("tribute-replaced", function(e: any) {
        console.log("Matched item:", e.detail.item);
        setMention(e.detail.item.original.id)
        setName(e.detail.item.original.value)
    });
  }, [])
  

  useEffect(() => {
    props.setError(error);
  }, [error]);

  useEffect(() => {
    props.setValue(value);
  }, [value]);

  useEffect(() => {
    if (!reactQuillRef) return;

    console.log(reactQuillRef.getEditor());
    if (typeof reactQuillRef.getEditor() !== "function") return;
    setQuillRef(reactQuillRef.getEditor());
  }, [reactQuillRef]);

  useEffect(() => {
    if (userList.length == 0) return;

    const datas = [];
    for (let i = 0; i < userList.length; i++) {
      const element = userList[i];
      datas.push({
        id: element.ID,
        value: element.firstname + element.lastname,
        key: element.email,
      });
    }
    console.log(datas);

    const tribute = new Tribute({
      trigger: '@',
      values: [...datas],
    //   autocompleteMode: true,
    });

    setData(tribute);
  }, [userList]);

  useEffect(() => {
    if (data) {
      const el = document.getElementsByClassName(props.id);
      data.attach(el[0]);
      console.log(data)
    }
  }, [data]);

  

  const urlRegex = /https?:\/\/[^\s]+$/;
  const mentionRegex = /@[^\s]+$/;
  const detectUrl = (delta: any) => {
    if (
      delta.ops.length == 2 &&
      delta.ops[0].retain &&
      HasWhiteSpace(delta.ops[1].insert)
    ) {
      const endRetain = delta.ops[0].retain;
      const text = quillRef.getText().substr(0, endRetain);
      const match = text.match(urlRegex);
      const matchMention = text.match(mentionRegex)

      let url = ''
      let insert = ''
      if (match !== null) {
        url = match[0];
        insert = url
      }

      if (matchMention !== null) {
        url = `http://localhost:5173/profile/${mention}`;
        insert = '@' + name;
      }

      

      if (url != '' && quillRef) {
        
        if (HasWhiteSpace(url)) {
          return;
        }
        var ops = [] as Array<Object>;
        if (endRetain > insert.length) {
          ops.push({ retain: endRetain - insert.length });
        }
        
        ops = ops.concat([
          { delete: insert.length },
          { insert: insert, attributes: { link: url } },
        ]);
        quillRef.updateContents({
          ops: ops,
        });
      }
    }
  };

  function handleChange(content: any, delta: any, source: any, editor: any) {
    if (editor.getLength() > 255) {
      setError("Length of post exceeded limit of 255 characters");
    } else {
      setError("");
    }

    setQuillRef(reactQuillRef.getEditor());
    detectUrl(delta)
    setValue(content);
  }

  return (
    <ReactQuill
      // id="quill"
      ref={(el) => {
        setReactQuillRef(el);
      }}
      theme="bubble"
      modules={{
        toolbar: false
      }}
      defaultValue={value}
      onChange={handleChange}
      bounds={"#editor-container"}
      style={props.style}
      placeholder={"What are you thinking about?"}
      className={props.id}
      id={props.id}
    />
  );
};

export default QuillComponent;
