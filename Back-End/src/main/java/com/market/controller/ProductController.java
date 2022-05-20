package com.market.controller;


import java.util.List;
import java.util.Map;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "*")
@RequestMapping("/api/products")
public class ProductController {

	private final ProductService productService;

	// 메인 페이지에서 인기순으로 정렬된 상품 목록을 가져온다. 
	@GetMapping("/")
	public ResponseEntity<List<Product>> getPopularProducts() {
		return productService.findPopularProducts();
	}
	
	// 카테고리 번호에 따른 페이지 로딩 
//	@PostMapping("/{categoryId}")
//	public List<Product> getCategoryById(@PathVariable Integer categoryId) {
//		System.out.println("#########: " + categoryId);
//		return productService.findProductByCategory(categoryId);
//	}
	
	// 글 상세보기 
	@GetMapping("/{productId}")
	public ResponseEntity<Product> getProductDetail(@PathVariable Integer productId) {
		productService.updateCount(productId);
		return productService.findProductDetail(productId);
	}

	// 글 작성 
	@PostMapping("/create")
	public void createProduct(@RequestPart("file") MultipartFile multipartFile, 
			@RequestPart("data") ProductDto productDto) throws Exception {
		productService.createProduct(multipartFile, productDto);
	}
	
	
	// 글 수정 
	@PutMapping("/edit/{productId}")
	public void updateProductById(@PathVariable Integer productId,
			@RequestPart(required=false, value="file") MultipartFile multipartFile, 
			@RequestPart("data") ProductDto productDto) throws Exception {
		productService.updateProduct(productId, multipartFile, productDto);
	}
	
	// 글 삭제 
	@DeleteMapping("/delete/{productId}")
	public ResponseEntity<Map<String, Boolean>> deleteProductById (@PathVariable Integer productId) throws Exception {
		return productService.deleteProduct(productId);
	
	}

	
}
