package com.market.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.market.service.ProductImageService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class ProductImageController {
	
	@Autowired
	private final ProductImageService productImageService;
	
	@GetMapping("/test") 
	public String index() { 
		return "test"; 
	}
	
	@GetMapping("/success")
    public void findImg() {
        String imgPath = productImageService.getThumbnailPath("clothes1.png");
        // log.info(imgPath);
        System.out.println(imgPath);
    }
	
}
