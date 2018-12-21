package com.example.im.common.util.Constants;

import cn.hutool.core.util.RandomUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppVule {

    @Value("${spring.redis.host}")
    public String redisHost;

    @Value("${spring.redis.port}")
    public String redisPort;

    @Value("${spring.redis.password}")
    public String redisPassword;

}
