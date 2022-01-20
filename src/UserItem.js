import React from "react";
import PropTypes from "prop-types";

const styles = {
  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: ".5rem",
  },
  input: {
    marginRight: "1rem",
  },
};

function UserItem({ user, onChange }) {
  return (
    <li style={styles.li}>
      {user.name}
      <button onClick={() => onChange(user.name)}>
        {user.isHandRaised ? "Hand raised" : "Hand down"}
      </button>
    </li>
  );
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UserItem;
