package com.market.controller;


import java.util.List;
import java.util.Map;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.market.dto.ProductRequestDto;
import com.market.entity.Product;
import com.market.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api")
public class ProductController {

	private final ProductService productService;


	@GetMapping("/products")
	public List<Product> getPopularProducts() {
		// 인기순 정렬 필요
//		List<Product> popularList = productService.findPopularProducts();
//		Collections.shuffle(popularList);
		return productService.findPopularProducts();
	}
	
	// 글 상세보기 
	@GetMapping("/products/{productId}")
	public ResponseEntity<Product> getProductDetail(@PathVariable Integer productId) {
		productService.updateCount(productId);
		//System.out.println("In 컨트롤러: " + productService.findProductDetail(productId));
		return productService.findProductDetail(productId);
	}
	
	// 글 작성 
	@PostMapping("/products")
	public void createProduct(@RequestPart("file") MultipartFile multipartFile, 
			@RequestPart("categoryId") Integer categoryId,
			@RequestPart("data") ProductRequestDto requestDto) throws Exception {
		productService.createProduct(multipartFile, categoryId, requestDto);
	}
	
	// 글 수정 
	@PutMapping("/products/{productId}")
	public ResponseEntity<Product> updateProductById(@PathVariable Integer productId,
			@RequestBody Product product) {
		return productService.updateProduct(productId, product);
	}
	
	// 글 삭제 
	@DeleteMapping("/products/{productId}")
	public ResponseEntity<Map<String, Boolean>> deleteProductById (@PathVariable Integer productId) {
		return productService.deleteProduct(productId);
	
	}

	
}
