package com.market.controller;


import java.util.Collections;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.market.dto.AuthenticationRequest;
import com.market.entity.User;
import com.market.repository.UserRepository;
import com.market.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	// 로그인 
	@PostMapping("/login")
	public ResponseEntity<String> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {
		return userService.signIn(authenticationRequest);
	}

	// 마이페이지 
	@GetMapping("/mypage")
	public User getMyPage() {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String userId = userDetails.getUsername();
		return userService.findUserById(userId);
	}
	
	// 회원가입(실제로 프론트와 연동한 완전한 기능 구현은 X, postman을 이용하여 사용자를 생성함)
    @PostMapping("/signUp")
    public String join(@RequestBody Map<String, String> user) {
    	return userService.signUp(user);     
    }

}