package com.market.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.market.jwt.JwtAuthenticationFilter;
import com.market.jwt.JwtAuthorizationFilter;

import lombok.RequiredArgsConstructor;

// Secutiry 설정을 위한 class
//@RequiredArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	//private final JwtTokenProvider jwtTokenProvider;
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;

	// 암호화에 필요한 PasswordEncoder 를 Bean 등록
	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}
	
    // authenticationManager를 Bean 등록
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

      
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		 http
         .httpBasic().disable() // 기본 인증방식(ID/PW)은 disable 처리. Bearer 방식(Token)을 사용하기 위함.
         .csrf().disable() // csrf 보안 토큰 disable처리.
         .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 사
         .and()
         //.addFilter(corsFilter) // @CrossOrigin(인증X), 시큐리티 필터에 등록 인증(O) 
         .addFilter(new JwtAuthorizationFilter(authenticationManager()))
         .authorizeRequests() // 요청에 대한 사용권한 체크
         .antMatchers("/login", "/api/**").permitAll()
         //.antMatchers("/api/products/**").permitAll()	
         //.antMatchers("/test").hasRole("ADMIN")
         .antMatchers("/mypage").hasRole("USER")	
         //.anyRequest().permitAll() // 그외 나머지 요청은 누구나 접근 가능
         .and()
         .addFilterBefore(jwtAuthenticationFilter,
                 UsernamePasswordAuthenticationFilter.class); // JwtAuthenticationFilter를 UsernamePasswordAuthenticationFilter 전에 넣는다
		 http.cors();
	}
}
