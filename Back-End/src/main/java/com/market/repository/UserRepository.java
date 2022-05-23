package com.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.entity.User;

public interface UserRepository extends JpaRepository<User, String> {

}
