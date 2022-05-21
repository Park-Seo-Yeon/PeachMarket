package com.market.entity;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatContents {
	
	private Integer chatId;
	private Integer chatRoomId;
	private String senderId;	// 발신자 
	private String receiverId;	// 수신자 
	private String contents;
	private Date sendTime;
	private char status;

}
