import React, { useState } from "react";
import { loginUser } from "./util/ws";
import { useNavigate } from "react-router-dom";
import { saveName } from "./util/localstorage";

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
  const navigate = useNavigate();

  const input = useInputValue("");
  function loginHandler(event) {
    event.preventDefault();

    loginUser({ name: input.value() });
    saveName(input.value())
    navigate("/members");
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
      </form>
    </div>
  );
}

export default Login;
