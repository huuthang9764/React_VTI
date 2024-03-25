package com.example.FinalExam.Service.Account;

import com.example.FinalExam.Entity.Account.Account;
import com.example.FinalExam.Form.Account.AccountCreateForm;
import com.example.FinalExam.Form.Account.AccountFillerForm;
import com.example.FinalExam.Form.Account.AccountUpdateForm;
import com.example.FinalExam.Repository.IAccountRepository;
import com.example.FinalExam.Specification.Account.AccountSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
public class AccountService implements IAccountService {

    @Autowired
    private IAccountRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Page<Account> getAllAccount(Pageable pageable, String search, AccountFillerForm form){

        Specification<Account> where = AccountSpecification.buildWhere(search, form);
        return repository.findAll(where , pageable);

    }

    @Transactional
    public void createAccount(AccountCreateForm form){

        Account account = modelMapper.map(form, Account.class);
        // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
        String encodedPassword = passwordEncoder.encode(account.getPassword());
        account.setPassword(encodedPassword);
        repository.save(account);

    }

    @Transactional
    public void updateAccount(AccountUpdateForm form){

        Account account = modelMapper.map(form, Account.class);
        Account temp = repository.findById(form.getId()).get();
        account.setCreateDate(temp.getCreateDate());
        account.setPassword(temp.getPassword());
        repository.save(account);
    }

    @Transactional
    public void deleteAccount(int id){
        repository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Account account = repository.findByUsername(username);

        if (account == null) {
            throw new UsernameNotFoundException(username);
        }

        return new User(
                account.getUsername(),
                account.getPassword(),
                AuthorityUtils.createAuthorityList(account.getRole().toString()));
    }

    @Override
    public Account getAccountByUsername(String username) {
        return repository.findByUsername(username);
    }




}
