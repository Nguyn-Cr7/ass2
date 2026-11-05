/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.controller;

import vn.edu.fpt.funews.entity.SystemAccount;
import vn.edu.fpt.funews.service.AccountService;
import org.springframework.web.bind.annotation.*;

/**
 * Controller xử lý xác thực đăng nhập và cập nhật hồ sơ cá nhân.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AccountService service;

    public AuthController(AccountService s) {
        service = s;
    }

    // DTO nhận email và password khi đăng nhập
    public record LoginRequest(String email, String password) {
    }

    // Xử lý đăng nhập: trả về thông tin tài khoản nếu đúng email & mật khẩu
    @PostMapping("/login")
    public SystemAccount login(@RequestBody LoginRequest req) {
        return service.login(req.email(), req.password());
    }

    // Cập nhật thông tin hồ sơ cá nhân của tài khoản đang đăng nhập
    @PutMapping("/profile/{id}")
    public SystemAccount profile(@PathVariable short id, @RequestBody SystemAccount req) {
        req.setAccountId(id);
        return service.save(req);
    }
}
