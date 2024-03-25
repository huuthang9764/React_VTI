package com.example.FinalExam.Form.Account;

import com.example.FinalExam.Entity.Account.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NonNull;

import java.util.Date;

@Data
public class AccountDTO {
    @NonNull
    private int id;

    @NonNull
    private String username;

    @NonNull
    private String firstname;

    @NonNull
    private String lastname;

    @NonNull
    private Role role;

    @NonNull
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date createDate;

    public AccountDTO(){}
}
