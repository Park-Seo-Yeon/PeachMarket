package com.market.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseTimeEntity {

    @CreatedDate	// 생성시 날짜 자동 생성
    @Column(updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate	// 수정시 날짜 자동 갱신
    private LocalDateTime modifiedDate;
}
