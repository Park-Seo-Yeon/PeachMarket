package com.market.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.market.entity.ChatContents;

@Controller
public class ChatController {

	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
	@MessageMapping("/message")	// /app/message
	@SendTo("/chatroom/public")
	public ChatContents receivePublicMessage(@Payload ChatContents chatContents) {
		return chatContents;
	}
	
	@MessageMapping("/private/message")
	public ChatContents receivePrivateMessage(@Payload ChatContents chatContents) {
		simpMessagingTemplate.convertAndSendToUser(chatContents.getReceiverId(), "/private", chatContents);	// /user/username/private
		return chatContents;
	}
}
