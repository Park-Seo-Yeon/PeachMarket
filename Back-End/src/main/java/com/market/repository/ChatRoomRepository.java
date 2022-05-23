package com.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.entity.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer>  {

}
