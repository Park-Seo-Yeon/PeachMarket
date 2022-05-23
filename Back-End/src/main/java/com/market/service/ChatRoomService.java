//package com.market.service;
//
//import java.io.BufferedReader;
//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.FileReader;
//import java.io.IOException;
//import java.sql.Timestamp;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
// 
//import javax.transaction.Transactional;
// 
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//import com.market.entity.ChatRoom;
//import com.market.repository.ChatRoomRepository;
// 
// 
//@Service
//@Transactional
//public class ChatRoomService {
//    
//    @Autowired
//    private ChatRoomRepository chatRoomRepository;
//    
//    //application.properties에 설정
//    @Value("${file.upload.path.txt}")
//    String fileUploadPath; 
// 
////    @Override
//    // 채팅방 생성 
//    public void addChatRoom(ChatRoom chatRoom) throws IOException {
//        
//        Timestamp createdDate = Timestamp.valueOf(LocalDateTime.now());
//        
//        chatRoom.setCreateTime(createdDate);
//        
//        chatRoomRepository.addChatRoom(chatRoom);	
//        
//    }
//    
//    //no connection with DB
//    public List<ChatRoom> readChatHistory(ChatRoom chatRoom) throws IOException {
//        
//        String pathName = fileUploadPath + chatRoom.getFileName();
//        
//        //DB에 저장된 chat.txt 파일을 읽어옴 
//        BufferedReader br = new BufferedReader(new FileReader(pathName));
//        //View에 ChatRoom 객체로 전달
//        ChatRoom chatRoomLines = new ChatRoom();
//        List<ChatRoom> chatHistory = new ArrayList<ChatRoom>();
// 
//        String chatLine;
//        int idx = 1;
//        
//        while ((chatLine = br.readLine()) != null) {
//            
//            //1개 메시지는 3줄(보낸사람,메시지내용,보낸시간)로 구성돼있음
//            int answer = idx % 3;
//            if (answer == 1) {
//                //보낸사람
//                chatRoomLines.setSenderName(chatLine);
//                idx++;
//            } else if (answer == 2) {
//                //메시지내용
//                chatRoomLines.setContent(chatLine);
//                idx++;
//            } else {
//                //보낸시간
//                chatRoomLines.setSendTime(chatLine);
//                //메시지 담긴 ChatRoom 객체 List에 저장
//                chatHistory.add(chatRoomLines);
//                //객체 초기화, 줄(row)인덱스 초기화
//                chatRoomLines = new ChatRoom();
//                idx = 1;
//            }            
//        }
//        
//        return chatHistory;
//    }
//    
//    @Override
//    public void updateFileName(int id, String fileName) {
// 
//        chatRoomMapper.updateFileName(id, fileName);
//    }
//    
//    public void createFile(int pr_id, int id) throws IOException {
//        
//        String fileName = pr_id + "_" + id + ".txt";
//        String pathName = fileUploadPath + fileName;
//        //File 클래스에 pathName 할당
//        File txtFile = new File(pathName);
//        //로컬경로에 파일 생성
//        txtFile.createNewFile();
//        
//        chatRoomMapper.updateFileName(id, fileName);
//    }
//}