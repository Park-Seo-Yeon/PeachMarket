package com.market.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
	Optional<User> findByUserId(String userId);
}
