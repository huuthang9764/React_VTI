package com.example.FinalExam.Controller;

import com.example.FinalExam.Entity.Account.Account;
import com.example.FinalExam.Form.Account.AccountCreateForm;
import com.example.FinalExam.Form.Account.AccountFillerForm;
import com.example.FinalExam.Form.Account.AccountUpdateForm;
import com.example.FinalExam.Service.Account.IAccountService;
import lombok.NonNull;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import com.example.FinalExam.Form.Account.AccountDTO;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/accounts")
@CrossOrigin(origins = "*")
public class AccountController {
    @Autowired
    private IAccountService service;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public Page<AccountDTO> getAllAccount(
            Pageable pageable,
            @RequestParam(value = "search", required = false)  String search,
            AccountFillerForm form){

        Page<Account> entities = service.getAllAccount(pageable, search, form);

        // convert entities --> dtos
        List<AccountDTO> dtos = modelMapper.map(
                entities.getContent(),
                new TypeToken<List<AccountDTO>>() {}.getType());

        Page<AccountDTO> dtosPage = new PageImpl<>(dtos, pageable, entities.getTotalElements());

        return dtosPage;

    }

    @PostMapping()
    public void createAccount(@RequestBody @Valid AccountCreateForm form){
        service.createAccount(form);
    }

    @PutMapping("/{id}")
    public void updateAccount(@PathVariable (name = "id") int id
            , @RequestBody @Valid AccountUpdateForm form){
        form.setId(id);
        service.updateAccount(form);
    }

    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable (name = "id") int id){
        service.deleteAccount(id);
    }
}
