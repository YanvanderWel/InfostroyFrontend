import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

var stompClient = null;
const handlers = [];
const handHandlers = []

export function connect() {
  var socket = new SockJS("http://localhost:8080/gs-guide-websocket");
  stompClient = Stomp.over(socket);
  console.log(stompClient);
  stompClient.connect({}, (frame) => {
    console.log("Connected: " + frame);
    stompClient.subscribe("/topic/chat", (user) => {
      console.log("User: ", JSON.parse(user.body).body);
      handlers.forEach((handler) => handler(JSON.parse(user.body).body));
    });

    stompClient.subscribe("/topic/hand", (user) => {
        handHandlers.forEach((handler) => handler(JSON.parse(user.body)));
    });
  });
}

export function addHandler(handler) {
  handlers.push(handler);
}

export function addHandHandler(handler) {
  handHandlers.push(handler);
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
