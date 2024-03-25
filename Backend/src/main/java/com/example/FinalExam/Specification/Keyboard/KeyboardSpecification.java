package com.example.FinalExam.Specification.Keyboard;

import com.example.FinalExam.Entity.Keyboard.Keyboard;
import com.example.FinalExam.Form.Keyboard.KeyboardFillerForm;
import com.mysql.cj.util.StringUtils;
import org.springframework.data.jpa.domain.Specification;

public class KeyboardSpecification {
    public static Specification<Keyboard> buildWhere(String search, KeyboardFillerForm form){
        Specification <Keyboard> where = null;

        if (!StringUtils.isEmptyOrWhitespaceOnly(search) ){
            search = search.trim();
            KeyboardCustomSpecification name =  new KeyboardCustomSpecification("search", search);
            where = Specification.where(name);
        }

        if (form != null && form.getType() != null){
            KeyboardCustomSpecification type = new KeyboardCustomSpecification("type", form.getType());
            if (where == null){
                where = Specification.where(type);
            }
            else where = where.and(type);
        }


        if (form != null && form.getMinPrice()!= null){
            KeyboardCustomSpecification minPrice = new KeyboardCustomSpecification("minPrice", form.getMinPrice() );
            if (where == null){
                where = Specification.where(minPrice);
            }
            else where = where.and(minPrice);
        }

        if (form != null && form.getMaxPrice() != null){
            KeyboardCustomSpecification maxPrice = new KeyboardCustomSpecification("maxPrice", form.getMaxPrice());
            if (where == null){
                where = Specification.where(maxPrice);
            }
            else where = where.and(maxPrice);
        }

        if (form != null && form.getCreateDate() != null){
            KeyboardCustomSpecification createDate = new KeyboardCustomSpecification("createDate", form.getCreateDate());
            if (where == null){
                where = Specification.where(createDate);
            }
            else where = where.and(createDate);
        }

        if (form != null && form.getMinDate() != null){
            KeyboardCustomSpecification minDate = new KeyboardCustomSpecification("minDate", form.getMinDate());
            if (where == null){
                where = Specification.where(minDate);
            }
            else where = where.and(minDate);
        }

        if (form != null && form.getMaxDate() != null){
            KeyboardCustomSpecification maxDate = new KeyboardCustomSpecification("maxDate", form.getMaxDate());
            if (where == null){
                where = Specification.where(maxDate );
            }
            else where = where.and(maxDate );
        }

        return where;
    }
}
