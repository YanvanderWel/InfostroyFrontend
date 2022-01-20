import React, { useEffect, useRef } from "react";
import UserList from "./UserList";
import { addHandHandler, addHandler, addLogoutHandler } from "./util/ws";

function Memebers() {
  const [users, setUsers] = React.useState([]);
  const stateRef = useRef();

  stateRef.current = users;

  useEffect(() => {
    fetch("http://localhost:8080/api/user/all")
      .then((response) => response.json())
      .then((users_) => {
        setUsers(users_);
      });

    addHandler((data) => {
      console.log("Our object:", data);
      setUsers(stateRef.current.concat([data]));
    //   setTimeout(() => {
    //     alert(data.name + " signed in.");
    //   }, 2000);
      console.log("Users:", stateRef.current);
    });

    addLogoutHandler((data) => {
      setUsers((stateRef.current = data));
    //   setTimeout(() => {
    //     alert(data.name + " signed out.");
    //   }, 2000);
    });

    addHandHandler((data) => {
      setUsers((stateRef.current = data));
    });
  }, []);

  function toggleHand(name) {
    setUsers(
      users.map((user) => {
        if (user.name === name) {
          user.isHandRaised = !user.isHandRaised;
        }
        return user;
      })
    );
  }

  return (
    <div>
      <h3>Class members</h3>
      {users.length ? (
        <UserList users={users} onToggle={toggleHand}></UserList>
      ) : (
        <p>No users!</p>
      )}
    </div>
  );
}

export default Memebers;
