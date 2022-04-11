package com.market.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User {
	
	@Id
	private String userId;
	
	private String password;
	
	private String nickname;
	
	private String profileImg;
	
	private String modelImg;
	
	private char gender;
	
	private Double height;
	
	private Double weight;
}
