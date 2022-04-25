package com.market.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.market.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
//	@Query("select p.title, c.category, p.price, p.contents, p.productState,"
//			+  "p.createTime, p.count"
//			+ "from Product p, Category c"
//			+ "where p.productId=:productId")
//	List<Product> findProductById(@Param("productId") Integer productId);

}
