import React, { useState } from "react";
import { loginUser } from "./util/ws";

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
  const input = useInputValue("");
  function loginHandler(event) {
    event.preventDefault();

    loginUser({ name: input.value() });
    input.clear();
  }

  return (
    <form onSubmit={loginHandler}>
      <input {...input.bind} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
