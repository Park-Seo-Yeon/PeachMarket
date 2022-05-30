// const express = require("express");
// const app = express();
// const server = require("http").createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     //origin: "*",
//     origin: "http://localhost:3000",
//     method: ["GET", "POST"],
//   },
// });
// const port = 3001;

// io.on("connection", (socket) => {
//   // server connection
//   console.log("소켓 연결됨");
//   socket.on("join", ({ roomId, userId }) => {
//     // 채팅방 입장
//     socket.join(roomId);
//     console.log("roomID : " + roomId);
//     console.log(`${userId} 채팅방 입장`);
//   });
//   socket.on("send", (chat) => {
//     // send message
//     io.to(chat.roomId).emit("receive", {
//       userId: chat.userId,
//       message: chat.message,
//     });
//     console.log(`${chat.userId} : ${chat.message}`);
//   });
//   socket.on("disconnect", () => {
//     console.log("채팅방 나감");
//   });
// });

// server.listen(port, () => console.log(`Listening on port ${port}`));
