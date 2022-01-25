import React, { useEffect, useRef, useState } from "react";
import UserList from "./UserList";
import {
  addHandHandler,
  addJoinGroupHandler,
  addLogoutHandler,
} from "./util/ws";

function Memebers() {
  const [users, setUsers] = useState([]);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    fetch("http://localhost:8080/api/user/all")
      .then((response) => response.json())
      .then((users_) => {
        setUsers(users_);
      });

    addJoinGroupHandler((data) => {
      if (isMounted.current) {
        setUsers(data);
      }
    });

    addLogoutHandler((data) => {
      if (isMounted.current) {
        setUsers(data);
      }
    });

    addHandHandler((data) => {
      if (isMounted.current) {
        setUsers(data);
      }
    });
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div>
      <h3>Class members</h3>
      {users.length ? <UserList users={users}></UserList> : <p>No users!</p>}
    </div>
  );
}

export default Memebers;
