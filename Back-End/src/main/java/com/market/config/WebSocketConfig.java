package com.market.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/broadcast").setAllowedOriginPatterns("*").withSockJS().setHeartbeatTime(60_000);;
	}

	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
        //for subscribe prefix
        registry.enableSimpleBroker("/user");
        //for publish prefix
        registry.setApplicationDestinationPrefixes("/app");
        
//		registry.setApplicationDestinationPrefixes("/app");  //for publish prefix
//		registry.enableSimpleBroker("/chatroom", "/user"); //for subscribe prefix
//		registry.setUserDestinationPrefix("/user");
	}
}