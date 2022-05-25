package com.market.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.market.jwt.JwtAuthenticationEntryPoint;
import com.market.jwt.JwtAuthenticationFilter;

// Secutiry 설정
@CrossOrigin(origins = "*")
@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	@Bean
	public JwtAuthenticationFilter authenticationJwtTokenFilter() {
		return new JwtAuthenticationFilter();
	}
	
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
    public void configure(WebSecurity web) {
    	web
    		.ignoring()
    		.antMatchers("/h2-console/**", "/favicon.ico");
     }
     
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		 http
         .httpBasic().disable() // 기본 인증방식(ID/PW)은 disable 처리. Bearer 방식(Token)을 사용하기 위함.
         .csrf().disable() // csrf 보안 토큰 disable처리.
         .exceptionHandling()
         .authenticationEntryPoint(jwtAuthenticationEntryPoint)
         .and()
         .authorizeRequests() // 요청에 대한 사용권한 체크
         //.addFilter(corsFilter) // @CrossOrigin(인증X), 시큐리티 필터에 등록 인증(O) 
         //.addFilter(new JwtAuthorizationFilter(authenticationManager()))
        
         .antMatchers("/join", "/login", "/api/products/**", "/refresh").permitAll()	
         .antMatchers( "/mypage/**", "/api/products/create", "/api/products/edit", "/api/products/delete/**").hasRole("USER")
         .anyRequest().denyAll()
         .and()
         .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 사용 X 
         .and()
         .addFilterBefore(jwtAuthenticationFilter,UsernamePasswordAuthenticationFilter.class);
		 http.cors();
	}
}
