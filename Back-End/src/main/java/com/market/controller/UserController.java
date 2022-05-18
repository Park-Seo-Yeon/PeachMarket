package com.market.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
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
import com.market.jwt.JwtTokenProvider;
import com.market.repository.UserRepository;
import com.market.service.CustomUserDetailsService;
import com.market.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class UserController {

	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;
	private final UserRepository userRepository;
	private final UserService userService;
	private final CustomUserDetailsService customUserDetailsService;
	private final AuthenticationManager authenticationManager;

	// 회원가입(실제로 완전한 기능 구현은 X, postman을 이용하여 사용자를 생성할 것임)
	@PostMapping("/join")
	public String join(@RequestBody Map<String, String> user) {
		return userRepository.save(User.builder().userId(user.get("userId"))
				.password(passwordEncoder.encode(user.get("password")))
				.profileImg("https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/setting/DefaultProfileImage.png")
				.roles(Collections.singletonList("ROLE_USER")) // 최초 // 설정
				.build()).getUserId();
	}


	// 로그인 
	@PostMapping("/login")
	public ResponseEntity<String> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {
//        try {
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUserId(), authenticationRequest.getPassword()));
//        } catch (BadCredentialsException e) {
//            throw new Exception("Incorrect username or password", e);
//        }
//		Map<String, String> map = new HashMap<>();
//		String userId = authenticationRequest.getUserId();
		
		User member = userRepository.findByUserId(authenticationRequest.getUserId())
				.orElseThrow(() -> new IllegalArgumentException("가입되지 않은 ID 입니다."));
		if (!passwordEncoder.matches(authenticationRequest.getPassword(), member.getPassword())) {
			throw new IllegalArgumentException("잘못된 비밀번호입니다.");
		}
		// final UserDetails userDetails = customUserDetailsService.loadUserByUsername(authenticationRequest.getUserId());

		String jwt = jwtTokenProvider.createToken(member.getUsername(), member.getRoles());
//		map.put("jwt", jwt);
//		map.put("userId", userId);
		System.out.println("토큰 보내기 성공!!!!!!!: " + jwt);
		
		return ResponseEntity.ok(jwt);
	}


	// 마이페이지 로딩
	@GetMapping("/mypage")
	public User getMyPage() {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username = userDetails.getUsername();
		return userService.findUserById(username);
	}

}