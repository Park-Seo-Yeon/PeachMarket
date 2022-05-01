package com.market.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.services.s3.AmazonS3Client;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductImageService {
	private final AmazonS3Client amazonS3Client;
	
	@Value("${cloud.aws.s3.bucket}")
	private String bucketName;
	
	// S3에서 이미지를 String으로 가져오기
	public String getThumbnailPath(String path) {
		return amazonS3Client.getUrl(bucketName, path).toString();
	}

}
