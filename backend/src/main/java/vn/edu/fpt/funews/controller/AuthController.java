/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.controller;

import vn.edu.fpt.funews.entity.SystemAccount;
import vn.edu.fpt.funews.service.AccountService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AccountService service;

    public AuthController(AccountService s) {
        service = s;
    }

    public record LoginRequest(String email, String password) {
    }

    @PostMapping("/login")
    public SystemAccount login(@RequestBody LoginRequest req) {
        return service.login(req.email(), req.password());
    }

    @PutMapping("/profile/{id}")
    public SystemAccount profile(@PathVariable short id, @RequestBody SystemAccount req) {
        req.setAccountId(id);
        return service.save(req);
    }
}
