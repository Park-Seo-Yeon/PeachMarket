package com.market.service;

import org.springframework.stereotype.Service;

import com.market.dto.UserProfileEditDto;
import com.market.entity.Product;
import com.market.entity.User;
import com.market.exception.ResourceNotFoundException;
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

	// 프로필 수정
	public User updateMyPage(String userId, UserProfileEditDto userProfileEditDto) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Not exist User by Id : [" + userId + "]"));
		user.setGender(userProfileEditDto.getGender());
		user.setNickname(userProfileEditDto.getNickname());
		user.setHeight(userProfileEditDto.getHeight());
		user.setWeight(userProfileEditDto.getWeight());

		return userRepository.save(user);

	}
}
