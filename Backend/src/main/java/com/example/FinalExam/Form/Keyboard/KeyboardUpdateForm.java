package com.example.FinalExam.Form.Keyboard;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.example.FinalExam.Entity.Keyboard.Type;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.PositiveOrZero;
import java.util.Date;

@Data
@NoArgsConstructor
public class KeyboardUpdateForm {

    private Integer id;

    @NotBlank(message = "Bạn không được để trống tên của sản phẩm !!")
    private String name;

    private Type type;

    @NotNull(message = "Bạn không được để trống giá của sản phẩm !!")
    @PositiveOrZero(message = "Bạn không được để giá trị âm cho giá!!")
    private Integer price;

    @PastOrPresent(message = "Bạn không thể truyền một ngày trong tương lai vào đây !!")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date createDate;
}
