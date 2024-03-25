package com.example.FinalExam.Form.Account;

import lombok.Data;
import lombok.NoArgsConstructor;
import com.example.FinalExam.Entity.Account.Role;
import org.hibernate.validator.constraints.UniqueElements;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor

public class AccountCreateForm {

    @NotBlank (message = "Bạn không được để trống tên người dùng !!")
    private String firstname;

    @NotBlank (message = "Bạn không được để trống họ người dùng !!")
    private String lastname;

    @NotBlank (message = "Bạn không được để trống tên đăng nhập !!")
    private String username;

    @NotBlank (message = "Bạn không được để trống mật khẩu !!")
    private String password;

}
