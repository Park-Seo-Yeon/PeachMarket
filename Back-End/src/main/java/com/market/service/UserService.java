package com.market.service;



import org.springframework.stereotype.Service;

import com.market.entity.User;

import com.market.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

	private final UserRepository userRepository;

	// 유저 조회
	public User findUserById(String userId) {
		return userRepository.findById(userId).get();
	}

}
