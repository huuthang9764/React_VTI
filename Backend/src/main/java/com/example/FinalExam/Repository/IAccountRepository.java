package com.example.FinalExam.Repository;

import com.example.FinalExam.Entity.Account.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IAccountRepository extends JpaRepository<Account, Integer>, JpaSpecificationExecutor<Account> {
    public Page<Account> findAll(Pageable pageable);

    Account findByUsername(String username);

}
