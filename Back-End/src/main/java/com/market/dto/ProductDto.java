package com.market.dto;

import java.util.Date;

import com.market.entity.Category;
import com.market.entity.Product;
import com.market.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ProductDto {
	private Integer id;
	private String title;
	
	private Integer categoryId;	// front에서 받아오는 용도 
	private Category category;
	
	private Integer price;
	private String contents;
	private Date createTime;
	private String productState;
	private Integer count;
	
	private String userId;	// front에서 받아오는 용
	private User user; 
	
	@Builder
	public ProductDto(Product entity) {
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
