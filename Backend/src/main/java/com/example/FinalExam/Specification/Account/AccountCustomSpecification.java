package com.example.FinalExam.Specification.Account;

import com.example.FinalExam.Entity.Account.Account;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.Date;

@RequiredArgsConstructor
public class AccountCustomSpecification implements Specification<Account> {

    @NonNull
    private String field;

    @NonNull
    private Object value;


    @Override
    public Predicate toPredicate(
                Root<Account> root,
                CriteriaQuery<?> query,
                CriteriaBuilder criteriaBuilder) {

        if (field.equalsIgnoreCase("username")){
            return criteriaBuilder.like(root.get("username"), "%" + value + "%");
        }

        if (field.equalsIgnoreCase("lastname")){
            return criteriaBuilder.like(root.get("lastname"), "%" + value + "%");
        }

        if (field.equalsIgnoreCase("firstname")){
            return criteriaBuilder.like(root.get("firstname"), "%" + value + "%");
        }

        if (field.equalsIgnoreCase("role")){
            return criteriaBuilder.equal(root.get("role"), value);
        }

        if (field.equalsIgnoreCase("createDate")){
            return criteriaBuilder.equal(root.get("createDate").as(java.sql.Date.class), value);
        }

        if (field.equalsIgnoreCase("minDate")){
            return criteriaBuilder.greaterThanOrEqualTo(root.get("createDate").as(java.sql.Date.class), (Date) value);
        }

        if (field.equalsIgnoreCase("maxDate")){
            return criteriaBuilder.lessThanOrEqualTo(root.get("createDate").as(java.sql.Date.class), (Date) value);
        }

        return null;

    }
}
