package com.market.service;

import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.market.dto.ProductRequestDto;
import com.market.entity.Product;
import com.market.entity.User;
import com.market.repository.UserRepository;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Service
public class UserService {
	
	private final UserRepository userRepository;
	
	// 상품 상세페이지
	public User findUserById(String userId) {
		return userRepository.findById(userId).get();
	}

}
