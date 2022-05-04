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

    public String upload(MultipartFile file, Product product) throws IOException {
        String fileName = UUID.randomUUID() + file.getOriginalFilename();

        s3Client.putObject(new PutObjectRequest(bucket, fileName, file.getInputStream(), null)
                .withCannedAcl(CannedAccessControlList.PublicRead));

        String pictureUrl =  s3Client.getUrl(bucket, fileName).toString();
        product.updateImage(pictureUrl);

        return "upload";
    }

//    private final AmazonS3 amazonS3;
//
//    @Value("${cloud.aws.s3.bucket}")
//    private String bucket;
//
//    public AwsS3 upload(MultipartFile multipartFile, String dirName) throws IOException {
//        File file = convertMultipartFileToFile(multipartFile)
//                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File convert fail"));
//
//        return upload(file, dirName);
//    }
//
//    private AwsS3 upload(File file, String dirName) {
//        String key = randomFileName(file, dirName);
//        String path = putS3(file, key);
//        removeFile(file);
//
//        return AwsS3
//                .builder()
//                .key(key)
//                .path(path)
//                .build();
//    }
//
//    private String randomFileName(File file, String dirName) {
//        return dirName + "/" + UUID.randomUUID() + file.getName();
//    }
//
//    private String putS3(File uploadFile, String fileName) {
//        amazonS3.putObject(new PutObjectRequest(bucket, fileName, uploadFile)
//                .withCannedAcl(CannedAccessControlList.PublicRead));
//        return getS3(bucket, fileName);
//    }
//
//    private String getS3(String bucket, String fileName) {
//        return amazonS3.getUrl(bucket, fileName).toString();
//    }
//
//    private void removeFile(File file) {
//        file.delete();
//    }
//
//    public Optional<File> convertMultipartFileToFile(MultipartFile multipartFile) throws IOException {
//        File file = new File(System.getProperty("user.dir") + "/" + multipartFile.getOriginalFilename());
//
//        if (file.createNewFile()) {
//            try (FileOutputStream fos = new FileOutputStream(file)){
//                fos.write(multipartFile.getBytes());
//            }
//            return Optional.of(file);
//        }
//        return Optional.empty();
//    }
//
//    public void remove(AwsS3 awsS3) {
//        if (!amazonS3.doesObjectExist(bucket, awsS3.getKey())) {
//            throw new AmazonS3Exception("Object " +awsS3.getKey()+ " does not exist!");
//        }
//        amazonS3.deleteObject(bucket, awsS3.getKey());
//    }
}