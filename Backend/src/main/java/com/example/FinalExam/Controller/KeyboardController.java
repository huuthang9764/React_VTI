package com.example.FinalExam.Controller;

import com.example.FinalExam.Entity.Keyboard.Keyboard;
import com.example.FinalExam.Form.Keyboard.KeyboardCreateForm;
import com.example.FinalExam.Form.Keyboard.KeyboardFillerForm;
import com.example.FinalExam.Form.Keyboard.KeyboardUpdateForm;
import com.example.FinalExam.Service.Keyboard.IKeyboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "api/v1/keyboard")
@Validated
@CrossOrigin(origins = "*")

public class KeyboardController {
    @Autowired
    private IKeyboardService service;

    @GetMapping()
    public Page<Keyboard> getAllKeyboard(
            Pageable pageable,
            @RequestParam (value = "search", required = false) String search,
            KeyboardFillerForm form){
        return service.getAllKeyboard(pageable, search, form);

    }

    @PostMapping()
    public void createKeyboard(@RequestBody @Valid KeyboardCreateForm form){
        service.createKeyboard(form);
    }

    @PutMapping("/{id}")
    public void updateKeyboard(@PathVariable (name = "id") int id
            , @RequestBody @Valid KeyboardUpdateForm form){
        form.setId(id);
        service.updateKeyboard(form);
    }

    @DeleteMapping("/{id}")
    public void deleteKeyboard(@PathVariable (name = "id") int id){
        service.deleteKeyboard(id);
    }
}
