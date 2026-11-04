/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.controller;

import vn.edu.fpt.funews.entity.SystemAccount;
import vn.edu.fpt.funews.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    private final AccountService service;

    public AccountController(AccountService s) {
        service = s;
    }

    @GetMapping
    public List<SystemAccount> all(@RequestParam(required = false) String search) {
        return service.all(search);
    }

    @GetMapping("/{id}")
    public SystemAccount get(@PathVariable short id) {
        return service.get(id);
    }

    @PostMapping
    public SystemAccount create(@Valid @RequestBody SystemAccount a) {
        return service.save(a);
    }

    @PutMapping("/{id}")
    public SystemAccount update(@PathVariable short id, @Valid @RequestBody SystemAccount a) {
        a.setAccountId(id);
        return service.save(a);
    }

    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable short id) {
        service.delete(id);
        return Map.of("message", "Đã xóa account");
    }
}
