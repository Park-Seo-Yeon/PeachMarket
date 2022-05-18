package com.market.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.market.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
	Optional<User> findByUserId(String userId);
	
	// 상품목록 + 유저 정보 -> 여러 개의 레코드 리턴
//	@Query("select p.productId, p.title, p.price, p.pictureUrl, p.productState, "
//			+ "u.userId, u.nickname, u.profileImg, u.modelImg, u.gender, u.height, u.weight "
//			+ "from Product p, User u "
//			+ "where u.userId = p.userId and "
//			+ "u.userId = :userId")
	

}
