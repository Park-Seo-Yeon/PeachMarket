//package com.market.controller;
//
//import lombok.RequiredArgsConstructor;
//
//import java.io.IOException;
//import java.util.List;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpSession;
//
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//
//import com.market.entity.ChatRoom;
//import com.market.entity.Message;
//import com.market.entity.User;
//import com.market.service.ChatRoomService;
//import com.market.service.UserService;
//
//@RequiredArgsConstructor
//@Controller
//public class ChatController {
//
//    private final SimpMessagingTemplate simpMessagingTemplate;
//
//    private final ChatRoomService chatRoomService;
//    private final UserService userService;
//    
//    
//    
//  //채팅으로 거래하기(productInfo 화면)
//    @RequestMapping(value="/chatMessage", method=RequestMethod.GET)
//    public String getWebSocketWithSockJs(Model model, HttpServletRequest request, 
//            @ModelAttribute("chatRoom") ChatRoom chatRoom) throws IOException {
//        
//        //productInfo화면에서 Chat화면에 전달해줄 parameter
//    	UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//    	String userId = userDetails.getUsername();
//    	User user = userService.findUserById(userId);
//    	
//        String buyerId = user.getUserId();
//        String buyerName = user.getNickname();
//        
//        chatRoom.setBuyerId(buyerId);
//        // chatRoom.setBuyerName(buyerName);
//        
//        
//        //이미 chatRoom이 만들어져있는지 확인
//        if (chatRoomService.countByChatId(chatRoom.getProductId(), chatRoom.getBuyerId()) > 0) {
//            //get ChatRoomInfo
//            ChatRoom chatRoomTemp = chatRoomService.findByChatId(chatRoom.getProductId(), chatRoom.getBuyerId());
//            //load existing chat history
//            List<ChatRoom> chatHistory = chatRoomService.readChatHistory(chatRoomTemp);
//            //transfer chatHistory Model to View
//            model.addAttribute("chatHistory", chatHistory);
//            
//        } else {
//            //chatRoom 생성            
//            chatRoomService.addChatRoom(chatRoom);            
//            //text file 생성
//            chatRoomService.createFile(chatRoom.getProductId(), chatRoomService.getId(chatRoom.getProductId(), chatRoom.getBuyerId()));                                
//        }
// 
//            //chatRoom Add 시 생성될 chatId
//            chatRoom.setId(chatRoomService.getId(chatRoom.getProductId(), chatRoom.getBuyerId()));
//            
//            //chatRoom 객체 Model에 저장해 view로 전달
//            model.addAttribute("chatRoomInfo", chatRoom);
//        
//        return "chatBroadcastProduct";
//    }
//
//    
//    // broker 역할을 하는 메서드
//    @MessageMapping("/broadcast")
//    public void send(ChatRoom chatRoom) throws IOException {
// 
//        chatRoom.setSendTime(TimeUtils.getCurrentTimeStamp());
//        //append message to txtFile
//        chatRoomService.appendMessage(chatRoom);
//        
//        int id = chatRoom.getId();
//        String url = "/user/" + id + "/queue/messages";
//        simpMessage.convertAndSend(url, new ChatRoom(chatRoom.getContent(), chatRoom.getSenderName(), chatRoom.getSendTime())); 
//    }
//    
//    @MessageMapping("/message")
//    @SendTo("/chatroom/public")
//    public Message receiveMessage(@Payload Message message){
//    	System.out.println(message.toString());
//        return message;
//    }
//
//    @MessageMapping("/private-message")
//    public Message recMessage(@Payload Message message){
//        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private",message);
//        System.out.println(message.toString());
//        return message;
//    }
//}