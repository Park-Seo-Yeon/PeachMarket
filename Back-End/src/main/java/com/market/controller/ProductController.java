package com.market.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.market.dto.ProductResponseDto;
import com.market.entity.Category;
import com.market.entity.Product;
import com.market.service.ProductService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api")
public class ProductController {
	// Commit Test2
	@Autowired
	private ProductService productService;
	
	// get image test
	@GetMapping("/image")
	public String image() {
		return "hello";
	}
	
	// Read All
	@GetMapping("/products")
	public List<Product> getPopularProducts() {
		// 인기순 정렬 필요
//		List<Product> popularList = productService.findPopularProducts();
//		Collections.shuffle(popularList);
		return productService.findPopularProducts();
	}
	
	// Read Detail
	@GetMapping("/products/{productId}")
	public Product getProductDetail(@PathVariable Integer productId) {
		productService.updateCount(productId);
		Product product = productService.findProductDetail(productId);
		return product;
	}
	
//	@GetMapping("/products/{productId}")
//	public List<String> getProductImage(@PathVariable Integer productId) {
//		List<String> imgSrc = productService.findProductImgSrc(productId);
//		return imgSrc;
//	}
	
	// Create
	@PostMapping("/products")
	public Product createProduct(@RequestBody Product product) {
		System.out.println("@PostMapping(\"/products\")");
		System.out.println(product.toString());
		return productService.createProduct(product);
	}
}
