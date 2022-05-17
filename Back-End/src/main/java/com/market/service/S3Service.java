package com.market.service;

import java.io.IOException;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.market.entity.Product;

import lombok.NoArgsConstructor;

@Service
@NoArgsConstructor
public class S3Service {
    private AmazonS3 s3Client;

    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.region.static}")
    private String region;

    @PostConstruct
    public void setS3Client() {
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);

        s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(this.region)
                .build();
    }

    // 게시글을 올릴 때 첨부되는 사진 
    public String upload(MultipartFile file, Product product) throws IOException {
        String fileName = "data/origin-cloth/" + UUID.randomUUID() + file.getOriginalFilename();	// 파일명 중복 방지를 위해 원본 파일명 앞에 UUID를 랜덤으로 생성한다 
        s3Client.putObject(new PutObjectRequest(bucket, fileName, file.getInputStream(), null)
                .withCannedAcl(CannedAccessControlList.PublicRead));

        String pictureUrl =  s3Client.getUrl(bucket, fileName).toString();
        product.updateImage(pictureUrl);

        return "upload-clothe";
    }
    
    // 모델 생성 시, 사용되는 사용자의 셀카 이미지 
//    public String uploadUserSelca(MultipartFile file, String userId) throws IOException {
//    	String fileName = "selca/" + userId + ".jpg";	// jpg? png?
//    	
//    	s3Client.putObject(new PutObjectRequest(bucket, fileName, file.getInputStream(), null)
//    		.withCannedAcl(CannedAccessControlList.PublicRead));
//    	
//    	return "upload-user-selca";
//    }

}