import React from "react";
import UserItem from "./UserItem";
import PropTypes from "prop-types";

const styles = {
  ul: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
};

function UserList(props) {
  return (
    <ul style={styles.ul}>
      {props.users.map((user, index) => {
        console.log('TODOLIST', user)
        return (
          <UserItem
            user={user}
            key={user.name}
            index={index}
            onChange={props.onToggle}
          />
        );
      })}
    </ul>
  );
}

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number,
  onToggle: PropTypes.func.isRequired,
};

export default UserList;
