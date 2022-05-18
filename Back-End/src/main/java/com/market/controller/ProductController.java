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

import com.market.dto.ProductDto;
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
			@RequestPart("data") ProductDto productDto) throws Exception {
		System.out.println("######글 작성 컨트롤러######: " + productDto);
		productService.createProduct(multipartFile, productDto);
	}
	
	
	// 글 수정 
	@PutMapping("/products/{productId}")
	public ResponseEntity<Product> updateProductById(@PathVariable Integer productId,
			@RequestPart("file") MultipartFile multipartFile, 
			@RequestPart("data") ProductDto productDto) throws Exception {
		System.out.println("######글 수정 컨트롤러######: " + productDto);
		return productService.updateProduct(productId, multipartFile, productDto);
	}
	
	// 글 삭제 
	@DeleteMapping("/products/{productId}")
	public ResponseEntity<Map<String, Boolean>> deleteProductById (@PathVariable Integer productId) {
		return productService.deleteProduct(productId);
	
	}

	
}
