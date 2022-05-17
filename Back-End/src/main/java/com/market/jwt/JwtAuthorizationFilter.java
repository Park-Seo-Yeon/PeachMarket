package com.market.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

// security가 갖고 있는 filter 중 BasicAuthenticationFilter라는 것이 있는데
// 권한이나 인증이 필요한 특정 주소를 요청했을 때 이 필터를 무조건 타게 되어있음 
// 만약 권한이나 인증이 필요한 주소가 아니라면 이 필터를 타지 않음 
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

	public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);	
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException{
		super.doFilterInternal(request, response, chain);
		System.out.println("인증이나 권한이 필요한 주소가 요청됨");
		
		
	}
}
