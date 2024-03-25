package com.example.FinalExam.Controller;

import com.example.FinalExam.Entity.Account.Account;
import com.example.FinalExam.Service.Account.IAccountService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping(value = "api/v1/auth")
@CrossOrigin("*")
public class AuthController {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IAccountService service;

    @GetMapping("/login")
    public LoginInfoDto login(Principal principal){
        String username = principal.getName();
        Account entity = service.getAccountByUsername(username);

        LoginInfoDto dto = modelMapper.map(entity, LoginInfoDto.class);
        return dto;
    }

}
