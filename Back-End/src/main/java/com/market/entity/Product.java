package com.market.entity;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "product")
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer productId;
	
	private String title;
	
	@OneToMany(mappedBy="product", cascade=CascadeType.ALL,
			fetch=FetchType.LAZY)
	@JsonManagedReference
	private Set<ProductImage> productImage;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name = "categoryId")
	private Category category;
	
	private Integer price;
	private String contents;
	private Date createTime;
	private String productState;
	
//	@ManyToOne(cascade=CascadeType.ALL)
//	@JoinColumn(name="user_id")
//	private User userId;
	
	private Integer count;
	
	

}