package com.market.service;

import java.util.Collections;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.market.dto.AuthenticationRequest;
import com.market.dto.ProductDto;
import com.market.entity.Category;
import com.market.entity.Product;
import com.market.entity.User;
import com.market.exception.ResourceNotFoundException;
import com.market.jwt.JwtTokenProvider;
import com.market.repository.UserRepository;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Service
public class UserService {
	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;

	// 로그인
	public ResponseEntity<String> signIn(AuthenticationRequest authenticationRequest) {
			User user = userRepository.findById(authenticationRequest.getUserId())
					.orElseThrow(() -> new ResourceNotFoundException("["+authenticationRequest.getUserId()+"]" + "은 존재하지 않는 회원입니다."));
		
		if (!passwordEncoder.matches(authenticationRequest.getPassword(), user.getPassword())) {
			throw new IllegalArgumentException("잘못된 비밀번호입니다.");
		}
		
		String jwt = jwtTokenProvider.createToken(user.getUsername(), user.getRoles());	// 토큰 생성
		
		return ResponseEntity.ok(jwt);
		
	}
	
	// 유저 조회 
	public User findUserById(String userId) {
		return userRepository.findById(userId).get();
	}
	
	// 회원가입
	public String signUp(Map<String, String> user) {
	return userRepository.save(User.builder().userId(user.get("userId"))
			.password(passwordEncoder.encode(user.get("password")))
			.nickname(user.get("userId")) // 최초 닉네임은 ID와 동일하게 설정
			.profileImg("https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/setting/DefaultProfileImage.png")	// 최초 프로필 사진은 기본 프로필 사진 
			.roles(Collections.singletonList("ROLE_USER")) // 최초 권한 설정
			.build()).getUserId();
	}

}
