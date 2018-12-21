package com.example.im;


import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.im.mapper")
public class BaseBootApplication {
	private static final Logger log = LoggerFactory.getLogger(BaseBootApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(BaseBootApplication.class, args);
	}
}
