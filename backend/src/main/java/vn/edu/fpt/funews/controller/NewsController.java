/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.controller;

import vn.edu.fpt.funews.entity.NewsArticle;
import vn.edu.fpt.funews.service.NewsService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Controller xử lý các nghiệp vụ tin tức: xem công khai, CRUD tin tức và lịch sử viết bài.
 */
@RestController
@RequestMapping("/api/news")
public class NewsController {
    private final NewsService service;

    public NewsController(NewsService s) {
        service = s;
    }

    // Lấy tin tức công khai đang Active (cho trang chủ, không cần đăng nhập)
    @GetMapping("/public")
    public List<NewsArticle> publicNews() {
        return service.publicNews();
    }

    // Lấy tất cả tin tức (dành cho quản lý, có tìm kiếm theo từ khóa)
    @GetMapping
    public List<NewsArticle> all(@RequestParam(required = false) String search) {
        return service.all(search);
    }

    // Lấy chi tiết bài viết theo ID
    @GetMapping("/{id}")
    public NewsArticle get(@PathVariable String id) {
        return service.get(id);
    }

    // Xem lịch sử bài viết do một tài khoản cụ thể tạo ra
    @GetMapping("/history/{accountId}")
    public List<NewsArticle> history(@PathVariable short accountId) {
        return service.history(accountId);
    }

    // Tạo mới bài viết
    @PostMapping
    public NewsArticle create(@Valid @RequestBody NewsArticle n) {
        return service.save(n);
    }

    // Cập nhật bài viết theo ID
    @PutMapping("/{id}")
    public NewsArticle update(@PathVariable String id, @Valid @RequestBody NewsArticle n) {
        n.setNewsArticleId(id);
        return service.save(n);
    }

    // Xóa bài viết theo ID
    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable String id) {
        service.delete(id);
        return Map.of("message", "Đã xóa bài viết");
    }
}
