package com.market.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.market.repository.UserRepository;

import lombok.RequiredArgsConstructor;

// 인증에 필요한 UserDetailsService interface의 loadUserByUsername 메서드를 구현하는 클래스로 
// loadUserByUsername 메서드를 통해 Database에 접근하여 사용자 정보를 가지고 온다.
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
	@Autowired
	private final UserRepository userRepository;

	
	// 유효한 사용자일 경우 
    @Override
    public UserDetails loadUserByUsername(String userId) 
    		throws UsernameNotFoundException {
    	System.out.println("CustomUserDetailsService의 loadUserByUsername()");
        return userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
    }
 
}