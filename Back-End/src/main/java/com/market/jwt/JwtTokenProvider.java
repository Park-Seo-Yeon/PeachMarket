package com.market.jwt;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.market.service.CustomUserDetailsService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

/* JWT 토큰 생성, 토큰 복호화 및 정보 추출, 토큰 유효성 검증의 기능이 구현된 클래스  */
@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

	@Value("${jwt.secret}")
    private String SECRET_KET;

    // 토큰 유효시간 30분
    private static final long ACCESS_TOKEN_EXPIRE_TIME  = 1000 * 60 ; // 30분 
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;
    
    private final CustomUserDetailsService customuserDetailsService;

    // 객체 초기화, secretKey를 Base64로 인코딩한다.
    @PostConstruct
    protected void init() {
    	SECRET_KET = Base64.getEncoder().encodeToString(SECRET_KET.getBytes());
    }

    // access token 생성 
    public String createToken(String userPk, List<String> roles) {
        Claims claims = Jwts.claims().setSubject(userPk); // JWT payload 에 저장되는 정보단위
        claims.put("roles", roles); // 정보는 key / value 쌍으로 저장된다.
        Date now = new Date();
        String jwtToken = Jwts.builder()
                .setClaims(claims) // 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + ACCESS_TOKEN_EXPIRE_TIME)) // 토큰 만료 시
                .signWith(SignatureAlgorithm.HS256, SECRET_KET)  // 사용할 암호화 알고리즘과 
                                                                // signature 에 들어갈 secret값 세팅
                .compact();
        return jwtToken;
    }
    
    // refresh token 생성 
    public String createRefreshToken(String userPk, List<String> roles) {
    	Claims claims = Jwts.claims().setSubject(userPk); // JWT payload 에 저장되는 정보단위
        claims.put("roles", roles); // 정보는 key / value 쌍으로 저장된다.
    	Date now = new Date();
    	String jwtRefreshToken = Jwts.builder()
    			.setClaims(claims) // 정보 저장
    			.setIssuedAt(now)
    			.setExpiration(new Date(now.getTime() + REFRESH_TOKEN_EXPIRE_TIME))
    			.signWith(SignatureAlgorithm.HS256, SECRET_KET) 
    			.compact();
    	return jwtRefreshToken;
    	
    }

    // JWT 토큰에서 인증 정보 조회
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = customuserDetailsService.loadUserByUsername(this.getUserPk(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // 토큰에서 회원 정보 추출
    public String getUserPk(String token) {
        return Jwts.parser().setSigningKey(SECRET_KET).parseClaimsJws(token).getBody().getSubject();
    }


    // Request의 Header에서 access token 값을 가져온다 
    public String resolveAccessToken(HttpServletRequest request) {
        return request.getHeader("X-AUTH-TOKEN");
    }
    
    // Request의 Header에서 refresh token 값을 가져온다 
    public String resolveRefreshToken(HttpServletRequest request) {
        return request.getHeader("REFRESH-TOKEN");
    }
    

    // 토큰의 유효성 + 만료일자 확인
    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(SECRET_KET).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}