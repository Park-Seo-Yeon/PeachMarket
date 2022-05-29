package com.market.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.market.dto.UserProfileEditDto;
import com.market.entity.User;
import com.market.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	
	// 마이페이지
	@GetMapping("/mypage")
	public User getMyPage() {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String userId = userDetails.getUsername();
		return userService.findUserById(userId);

	}
	
	// 프로필 수정 (닉네임, 프로필사진, 성별, 키, 몸무게)
	@PostMapping("/mypage/update/{userId}")
	public User updateMyPage(@PathVariable String userId, @RequestBody UserProfileEditDto userProfileEditDto) {
		return userService.updateMyPage(userId, userProfileEditDto);
	}


}