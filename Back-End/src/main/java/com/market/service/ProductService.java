package com.market.service;


import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.market.dto.ProductDto;
import com.market.entity.Product;
import com.market.exception.ResourceNotFoundException;
import com.market.repository.ProductRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {
	
	private final ProductRepository productRepository;
	private final UserService userService;
	private final CategoryService categoryService;
	private final S3Service s3Service;
	
	// 메인 홈에서 보여지는 상품 리스트
	public ResponseEntity<List<Product>> findPopularProducts() {
		List<Product> products = productRepository.findPopularList();
		return ResponseEntity.ok(products);
		
	}
	
	public ResponseEntity<List<Product>> findProductsByCategory(Integer categoryId) {
		List<Product> products = productRepository.findPopularListWithCategory(categoryId);
		return ResponseEntity.ok(products);
	}
	
	// 글 상세보기 
	public ResponseEntity<Product> findProductDetail(Integer id) {
		 Product product = productRepository.findById(id)
				 .orElseThrow(() -> new ResourceNotFoundException("Not exist Product Data by id : [" + id + "]"));
		return ResponseEntity.ok(product);
	}

	// 글 작성
	public void createProduct(MultipartFile multipartFile, ProductDto createdProductDto) 
		throws Exception {
		
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String userId = userDetails.getUsername();
		System.out.println(userId);
		
			createdProductDto.setCategory(categoryService.getCategoryByCategoryId(createdProductDto.getCategoryId()));
			createdProductDto.setCreateTime(new Date());
			createdProductDto.setProductState("판매중");
			createdProductDto.setCount(0);
			createdProductDto.setUser(userService.findUserById(userId));
		
		Product product = new Product(
				createdProductDto.getTitle(),
				createdProductDto.getCategory(),
				createdProductDto.getPrice(),
				createdProductDto.getContents(),
				createdProductDto.getCreateTime(),
				createdProductDto.getProductState(),
				createdProductDto.getUser(),
				createdProductDto.getCount()
		);
		s3Service.upload(multipartFile, product);
		productRepository.save(product);
	}
	

	// 글 수정 
	public void updateProduct(String userId, Integer productId, MultipartFile multipartFile,
			ProductDto updatedProductDto) throws Exception {

		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Not exist Product by Id : ["+productId+"]"));
		
		String productOwner = productRepository.findUserByProduct(productId);	// 원글 작성자 ID
		
		// 수정을 요청한 사용자ID가 글 작성자의 ID와 같은지 비교 
		if (!(userId.equals(productOwner))) {
			System.out.println("글 작성자만 수정 가능합니다.");
		} else {
			product.setTitle(updatedProductDto.getTitle());	 // 제목
			product.setCategory(categoryService.getCategoryByCategoryId(updatedProductDto.getCategoryId())); // 카테고리
			product.setPrice(updatedProductDto.getPrice());	// 가격
			product.setProductState(updatedProductDto.getProductState()); // 판매 상태 
			product.setContents(updatedProductDto.getContents());	// 내용
			
			if (multipartFile != null) {
				s3Service.upload(multipartFile, product);
			}
			productRepository.save(product);
		}
		
		
	}
	
	
	// 글 삭제
	public ResponseEntity<Map<String, Boolean>> deleteProduct(
			Integer productId) {
		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Not exist Product by Id : ["+productId+"]"));

		productRepository.delete(product);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Deleted Product by id : ["+productId+"]", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	// 조회수
	public int updateCount(Integer id) {
		return productRepository.updateCount(id);
	}
	
}
