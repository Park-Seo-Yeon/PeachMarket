package com.market.service;


import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.market.dto.ProductRequestDto;
import com.market.entity.Product;
import com.market.exception.ResourceNotFoundException;
import com.market.repository.ProductRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {
	
	private final ProductRepository productRepository;
	private final CategoryService categoryService;
	private final S3Service s3Service;
	
	// 메인 홈에서 보여지는 상품 리스트
	public List<Product> findPopularProducts() {
		return productRepository.findPopularList();
		// List<Product> products = productRepository.findAll();
		// test
		
	}

	// 글 상세보기 
	public ResponseEntity<Product> findProductDetail(Integer id) {
		 Product product = productRepository.findById(id)
				 .orElseThrow(() -> new ResourceNotFoundException("Not exist Product Data by id : [" + id + "]"));
		 System.out.println("In ProductService = 보내진 상품 정보: " + product);
		 System.out.println(product.getUserId());
		return ResponseEntity.ok(product);
	}
	// 글 작성
	public void createProduct(MultipartFile multipartFile, Integer categoryId, ProductRequestDto requestDto) 
			throws Exception {
		requestDto.setCategory(categoryService.getCategoryByCategoryId(categoryId));
		requestDto.setCreateTime(new Date());
		requestDto.setProductState("판매중");
		requestDto.setCount(0);
		
		Product product = new Product(
				requestDto.getTitle(),
				requestDto.getCategory(),
				requestDto.getPrice(),
				requestDto.getContents(),
				requestDto.getCreateTime(),
				requestDto.getProductState(),
				requestDto.getCount()
		);
		s3Service.upload(multipartFile, product);
		productRepository.save(product);
	}
	
	// 글 수정
	public ResponseEntity<Product> updateProduct(Integer productId, Product updatedProduct)  {
		
		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Not exist Product by Id : ["+productId+"]"));
		
		product.setTitle(updatedProduct.getTitle());
		product.setPrice(updatedProduct.getPrice());
		product.setContents(updatedProduct.getContents());
		Product endUpdateProduct = productRepository.save(product);
		
		return ResponseEntity.ok(endUpdateProduct);
	}
	
	
	// 글 삭제
	public ResponseEntity<Map<String, Boolean>> deleteProduct(
			Integer productId) {
		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Not exist Product by Id : ["+productId+"]"));

		productRepository.delete(product);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Deleted Board Data by id : ["+productId+"]", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	// 조회수 기능 
	public int updateCount(Integer id) {
		return productRepository.updateCount(id);
	}
	
}
