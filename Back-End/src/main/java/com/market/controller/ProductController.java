package com.market.controller;


import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.mobile.device.DeviceUtils;
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
	// private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@GetMapping("/deviceCheck")
    public void deviceCheck(Device device) {

		// 모바일 체크
		// Device device = DeviceUtils.getCurrentDevice(request);   
        if (device.isMobile()) {
            System.out.println("[MYTEST] mobile user!");
        } else if (device.isTablet()) {
        	 System.out.println("[MYTEST] tablet user!");
            //logger.info("[MYTEST] tablet user!");
        } else {
        	 System.out.println("[MYTEST] desktop user!");
            //logger.info("[MYTEST] desktop user!");
        }
        System.out.println("[MYTEST]Device : {} " + device);
        System.out.println("[MYTEST]Device Platform : {}" + device.getDevicePlatform());
    }

	@GetMapping("/products")
	public List<Product> getPopularProducts() {
		// 인기순 정렬 필요
//		List<Product> popularList = productService.findPopularProducts();
//		Collections.shuffle(popularList);
		return productService.findPopularProducts();
	}
	
	@GetMapping("/products/{productId}")
	public Product getProductDetail(@PathVariable Integer productId) {
		productService.updateCount(productId);
		Product product = productService.findProductDetail(productId);
		return product;
	}
	
	
	@PostMapping("/products")
	public void createProduct(@RequestPart("file") MultipartFile multipartFile, 
			@RequestPart("categoryId") Integer categoryId,
			@RequestPart("data") ProductRequestDto requestDto) throws Exception {
		productService.createProduct(multipartFile, categoryId, requestDto);
	}
	
	@PutMapping("/products/{productId}")
	public ResponseEntity<Product> updateProductById(@PathVariable Integer productId,
			@RequestBody Product product) {
		return productService.updateProduct(productId, product);
	}
	
	@DeleteMapping("/products/{productId}")
	public ResponseEntity<Map<String, Boolean>> deleteProductById (@PathVariable Integer productId) {
		return productService.deleteProduct(productId);
	
	}

	
}
