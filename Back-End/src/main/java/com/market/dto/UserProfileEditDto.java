package com.market.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserProfileEditDto {

	// private String userId;
	
	private String nickname;

	// private String profileImg;
	
	private char gender;
	
	private Double height;
	
	private Double weight;
	
	
}
