import React, { useEffect, useRef } from "react";
import UserList from "./UserList";
import Login from "./Login";
import { addHandHandler, addHandler, changeHandPosition } from "./util/ws";

function App() {
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
      console.log("Users:", stateRef.current);
    });

    addHandHandler((user) => {
      setUsers(
        stateRef.current.map((user_) => {
          console.log(user_);

          if (user_.id === user.id) {
            user_.handRaised = !user_.handRaised;
          }
        })
      );
    });
  }, []);

  // replace this function with toggle hand state
  function toggleHand(name) {
    setUsers(
      users.map((user) => {
        if (user.name === name) {
          user.isHandRaised = !user.isHandRaised;
          // changeHandPosition(user);
        }
        return user;
      })
    );
  }

  return (
    <div className="wrapper">
      <h3>Your name:</h3>
      <Login />
      {users.length ? (
        <UserList users={users} onToggle={toggleHand}></UserList>
      ) : (
        <p>No users!</p>
      )}
    </div>
  );
}

export default App;
