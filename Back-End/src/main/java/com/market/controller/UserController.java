package com.market.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.market.dto.AuthenticationRequest;
import com.market.dto.ProductRequestDto;
import com.market.entity.User;
import com.market.jwt.JwtTokenProvider;
import com.market.repository.UserRepository;
import com.market.service.CustomUserDetails;
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

	// login 할 때 토큰 값 반환
	// login 요청을 할 때마다 header에 Authorization(Key)에 Token(Value)을 저장해둠
//	@PostMapping("/login")
//	public String login(@RequestBody Map<String, String> user) {
//		User member = userRepository.findByUserId(user.get("userId"))
//				.orElseThrow(() -> new IllegalArgumentException("가입되지 않은 ID 입니다."));
//		if (!passwordEncoder.matches(user.get("password"), member.getPassword())) {
//			throw new IllegalArgumentException("잘못된 비밀번호입니다.");
//		}
//		System.out.println("인증된 사용자");
//		return jwtTokenProvider.createToken(member.getUsername(), member.getRoles()); // 토큰 값 반환
//	}
	@PostMapping("/login")
	public ResponseEntity<String> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {
//        try {
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUserId(), authenticationRequest.getPassword()));
//        } catch (BadCredentialsException e) {
//            throw new Exception("Incorrect username or password", e);
//        }
		User member = userRepository.findByUserId(authenticationRequest.getUserId())
				.orElseThrow(() -> new IllegalArgumentException("가입되지 않은 ID 입니다."));
		if (!passwordEncoder.matches(authenticationRequest.getPassword(), member.getPassword())) {
			throw new IllegalArgumentException("잘못된 비밀번호입니다.");
		}
		// final UserDetails userDetails = customUserDetailsService.loadUserByUsername(authenticationRequest.getUserId());

		String jwt = jwtTokenProvider.createToken(member.getUsername(), member.getRoles());
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