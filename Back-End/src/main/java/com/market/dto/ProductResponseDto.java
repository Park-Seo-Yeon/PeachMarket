package com.market.dto;

import java.util.Date;

import com.market.entity.Product;

import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class ProductResponseDto {
	
	private String title;
	private Integer price;
	private String productImg;
	private Date createTime;
	
	public ProductResponseDto(Product product) {
		this.title = product.getTitle();
		this.price = product.getPrice();
	}

}
