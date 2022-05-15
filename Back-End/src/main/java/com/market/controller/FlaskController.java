package com.market.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FlaskController {
	@GetMapping("/flaskTest")
	public String Test() {
		//ModelAndView mav = new ModelAndView();

		String url = "http://127.0.0.1:5000/toSpring";
		String sb = "";
		try {
			HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();

			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));

			String line = null;

			while ((line = br.readLine()) != null) {
				sb = sb + line + "\n";
			}
			System.out.println("flask에서 가져온 값: " + sb.toString());
			if (sb.toString().contains("ok")) {
				System.out.println("test");

			}
			br.close();

			System.out.println("" + sb.toString());
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//		mav.addObject("test1", sb.toString()); // "test1"는 jsp파일에서 받을때 이름,
//		// sb.toString은 value값(여기에선 test)
//		mav.addObject("fail", false);
//		mav.setViewName("test"); // jsp파일 이름
		return sb;
	}
}
