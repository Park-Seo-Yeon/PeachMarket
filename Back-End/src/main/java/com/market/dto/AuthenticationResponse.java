package com.market.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationResponse {

    private final String accessToken;
    private final String refreshToken;
    
   
    @Builder
	public AuthenticationResponse(String accessToken, String refreshToken ) {
		//this.userId = userId;
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}
}
    