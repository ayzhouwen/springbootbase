package com.example.im.controller;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.date.DateUtil;
import com.alibaba.fastjson.JSON;
import com.example.im.common.util.ApiResult;
import com.example.im.common.util.Constants.AppVule;
import com.example.im.service.IAppUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Date;
import java.util.Map;

@Controller
@RequestMapping("/appUser")
public class AppUserController {

    private static final Logger log = LoggerFactory.getLogger(AppUserController.class);
    @Autowired
    private IAppUserService  appUserService;

    @Autowired
    private AppVule appVule;
    @Resource(name = "redisTemplateForAnswerDb")
    private RedisTemplate<String,Object> redisTemplateForSessionDb;
    @RequestMapping(value = "/info", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult getUserInfo(@RequestParam Map map){
        Map appuser=appUserService.getUserInfo(map);
        return ApiResult.success(appuser);
    }


//    @RequestMapping(value = "token",method = RequestMethod.POST)
//
//    @ResponseBody
//    public ApiResult token(@RequestParam Map map){
//
//        log.info(Convert.toStr(map.get("userId")));
//
//        long startTime=new Date().getTime();
//        log.info("开始执行时间:"+  startTime);
//
//            TokenBean tokenBean = (TokenBean) redisTemplateForSessionDb.opsForValue().get("user:"+Convert.toStr(map.get("id")));
//
//           // log.info("token:"+tokenBean.getToken());
//
//
//        long timex=DateUtil.spendMs(startTime);
//
//        log.info("执行时间差:"+  timex);
//
//
//        return ApiResult.success("获取token成功");
//
//
//    }
//
//
//
//
//    @RequestMapping(value = "setken",method = RequestMethod.POST)
//
//    @ResponseBody
//    public ApiResult setken(@RequestParam Map map){
//        long startTime=new Date().getTime();
//      log.info("开始执行时间:"+  startTime);
//
//            String token=appVule.robotNames;
//            TokenBean tb=new TokenBean();
//            tb.setToken(token);
//           redisTemplateForSessionDb.opsForValue().set("user:"+Convert.toStr(map.get("id")),tb);
//           // log.info("设置token成功");
//
//
//
//
//        long timex=DateUtil.spendMs(startTime);
//
//        log.info("执行时间差:"+  timex);
//
//
//        return ApiResult.success("设置token成功");
//    }
//










}
