package com.market.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.market.entity.Category;
import com.market.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryService {
	private final CategoryRepository categoryRepository;

	
	public Category getCategoryByCategoryId(Integer categoryId) {
		return categoryRepository.getCategoryByCategoryId(categoryId);
	}
}
