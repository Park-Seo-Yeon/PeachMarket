package com.market.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.market.dto.AuthenticationRequest;
import com.market.dto.AuthenticationResponse;
import com.market.service.LoginService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class LoginController {
	
	private final LoginService loginService;

	// 로그인
	@PostMapping("/login")
	public AuthenticationResponse createAuthenticationToken(HttpServletRequest request, HttpServletResponse response,
			@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {
		return loginService.loginUser(request, response, authenticationRequest);
	}

	// 토큰 만료 시 
	@PostMapping("/refresh")
	public AuthenticationResponse refreshToken(HttpServletRequest request) {
		return loginService.issueAccessToken(request);
	}

	// 회원가입(실제로 프론트와 연동한 완전한 기능 구현은 X, postman을 이용하여 사용자를 생성함)
	@PostMapping("/signUp")
	public String join(@RequestBody Map<String, String> user) {
		return loginService.signUp(user);
	}
	
}
