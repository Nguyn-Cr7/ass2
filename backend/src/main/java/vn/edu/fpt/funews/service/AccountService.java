/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.service;

import vn.edu.fpt.funews.entity.SystemAccount;
import vn.edu.fpt.funews.repository.*;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service xử lý các nghiệp vụ logic liên quan đến tài khoản (SystemAccount).
 */
@Service
public class AccountService {
    private final AccountRepository repo;
    private final NewsRepository news;

    public AccountService(AccountRepository repo, NewsRepository news) {
        this.repo = repo;
        this.news = news;
    }

    // Lấy toàn bộ tài khoản hoặc tìm kiếm theo từ khóa
    public List<SystemAccount> all(String q) {
        return q == null || q.isBlank() ? repo.findAll() : repo.search(q);
    }

    // Lấy chi tiết tài khoản theo ID
    public SystemAccount get(short id) {
        return repo.findById(id).orElseThrow(() -> new NoSuchElementException("Không tìm thấy account"));
    }

    // Thêm mới hoặc cập nhật tài khoản (tự sinh AccountID nếu chưa có vì DB không tự tăng)
    public SystemAccount save(SystemAccount a) {
        // Kiểm tra tính duy nhất của Email
        if (a.getAccountEmail() != null && !a.getAccountEmail().isBlank()) {
            List<SystemAccount> existingWithEmail = repo.findAllByAccountEmailIgnoreCase(a.getAccountEmail().trim());
            for (SystemAccount existing : existingWithEmail) {
                if (a.getAccountId() == null || !existing.getAccountId().equals(a.getAccountId())) {
                    throw new IllegalArgumentException("Email này đã được sử dụng bởi tài khoản khác.");
                }
            }
        }

        if (a.getAccountId() == null || a.getAccountId() <= 0) {
            int next = repo.findAll().stream().map(SystemAccount::getAccountId).filter(Objects::nonNull)
                    .mapToInt(Short::intValue).max().orElse(0) + 1;
            if (next > Short.MAX_VALUE)
                throw new IllegalStateException("Đã vượt quá giới hạn AccountID của kiểu SMALLINT.");
            a.setAccountId((short) next);
        } else {
            // Giữ lại mật khẩu cũ nếu không nhập mật khẩu mới khi cập nhật
            if (a.getAccountPassword() == null || a.getAccountPassword().isBlank()) {
                repo.findById(a.getAccountId()).ifPresent(old -> a.setAccountPassword(old.getAccountPassword()));
            }
        }
        return repo.save(a);
    }

    // Xác thực thông tin đăng nhập theo email và mật khẩu
    public SystemAccount login(String email, String password) {
        return repo.findAllByAccountEmailIgnoreCase(email).stream()
                .filter(a -> Objects.equals(a.getAccountPassword(), password))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Email hoặc mật khẩu không đúng"));
    }

    // Xóa tài khoản (ràng buộc: không được xóa tài khoản đã từng tạo bài viết)
    public void delete(short id) {
        if (news.existsByCreatedBy_AccountId(id))
            throw new IllegalStateException("Không thể xóa account đã tạo bài viết.");
        repo.delete(get(id));
    }
}
