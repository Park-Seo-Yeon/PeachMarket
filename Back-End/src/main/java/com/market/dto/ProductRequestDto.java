package com.market.dto;

import java.util.Date;

import com.market.entity.Category;
import com.market.entity.Product;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ProductRequestDto {
	private Integer id;
	private String title;
	
	private Category category;
	
	private Integer price;
	private String contents;
	private Date createTime;
	private String productState;
	private Integer count;
	
	@Builder
	public ProductRequestDto(Product entity) {
		this.id = entity.getProductId();
		this.title = entity.getTitle();
		this.category = entity.getCategory();
		this.price = entity.getPrice();
		this.contents = entity.getContents();
		this.createTime = entity.getCreateTime();	
		this.productState = entity.getProductState();
		this.count = entity.getCount();
	}

	public void setCategory(Integer categoryId, String categoryIdByName) {
	
		
	}

}
