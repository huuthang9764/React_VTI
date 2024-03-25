package com.example.FinalExam.Specification.Keyboard;

import com.example.FinalExam.Entity.Keyboard.Keyboard;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.Date;

@RequiredArgsConstructor

public class KeyboardCustomSpecification implements Specification<Keyboard> {

    @NonNull
    private String field;

    @NonNull
    private Object value;

    @Override
    public Predicate toPredicate(
            Root<Keyboard> root,
            CriteriaQuery<?> query,
            CriteriaBuilder criteriaBuilder) {

        if (field.equalsIgnoreCase("search")){
            return criteriaBuilder.like(root.get("name"), "%" + value + "%");
        }

        if (field.equalsIgnoreCase("type")){
            return criteriaBuilder.equal(root.get("type"), value);
        }

        if (field.equalsIgnoreCase("minPrice")){
            return criteriaBuilder.greaterThanOrEqualTo(root.get("price"), (Integer) value);
        }

        if (field.equalsIgnoreCase("maxPrice")){
            return criteriaBuilder.lessThanOrEqualTo(root.get("price"), (Integer) value);
        }

        if (field.equalsIgnoreCase("createDate")){
            return criteriaBuilder.equal(root.get("createDate").as(java.sql.Date.class), value);
        }

        if (field.equalsIgnoreCase("minDate")){
            return criteriaBuilder.greaterThanOrEqualTo(root.get("createDate").as(java.sql.Date.class), (Date)  value);
        }

        if (field.equalsIgnoreCase("maxDate")){
            return criteriaBuilder.lessThanOrEqualTo(root.get("createDate").as(java.sql.Date.class), (Date)  value);
        }

        return null;
    }
}
