package com.market.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.market.entity.Product;
import com.market.service.ProductService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	// Read All
	@GetMapping("/products")
	public List<Product> getPopularProducts() {
//		List<Product> popularList = productService.findPopularProducts();
//		Collections.shuffle(popularList);
		return productService.findPopularProducts();
	}
	
	// Read Detail
	@GetMapping("/products/{productId}")
	public Product getProductDetail(@PathVariable Integer productId) {
		return productService.findProductDetail(productId);
	}
	
	@PostMapping("/products/upload")
	public Product createProduct(@RequestBody Product product) {
		return productService.createProduct(product);
	}
}
