package com.example.FinalExam.Service.Keyboard;

import com.example.FinalExam.Entity.Keyboard.Keyboard;
import com.example.FinalExam.Form.Keyboard.KeyboardCreateForm;
import com.example.FinalExam.Form.Keyboard.KeyboardFillerForm;
import com.example.FinalExam.Form.Keyboard.KeyboardUpdateForm;
import com.example.FinalExam.Repository.IKeyboardRepository;
import com.example.FinalExam.Specification.Keyboard.KeyboardSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class KeyboardService implements IKeyboardService {
    @Autowired
    private IKeyboardRepository repository;

    @Autowired
    private ModelMapper modelMapper;


    public Page<Keyboard> getAllKeyboard(Pageable pageable, String search, KeyboardFillerForm form){
        Specification<Keyboard> where = KeyboardSpecification.buildWhere(search, form);

        return repository.findAll(where, pageable);
    }

    @Transactional
    public void createKeyboard(KeyboardCreateForm form){
        Keyboard keyboard = modelMapper.map(form, Keyboard.class);
        repository.save(keyboard);
    }

    @Transactional
    public void updateKeyboard(KeyboardUpdateForm form){
        Keyboard keyboard = modelMapper.map(form, Keyboard.class);
        keyboard.setCreateDate(repository.findById(form.getId()).get().getCreateDate());
        repository.save(keyboard);
    }

    @Transactional
    public void deleteKeyboard(int id){
        repository.deleteById(id);
    }



}
