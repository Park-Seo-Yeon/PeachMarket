package com.market.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import io.jsonwebtoken.JwtException;

@Component
public class JwtExceptionFilter extends OncePerRequestFilter {
	
    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException {
        try {
            chain.doFilter(req, res); // go to 'JwtAuthenticationFilter'
        } catch (JwtException ex) {
            setErrorResponse(HttpStatus.UNAUTHORIZED, res, ex);
        }
    }
    
    
    public void setErrorResponse(HttpStatus status, HttpServletResponse res, Throwable ex) throws IOException {
    	System.out.println("jwt 에러 필터");
    	res.setStatus(status.value());
        res.setContentType("application/json; charset=UTF-8");
        
        JSONObject responseJson = new JSONObject();
        responseJson.put("message", ex.getMessage());
        responseJson.put("code", HttpStatus.UNAUTHORIZED);	// 401

        res.getWriter().println(responseJson);

    }
}