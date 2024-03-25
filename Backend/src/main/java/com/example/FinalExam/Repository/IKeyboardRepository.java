package com.example.FinalExam.Repository;

import com.example.FinalExam.Entity.Keyboard.Keyboard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface IKeyboardRepository extends JpaRepository<Keyboard, Integer>, JpaSpecificationExecutor<Keyboard> {
    public Page<Keyboard> findAll(Pageable pageable);

}
