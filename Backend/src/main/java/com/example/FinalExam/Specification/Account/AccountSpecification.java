package com.example.FinalExam.Specification.Account;

import com.example.FinalExam.Entity.Account.Account;
import com.example.FinalExam.Form.Account.AccountFillerForm;
import com.mysql.cj.util.StringUtils;
import org.springframework.data.jpa.domain.Specification;

public class AccountSpecification {
    public static Specification<Account> buildWhere(String search, AccountFillerForm form){

        Specification<Account> where = null;

        if (!StringUtils.isEmptyOrWhitespaceOnly(search) ){
            search = search.trim();
            AccountCustomSpecification name = new AccountCustomSpecification("username",search);
            AccountCustomSpecification firstname = new AccountCustomSpecification("firstname", search);
            AccountCustomSpecification lastname = new AccountCustomSpecification("lastname", search);

            where = Specification.where(name).or(firstname).or(lastname);


        }

        if (form != null &&  form.getRole() != null){
            AccountCustomSpecification role = new AccountCustomSpecification("role", form.getRole());
            if (where == null){
                where = Specification.where(role);
            }
            else {
                where = where.and(role);
            }
        }

        if (form != null &&  form.getCreateDate() != null){
            AccountCustomSpecification createDate = new AccountCustomSpecification("createDate", form.getCreateDate());
            if (where == null){
                where = Specification.where(createDate);
            }
            else {
                where = where.and(createDate);
            }
        }

        if (form != null &&  form.getMinDate() != null){
            AccountCustomSpecification minDate = new AccountCustomSpecification("minDate", form.getMinDate());
            if (where == null){
                where = Specification.where(minDate);
            }
            else {
                where = where.and(minDate);
            }
        }

        if (form != null &&  form.getMaxDate() != null){
            AccountCustomSpecification maxDate = new AccountCustomSpecification("maxDate", form.getMaxDate());
            if (where == null){
                where = Specification.where(maxDate);
            }
            else {
                where = where.and(maxDate);
            }
        }

        return where;

    }
}
