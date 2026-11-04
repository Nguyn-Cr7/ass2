/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.service;

import vn.edu.fpt.funews.entity.SystemAccount;
import vn.edu.fpt.funews.repository.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AccountService {
    private final AccountRepository repo;
    private final NewsRepository news;

    public AccountService(AccountRepository repo, NewsRepository news) {
        this.repo = repo;
        this.news = news;
    }

    public List<SystemAccount> all(String q) {
        return q == null || q.isBlank() ? repo.findAll() : repo.search(q);
    }

    public SystemAccount get(short id) {
        return repo.findById(id).orElseThrow(() -> new NoSuchElementException("Không tìm thấy account"));
    }

    public SystemAccount save(SystemAccount a) {
        // AccountID in the assignment SQL is not IDENTITY, so generate it on the server.
        if (a.getAccountId() == null || a.getAccountId() <= 0) {
            int next = repo.findAll().stream().map(SystemAccount::getAccountId).filter(Objects::nonNull)
                    .mapToInt(Short::intValue).max().orElse(0) + 1;
            if (next > Short.MAX_VALUE)
                throw new IllegalStateException("Đã vượt quá giới hạn AccountID của kiểu SMALLINT.");
            a.setAccountId((short) next);
        }
        return repo.save(a);
    }

    public SystemAccount login(String email, String password) {
        return repo.findByAccountEmailIgnoreCase(email).filter(a -> Objects.equals(a.getAccountPassword(), password)).orElseThrow(() -> new IllegalArgumentException("Email hoặc mật khẩu không đúng"));
    }

    public void delete(short id) {
        if (news.existsByCreatedBy_AccountId(id))
            throw new IllegalStateException("Không thể xóa account đã tạo bài viết.");
        repo.delete(get(id));
    }
}
