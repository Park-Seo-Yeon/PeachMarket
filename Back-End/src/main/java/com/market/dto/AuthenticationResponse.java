package com.market.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationResponse {

//	private String userId;
//    // private String password;
    private final String accessToken;
    private final String refreshToken;
    
    
   
    @Builder
	public AuthenticationResponse(String accessToken, String refreshToken ) {
		//this.userId = userId;
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}
    
//    public String getUserId() {
//		return userId;
//	}
//
//	public void setUserId(String userId) {
//		this.userId = userId;
//	}

//	public String getAccessToken() {
//		return accessToken;
//	}
//
//	public void setAccessToken(String accessToken) {
//		this.accessToken = accessToken;
//	}
//
//	public String getRefreshToken() {
//		return refreshToken;
//	}
//
//	public void setRefreshToken(String refreshToken) {
//		this.refreshToken = refreshToken;
//	}
	
}
