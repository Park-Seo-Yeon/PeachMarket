package com.market.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.market.dto.AuthenticationRequest;
import com.market.dto.AuthenticationResponse;
import com.market.entity.User;
import com.market.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	// 로그인
	@PostMapping("/login")
	public AuthenticationResponse createAuthenticationToken(HttpServletRequest request, HttpServletResponse response,
			@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {
		return userService.loginUser(request, response, authenticationRequest);
	}

	// access 토큰이 만료 되었을 때
//	@PostMapping("/refresh")
//	public AuthenticationResponse refreshToken(@RequestHeader(value = "X-AUTH-TOKEN") String token,
//			@RequestHeader(value = "REFRESH-TOKEN") String refreshToken) {
//		System.out.println("휴......... 여기 왔다");
//		return userService.issueAccessToken(token, refreshToken);
//	}
	
	@PostMapping("/refresh")
	public AuthenticationResponse refreshToken(HttpServletRequest request) {
		System.out.println("휴......... 여기 왔다 : " + request);
		return userService.issueAccessToken(request);
	}
	
	// 마이페이지
	@GetMapping("/mypage")
	public User getMyPage() {
		System.out.println("휴......... 여기 왔다 : " );
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