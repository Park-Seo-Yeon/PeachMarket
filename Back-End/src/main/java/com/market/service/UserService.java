package com.market.service;

import java.util.Collections;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.market.dto.AuthenticationRequest;
import com.market.dto.AuthenticationResponse;
import com.market.entity.User;
import com.market.exception.ResourceNotFoundException;
import com.market.jwt.JwtTokenProvider;
import com.market.repository.UserRepository;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;

	// 로그인
	// access Token , refreshToken 발급 과정 - 처음 로그인을 시도하였을 때
	@Transactional
	public AuthenticationResponse loginUser(HttpServletRequest request, HttpServletResponse response,
			AuthenticationRequest authenticationRequest) {
		User user = userRepository.findById(authenticationRequest.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException(
						"[" + authenticationRequest.getUserId() + "]" + "은 존재하지 않는 회원입니다."));

		if (!passwordEncoder.matches(authenticationRequest.getPassword(), user.getPassword())) {
			throw new IllegalArgumentException("잘못된 비밀번호입니다.");
		}
		String accessToken = jwtTokenProvider.createToken(user.getUsername(), user.getRoles());
		String refreshToken = jwtTokenProvider.createRefreshToken(user.getUsername(), user.getRoles());
		
		user.setRefreshToken(refreshToken);
		
		response.setHeader("X-AUTH-TOKEN", accessToken);
		response.setHeader("REFRESH-TOKEN", refreshToken);
		return new AuthenticationResponse(accessToken, refreshToken);
	}

//	// refresh token 발급 과정 - accessToken이 만료 되었을 때
//	@Transactional
//	public AuthenticationResponse refreshToken(String token, String refreshToken) {
//
//		String userId = jwtTokenProvider.getUserPk(token); // 토큰에서 userId 정보 추출
//		User user = userRepository.findById(userId)
//				.orElseThrow(() -> new ResourceNotFoundException("[" + userId + "]" + "은 존재하지 않는 회원입니다."));
//
//		// 아직 만료되지 않은 토큰으로는 refresh가 불가능하다
//		if (!jwtTokenProvider.validateToken(token))
//			throw new AccessDeniedException("");
//		refreshToken = jwtTokenProvider.createRefreshToken(user.getUsername(), user.getRoles());
//		return new AuthenticationResponse(jwtTokenProvider.createRefreshToken(user.getUsername(), user.getRoles()),
//				refreshToken);
//	}

	@Transactional
	public AuthenticationResponse issueAccessToken(HttpServletRequest request) {
		System.out.println(request);
		// 클라이언트에서 보낸 요청의 헤더에서 토큰 값과 리프레쉐 토큰 값을 가져옴 
		String accessTokenHeader = jwtTokenProvider.resolveAccessToken(request);
		String refreshTokenHeader = jwtTokenProvider.resolveRefreshToken(request);
		
		
		String accessToken = null;
		String refreshToken = null;
		
		if (accessTokenHeader.startsWith("Bearer ") && refreshTokenHeader.startsWith("Bearer ")) {		
			accessToken = accessTokenHeader.substring(7);
			refreshToken = refreshTokenHeader.substring(7);
		}
		
		System.out.println("액세스 토큰 값" + accessToken);
		System.out.println("리프레쉬 토큰 값" + refreshToken);
		// accessToken이 만료됐고 refreshToken이 맞으면 accessToken을 새로 발급
//		if(!jwtTokenProvider.isValidAccessToken(accessToken)){ //클라이언트에서 토큰 재발급 api로의 요청을 확정해주면 이 조건문은 필요 없을 것 같다. 
//			System.out.println("Access 토큰 만료됨"); 
//		if (!jwtTokenProvider.validateToken(accessToken))
//			throw new AccessDeniedException("");
		if (jwtTokenProvider.validateToken(refreshToken)) { // 들어온 Refresh 토큰이 자체적으로 유효성 검사

			System.out.println("Refresh 토큰은 유효함");

			// access 토큰 새로 발급 과정
			String userId = jwtTokenProvider.getUserPk(accessToken);
			
			User user = userRepository.findById(userId)
					.orElseThrow(() -> new ResourceNotFoundException("[" + userId + "]" + "은 존재하지 않는 회원입니다."));
			System.out.println(user.getRefreshToken());
			String refreshTokenInDB = user.getRefreshToken(); // 처음 로그인 시도 때 DB에 저장되어있었던 refreshToken

			System.out.println("tokenFromDB = " + refreshTokenInDB);

			if (refreshToken.equals(refreshTokenInDB)) { // DB의 원본 refresh토큰과 지금들어온 토큰이 같은지 확인
				System.out.println("Access 토큰 재발급 완료");
				accessToken = jwtTokenProvider.createRefreshToken(user.getUsername(), user.getRoles());
			} else { // DB의 Refresh토큰과 들어온 Refresh토큰이 다르면 중간에 변조된 것임
						// 예외발생
				System.out.println("Refresh Token Tampered");
			}
		} else {
			// 입력으로 들어온 Refresh 토큰이 유효하지 않음
			System.out.println("Refresh Token 유효하지 않음");
		}
		return new AuthenticationResponse(accessToken, refreshToken);

	}

	// 유저 조회
	public User findUserById(String userId) {
		return userRepository.findById(userId).get();
	}

	// 회원가입
	public String signUp(Map<String, String> user) {
		return userRepository.save(User.builder().userId(user.get("userId"))
				.password(passwordEncoder.encode(user.get("password"))).nickname(user.get("userId")) // 최초 닉네임은 ID와 동일하게
																										// 설정
				.profileImg(
						"https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/setting/DefaultProfileImage.png") // 최초
																														// 프로필
																														// 사진은
																														// 기본
																														// 프로필
																														// 사진
				.roles(Collections.singletonList("ROLE_USER")) // 최초 권한 설정
				.build()).getUserId();
	}

}
