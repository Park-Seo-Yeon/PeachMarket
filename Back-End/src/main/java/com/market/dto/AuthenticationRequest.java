package com.market.dto;

public class AuthenticationRequest {
    private String userId;
    private String password;
   
    public String getUserId() {
         return userId;
    }
    public void setUsername(String userId) {
         this.userId = userId;
    }
    public String getPassword() {
         return password;
    }
    public void setPassword(String password) {
         this.password = password;
    }
}
