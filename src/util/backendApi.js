import axios from "axios";

export function loginUser(payload) {
  return axios.post("http://localhost:8080/api/user/new", {
    name: payload.name,
  });
}

export function getAllUsers() {
  return axios.get("http://localhost:8080/api/user/all");
}

export default { loginUser, getAllUsers };
