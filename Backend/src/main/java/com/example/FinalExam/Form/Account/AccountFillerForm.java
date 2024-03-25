package com.example.FinalExam.Form.Account;

import com.example.FinalExam.Entity.Account.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@NoArgsConstructor
public class AccountFillerForm {

    private Role role;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date createDate;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date minDate;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date maxDate;

}
