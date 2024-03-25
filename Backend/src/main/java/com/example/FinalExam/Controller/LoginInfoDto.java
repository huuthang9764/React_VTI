package com.example.FinalExam.Controller;

import com.example.FinalExam.Entity.Account.Role;
import lombok.Data;

@Data
public class LoginInfoDto {
    public int id;
    public String username;
    public String lastname;
    public Role role;
}
