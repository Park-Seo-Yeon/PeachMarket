package com.market.dto;

import java.util.Date;

import com.market.entity.Category;
import com.market.entity.Product;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor  // 인자 없이 객체 생성 가능
public class ProductResponseDto {
	
	private String title;
	private String category;
	private Date createTime;
	private String contents;
	private Integer count;
	private Integer price;
	private String productImg;

	
	
//	public Product toEntity(){
//		Product product = Product.builder()
//				.title(title)
//				.category(category)
//				.createTime(createTime)
//				.contents(contents)
//				.count(count)
//				.price(price)
//				.build();
//		return product;
//	}
//	
//
//	@Builder
//	public ProductResponseDto(Product product, Category categoryId) {
//		this.title = product.getTitle();
//		this.category = categoryId.getCategory();
//		this.createTime = product.getCreateTime();
//		this.contents = product.getContents();
//		this.count = product.getCount();
//		this.price = product.getPrice();
//		
//	}

}
