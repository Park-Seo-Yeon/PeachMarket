package com.market.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.market.dto.ProductDto;
import com.market.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	// 메인 
	@Query(value="select * from product p where p.product_state!=\"판매완료\" order by p.count desc", nativeQuery = true)
	List<Product> findPopularList();
	
	// 카테고리 선택시
	@Query(value="select * from product p where p.product_state!=\"판매완료\" and p.category_id=:categoryId order by p.count desc", nativeQuery=true)
	List<Product> findPopularListWithCategory(Integer categoryId);
	
	// 조회수
	@Modifying
	@Query("update Product p set p.count = p.count + 1 where p.productId = :productId")
	int updateCount(Integer productId);

	@Query(value="select user_id from product p where product_id = :productId", nativeQuery = true)
	String findUserByProduct(Integer productId);
}
