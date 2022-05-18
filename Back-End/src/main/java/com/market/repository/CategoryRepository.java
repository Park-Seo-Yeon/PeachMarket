package com.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.market.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer>  {
	// 카테고리 번호에 따른 카테고리 조회 
	@Query("select c from Category c where c.categoryId=:categoryId")
	Category getCategoryByCategoryId(Integer categoryId);

}
