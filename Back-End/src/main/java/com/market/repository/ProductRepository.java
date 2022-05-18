package com.market.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.market.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	// 조회수(중복 증가) 
	@Query(value="select * from product p order by p.count desc", nativeQuery = true)
	List<Product> findPopularList();
	
	@Modifying
	@Query("update Product p set p.count = p.count + 1 where p.productId = :productId")
	int updateCount(Integer productId);
	
}
