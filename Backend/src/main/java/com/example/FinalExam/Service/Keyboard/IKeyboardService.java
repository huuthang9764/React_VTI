package com.example.FinalExam.Service.Keyboard;

import com.example.FinalExam.Entity.Keyboard.Keyboard;
import com.example.FinalExam.Form.Keyboard.KeyboardCreateForm;
import com.example.FinalExam.Form.Keyboard.KeyboardFillerForm;
import com.example.FinalExam.Form.Keyboard.KeyboardUpdateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IKeyboardService {
    public Page<Keyboard> getAllKeyboard(Pageable pageable, String search, KeyboardFillerForm form);

    public void createKeyboard(KeyboardCreateForm form);

    public void updateKeyboard(KeyboardUpdateForm form);

    public void deleteKeyboard(int id);


    }
