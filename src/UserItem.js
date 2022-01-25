import React from "react";
import PropTypes from "prop-types";
import Emoji from "./util/emoji";

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

function UserItem({ user }) {
  return (
    <li style={styles.li}>
      {user.name}
      <div>
        {user.handRaised ? (
          <Emoji symbol="0x270b"></Emoji>
        ) : (
          ""
        )}
      </div>
    </li>
  );
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
