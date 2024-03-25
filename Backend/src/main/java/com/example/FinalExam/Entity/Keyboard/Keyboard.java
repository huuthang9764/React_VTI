package com.example.FinalExam.Entity.Keyboard;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "Keyboard")
@Data

public class Keyboard implements Serializable {
    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name",  nullable = false)
    private String name;

    @Column(name = "brand")
    @Enumerated(EnumType.STRING)
    private Type type;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "created_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date createDate;

    @PrePersist
    public void prePersist(){
        if (createDate == null){
            createDate = new Date();
        }

    }

}
