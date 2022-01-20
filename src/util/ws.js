import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

var stompClient = null;
const loginHandlers = [];
const handHandlers = []
const logoutHandlers = []

export function connect() {
  var socket = new SockJS("http://localhost:8080/gs-guide-websocket");
  stompClient = Stomp.over(socket);

  stompClient.connect({}, (frame) => {
    console.log("Connected: " + frame);
    stompClient.subscribe("/topic/chat", (user) => {
      loginHandlers.forEach((handler) => handler(JSON.parse(user.body).body));
    });

    stompClient.subscribe("/topic/hand", (user) => {
        handHandlers.forEach((handler) => handler(JSON.parse(user.body)));
    });

    stompClient.subscribe("/topic/logout", (users) => {
      console.log('USSERS:', users)
        logoutHandlers.forEach((handler) => handler(JSON.parse(users.body)));
    });
  });
}

export function addHandler(handler) {
  loginHandlers.push(handler);
}

export function addHandHandler(handler) {
  handHandlers.push(handler);
}

export function addLogoutHandler(handler) {
  logoutHandlers.push(handler);
}

export function disconnect() {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
  console.log("Disconnected");
}

export function loginUser(user) {
  stompClient.send("/app/new", {}, JSON.stringify(user));
}

export function changeHandPosition(user) {
  stompClient.send("/app/changeHandPosition", {}, JSON.stringify(user));
}

export function logout(user) {
  stompClient.send("/app/del", {}, JSON.stringify(user));
}
