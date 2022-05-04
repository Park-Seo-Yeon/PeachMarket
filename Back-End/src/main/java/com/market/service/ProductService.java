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
	
	public List<Product> findPopularProducts() {
		return productRepository.findAll();
		// List<Product> products = productRepository.findAll();
		// test
		
	}
	
	public Product findProductDetail(Integer id) {
		return productRepository.findById(id).get();
	}

	
	// 조회수
	public int updateCount(Integer id) {
		return productRepository.updateCount(id);
	}

	// 글 작성
	public void createProduct(MultipartFile mulfipartFile, Integer categoryId, ProductRequestDto requestDto) 
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
		s3Service.upload(mulfipartFile, product);
		productRepository.save(product);;
	}
	
	// 글 수정
	
	// 글 삭제
	public ResponseEntity<Map<String, Boolean>> deleteProduct(
			Integer productId) {
		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by no : ["+productId+"]"));

		productRepository.delete(product);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Deleted Board Data by id : ["+productId+"]", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}
