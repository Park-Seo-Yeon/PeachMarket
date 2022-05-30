// import React, { useCallback, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import socketIO from "socket.io-client";
// import ProductService from "../service/ProductService";
// import useStore from "./useStore";

// function ChatComponent() {
//   const productId = useParams().productId;
//   const { userId, setUserId } = useStore();
//   const roomId = userId + productId;

//   //const [socket, setSocket] = useState(null);
//   const [chatArr, setChatArr] = useState([]);

//   const [chat, setChat] = useState({
//     roomId: roomId,
//     userId: userId,
//     message: "",
//   });

//   const socket = socketIO.connect("http://localhost:3001");
//   socket.emit("join", { roomId, userId });

//   useEffect(() => {
//     return () => {
//       socket.close();
//     };
//   }, []);

//   useEffect(() => {
//     // ProductService.getOneProduct(productId).then((res) => {
//     //   setProduct(res.data);
//     // });

//     //setSocket(socketIO("http://localhost:3001"));
//     socket.on("receive", (message) => {
//       setChatArr(chatArr.concat(message));
//     });
//   }, []);

//   //   const buttonHandler = useCallback(() => {
//   //     socket.emit("send", { userId: chat.userId, message: chat.message });

//   //     console.log(chatArr);
//   //   }, [chat]);
//   //   const changeMessage = useCallback(
//   //     (e) => {
//   //       setChat({ userId: chat.userId, message: e.target.value });
//   //     },
//   //     [chat]
//   //   );

//   const onClickSubmit = () => {
//     socket.emit("send", { userId: chat.userId, message: chat.message });

//     console.log(chatArr);
//   };

//   const onChange = (e) => {
//     setChat({ userId: chat.userId, message: e.target.value });
//   };

//   return (
//     // <div>
//     //   {socket ? (
//     <div className="App">
//       <div className="Box">
//         <div className="ChatBox">
//           {chatArr.map((value, index) => (
//             <div className="Chat" key={index}>
//               <div>{value.userId}</div>
//               <div className="ChatLog">{value.message}</div>
//             </div>
//           ))}
//         </div>
//         <div className="InputBox">
//           <input placeholder="내용을 입력하세요" onChange={onChange}></input>
//           <button onClick={onClickSubmit}>보내기</button>
//         </div>
//       </div>
//     </div>
//     //) : (
//     // <div>loading</div>
//     // )}
//     //</div>
//   );
// }

// export default ChatComponent;
