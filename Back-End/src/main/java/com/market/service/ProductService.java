package com.market.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.market.dto.ProductResponseDto;
import com.market.entity.Product;
import com.market.repository.ProductRepository;


@Service
@Transactional
public class ProductService {
	@Autowired
	private ProductRepository productRepository;
	
	public List<Product> findPopularProducts() {
		return productRepository.findAll();
		// List<Product> products = productRepository.findAll();
		// test
		
	}
	
	public Product findProductDetail(Integer id) {
		return productRepository.findById(id).get();
	}

	
	public Product createProduct(Product product) {
		return productRepository.save(product);
	}
	
	
}
