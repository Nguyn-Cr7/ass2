/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.controller;

import vn.edu.fpt.funews.entity.SystemAccount;
import vn.edu.fpt.funews.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Controller xử lý các yêu cầu CRUD tài khoản (dành cho Admin).
 */
@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    private final AccountService service;

    public AccountController(AccountService s) {
        service = s;
    }

    // Lấy danh sách tài khoản (hỗ trợ tìm kiếm theo tên hoặc email)
    @GetMapping
    public List<SystemAccount> all(@RequestParam(required = false) String search) {
        return service.all(search);
    }

    // Lấy thông tin chi tiết tài khoản theo ID
    @GetMapping("/{id}")
    public SystemAccount get(@PathVariable short id) {
        return service.get(id);
    }

    // Tạo mới tài khoản
    @PostMapping
    public SystemAccount create(@Valid @RequestBody SystemAccount a) {
        return service.save(a);
    }

    // Cập nhật thông tin tài khoản theo ID
    @PutMapping("/{id}")
    public SystemAccount update(@PathVariable short id, @Valid @RequestBody SystemAccount a) {
        a.setAccountId(id);
        return service.save(a);
    }

    // Xóa tài khoản (nếu chưa từng tạo bài viết)
    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable short id) {
        service.delete(id);
        return Map.of("message", "Đã xóa account");
    }
}
