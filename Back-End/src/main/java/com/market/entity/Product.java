package com.market.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.transaction.Transactional;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Transactional
@NoArgsConstructor
@Entity
@Table(name = "product")
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer productId;
	
	private String title;
	
	@ManyToOne
	@JoinColumn(name = "categoryId")
	private Category category;
	
	private Integer price;
	private String contents;
	private Date createTime;
	private String productState;
	
	@ManyToOne
	@JoinColumn(name="userId")
	private User user;
	
	private Integer count;
	
	private String pictureUrl;
	
	@Builder
	public Product(String title, Category category,
			Integer price, String contents, Date createTime, String productState, User user, Integer count) {
		this.title = title;
		this.category = category;
		this.price = price;
		this.contents = contents;
		this.createTime = createTime;
		this.productState = productState;
		this.user = user;
		this.count = count;
		
	}
	public void updateImage(String pictureUrl) {
		this.pictureUrl = pictureUrl;
	}

}