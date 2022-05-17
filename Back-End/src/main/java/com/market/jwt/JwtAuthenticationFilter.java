package com.market.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.market.service.CustomUserDetailsService;

import lombok.RequiredArgsConstructor;

/* 클라이언트 요청 시 JWT 인증을 하기 위해 설치하는 Custom Filter로 
 * UsernamePasswordAuthenticationFilter 이전에 실행  */
@RequiredArgsConstructor
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final CustomUserDetailsService customUserDetailsService;
	private final JwtTokenProvider jwtTokenProvider;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		final String authorizationHeader = request.getHeader("Authorization");

		String userId = null;
		String jwt = null;

		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			jwt = authorizationHeader.substring(7);
			userId = jwtTokenProvider.getUserPk(jwt);
			System.out.println("로그인 된 유저의 아이디는: " + userId);
		}

		if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			System.out.println(userId);
			UserDetails userDetails = this.customUserDetailsService.loadUserByUsername(userId);
			if (jwtTokenProvider.validateToken(jwt)) {
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				usernamePasswordAuthenticationToken
						.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			} else {
				System.out.println(userId);
			}
		}
		filterChain.doFilter(request, response);

	}
//	@Override
//	public void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
//			throws IOException, ServletException {
//		
//		// 헤더에서 JWT 를 받아옵니다.
//		final String authorizationHeader = (HttpServletRequest)request.getHeader("Authorization");
//		String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);
//		
//		
//		// 유효한 토큰인지 확인합니다.
//		if (token != null && jwtTokenProvider.validateToken(token)) {
//			// 토큰이 유효하면 토큰으로부터 유저 정보를 받아옵니다.
//			Authentication authentication = jwtTokenProvider.getAuthentication(token);
//			
//			// SecurityContext 에 Authentication 객체를 저장합니다.
//			SecurityContextHolder.getContext().setAuthentication(authentication);
//			
//			String userId = jwtTokenProvider.getUserPk(token);
//			
//			System.out.println("#########");
//			System.out.println("유효한 사용자");
//			System.out.println("유효한 사용자의 토큰은 " + token); 
//			System.out.println("유효한 사용자의 아이디는 " + userId); 
//			System.out.println("#########");
//		}
//		
//		HttpServletRequest req = (HttpServletRequest)request;
//		if(req.getMethod().equals("POST")) {
//			System.out.println("Login 요청됨");
//			String headerAuth = req.getHeader("Authorization");
//			System.out.println(headerAuth);
//		}
//		
//		chain.doFilter(request, response);
//
//	}
}
