package com.example.FinalExam.Service.Account;

import com.example.FinalExam.Entity.Account.Account;
import com.example.FinalExam.Form.Account.AccountCreateForm;
import com.example.FinalExam.Form.Account.AccountFillerForm;
import com.example.FinalExam.Form.Account.AccountUpdateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;
public interface IAccountService extends UserDetailsService {

    public Page<Account> getAllAccount(Pageable pageable, String search, AccountFillerForm form);

    public void createAccount(AccountCreateForm form);

    public void updateAccount(AccountUpdateForm form);

    public void deleteAccount(int id);

    public Account getAccountByUsername(String username);
}
