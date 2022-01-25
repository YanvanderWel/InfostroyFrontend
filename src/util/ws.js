import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

var stompClient = null;
const joinGroupHandlers = [];
const handHandlers = [];
const logoutHandlers = [];

export function connect() {
  var socket = new SockJS("http://localhost:8080/gs-guide-websocket");
  stompClient = Stomp.over(socket);

  stompClient.connect({}, (frame) => {
    console.log("Connected: " + frame);
    stompClient.subscribe("/topic/chat", (users) => {
      joinGroupHandlers.forEach((handler) => handler(JSON.parse(users.body)));
    });

    stompClient.subscribe("/topic/hand", (user) => {
      handHandlers.forEach((handler) => handler(JSON.parse(user.body)));
    });

    stompClient.subscribe("/topic/logout", (users) => {
      logoutHandlers.forEach((handler) => handler(JSON.parse(users.body)));
    });
  });
}

export function addJoinGroupHandler(handler) {
  joinGroupHandlers.push(handler);
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

export function joinTheGroup() {
  stompClient.send("/app/joinTheGroup");
}

export function changeHandPosition(user) {
  stompClient.send("/app/changeHandPosition", {}, JSON.stringify(user));
}

export function logout(user) {
  stompClient.send("/app/del", {}, JSON.stringify(user));
}
