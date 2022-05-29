package com.market.service;

import java.util.Collections;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.market.dto.AuthenticationRequest;
import com.market.dto.AuthenticationResponse;
import com.market.entity.User;
import com.market.exception.ResourceNotFoundException;
import com.market.jwt.JwtTokenProvider;
import com.market.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class LoginService {

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

		return new AuthenticationResponse(accessToken, refreshToken);
	}

	// 토큰 재발급 과정 - accessToken이 만료 되었을 
	@Transactional
	public AuthenticationResponse issueAccessToken(HttpServletRequest request) {
		System.out.println(request);
		// 클라이언트에서 보낸 요청의 헤더에서 토큰 값을 가져옴 
		String accessTokenHeader = jwtTokenProvider.resolveAccessToken(request);
		String refreshTokenHeader = jwtTokenProvider.resolveRefreshToken(request);
		
		
		String act = null;
		String rft = null;
		
		if (accessTokenHeader.startsWith("Bearer ") && refreshTokenHeader.startsWith("Bearer ")) {		
			act = accessTokenHeader.substring(7);
			rft = refreshTokenHeader.substring(7);
		}
		

		if (!jwtTokenProvider.validateToken(act)) { // 들어온 토큰이 만료된 게 맞는지 확인 

			System.out.println("access token 토큰 만료 맞음 ");

			// 토큰 새로 발급 과정
			String userId = jwtTokenProvider.getUserPk(rft);
			
			// 유저 아이디에 맞는 refresh token 값을 DB에서 확인
			User user = userRepository.findById(userId)
					.orElseThrow(() -> new ResourceNotFoundException("[" + userId + "]" + "은 존재하지 않는 회원입니다."));
			System.out.println("유저의 리프레쉬 토큰 조회 완료" + user.getRefreshToken());
			
			String refreshTokenInDB = user.getRefreshToken(); // 처음 로그인 시도 때 DB에 저장되어있었던 refreshToken
			System.out.println("유저의 정보는 : " + user.getUserId());
			System.out.println("tokenFromDB = " + refreshTokenInDB);

			if (rft.equals(refreshTokenInDB)) { // DB의 원본 refresh토큰과 지금들어온 토큰이 같은지 확인
				System.out.println("Access 토큰 재발급 완료");
				act = jwtTokenProvider.createToken(user.getUsername(), user.getRoles());
			} else { // DB의 Refresh토큰과 들어온 Refresh토큰이 다르면 중간에 변조된 것임
				System.out.println("Refresh Token 변조");
			}
		} else {
			System.out.println("access token  토큰 만료 안 됨 ");
		}
		return new AuthenticationResponse(act, rft);

	}

	// 회원가입
	public String signUp(AuthenticationRequest authenticationRequest) {
		return userRepository.save(User.builder().userId(authenticationRequest.getUserId())
				.password(passwordEncoder.encode(authenticationRequest.getPassword()))
				.nickname(authenticationRequest.getUserId()) // 최초 닉네임은 유저 아이디와 동일하게 설정
				.profileImg(
						"https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/setting/DefaultProfileImage.png") // 최초 프사는 기본 이미지 
				.roles(Collections.singletonList("ROLE_USER")) // 최초 권한 설정
				.build()).getUserId();
	}
}
