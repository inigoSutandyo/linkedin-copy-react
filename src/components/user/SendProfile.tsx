import axios from "axios";
import React, { useState, useEffect, SyntheticEvent } from "react";
import { useAppSelector } from "../../app/hooks";
import { ApiURL } from "../../utils/Server";

type Props = {
  profile_id: number
};

const SendProfile = (props: Props) => {
  const list = useAppSelector((state) => state.list);
  const [users, setUsers] = useState(list);
  const [input, setInput] = useState("");

  useEffect(() => {
    setUsers(list);
  }, [list]);

  useEffect(() => {
    if (input == "") {
      setUsers(list);
      return;
    }

    const u = users.filter((user) => {
      return user.email.startsWith(input);
    });
    setUsers(u);
  }, [input]);

  const handleSendProfile = () => {
    if (props.profile_id == 0) return
    const u = list.filter((user) => {
        return (user.email == input)
    })

    axios.post(
      ApiURL("/send/profile"),
      {},
      {
        withCredentials: true,
        params: {
          user_id: u[0].ID,
          profile_id: props.profile_id
        },
      }
    )
    .then((response) => {
        console.log(response.data)
    })
    .catch((error) => {
        console.log(error.response.data)
    })
  };
  return (
    <div className="d-flex flex-column align-center">
      <input
        type="text"
        name="users"
        id="users"
        value={input}
        onChange={(e: SyntheticEvent) => {
          const target = e.target as HTMLInputElement;
          setInput(target.value.trim());
        }}
      />
      <div className="d-flex my-5">
        <button className="btn-primary mx-2" onClick={handleSendProfile}>
          Send
        </button>
      </div>

      <div
        className="d-flex flex-column"
        style={{
          overflow: "auto",
          maxHeight: "192px",
        }}
      >
        {users.map((u) => (
          <div
            key={u.ID}
            className="pointer-cursor"
            onClick={() => {
              console.log(u.ID);
              setInput(u.email);
            }}
          >
            {u.email}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SendProfile;
