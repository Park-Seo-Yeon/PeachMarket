package com.market.entity;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ChatRoom {

	@Id
	private Integer chatRoomId;
	
	private Integer productId;
	private String sellerId;
	private String buyerId;
	private String fileName;
	private char sellerState;
	private char buyerState;
	private Timestamp createTime;
	private Timestamp updateTime;
	
	//not in DB
	@Transient
    private String content;	
	@Transient
    private String sendTime;
	@Transient
    private String senderName;
	@Transient
    private String pr_title;
	
	public ChatRoom(Integer chatRoomId, Integer productId, String sellerId, String buyerId, char sellerState,
			char buyerState, Timestamp createTime, Timestamp updateTime) {
		super();
		this.chatRoomId = chatRoomId;
		this.productId = productId;
		this.sellerId = sellerId;
		this.buyerId = buyerId;
		this.sellerState = sellerState;
		this.buyerState = buyerState;
		this.createTime = createTime;
		this.updateTime = updateTime;
	}

	
    public ChatRoom(String content, String senderName, String sendTime) {
        this.content = content;
        this.senderName = senderName;
        this.sendTime = sendTime;
    }
    
}
