import React, { useState } from "react";
import { joinTheGroup } from "./util/ws";
import { useNavigate } from "react-router-dom";
import { saveName } from "./util/localstorage";
import { loginUser } from "./util/backendApi";

function useInputValue(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  return {
    bind: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => value,
  };
}

function Login() {
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();

  const input = useInputValue("");
  function loginHandler(event) {
    event.preventDefault();

    const data = loginUser({ name: input.value() });

    data.then((response) => {
      if (response.data === "Edit your name.") {
        setShowErrorMessage(true);
      } else {
        joinTheGroup()
        saveName(input.value());
        navigate("/members");
      }
    });
  }

  return (
    <div className="login-wrapper">
      <form onSubmit={loginHandler}>
        <label>
          <p>Your name:</p>
          <input {...input.bind} />
        </label>

        <div>
          <button type="submit">Login</button>
        </div>
        {showErrorMessage && (
          <div>
            <p>Such name already exists!</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
