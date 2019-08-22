import React from "react";
import io from "socket.io-client";

const initState = {
  general: [
    { from: "aaron", msg: "hello" },
    { from: "arnold", msg: "hello" },
    { from: "archer", msg: "hello" }
  ],
  topic2: [
    { from: "aaron", msg: "hello" },
    { from: "arnold", msg: "hello" },
    { from: "archer", msg: "end of topic 2" }
  ]
};

function reducer(state, action) {
  // const {from, msg, topic} = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [action.payload.topic]: [
          ...state[action.payload.topic],
          {
            from: action.payload.from,
            msg: action.payload.msg
          }
        ]
      };
  }
}

export const CTX = React.createContext();

let socket;

function sendChatAction(value) {
  socket.emit("chat message", value);
}

export default function Store(props) {
  const [allChats, dispatch] = React.useReducer(reducer, initState);
  if (!socket) {
    socket = io(":3001");
    socket.on("chat message", function(msg) {
      console.log({ msg });
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
  }

  const user = "aaron" + Math.random(100).toFixed(2);

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
}

// module.exports {CTX}
