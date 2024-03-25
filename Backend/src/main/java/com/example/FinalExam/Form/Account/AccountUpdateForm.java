package com.example.FinalExam.Form.Account;

import com.example.FinalExam.Entity.Account.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PastOrPresent;
import java.util.Date;
@Data
@NoArgsConstructor
public class AccountUpdateForm {
    private Integer id;

    @NotBlank(message = "Bạn không được để trống tên người dùng !!")
    private String firstname;


    @NotBlank (message = "Bạn không được để trống họ người dùng !!")
    private String lastname;


    @NotBlank (message = "Bạn không được để trống tên đăng nhập !!")
    private String username;


    private String password;


    private Role role;

    @PastOrPresent(message = "Bạn không thể truyền một ngày trong tương lai vào đây !!")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date createDate;


}
