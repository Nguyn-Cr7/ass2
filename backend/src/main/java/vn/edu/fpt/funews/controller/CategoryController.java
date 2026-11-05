/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.controller;

import vn.edu.fpt.funews.entity.Category;
import vn.edu.fpt.funews.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Controller xử lý CRUD danh mục tin tức (dành cho Staff).
 */
@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService service;

    public CategoryController(CategoryService s) {
        service = s;
    }

    // Lấy toàn bộ danh mục (có hỗ trợ tìm kiếm theo tên)
    @GetMapping
    public List<Category> all(@RequestParam(required = false) String search) {
        return service.all(search);
    }

    // Lấy chi tiết danh mục theo ID
    @GetMapping("/{id}")
    public Category get(@PathVariable short id) {
        return service.get(id);
    }

    // Tạo mới danh mục
    @PostMapping
    public Category create(@Valid @RequestBody Category c) {
        return service.save(c);
    }

    // Cập nhật danh mục theo ID
    @PutMapping("/{id}")
    public Category update(@PathVariable short id, @Valid @RequestBody Category c) {
        c.setCategoryId(id);
        return service.save(c);
    }

    // Xóa danh mục (nếu chưa có bài viết nào dùng danh mục này)
    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable short id) {
        service.delete(id);
        return Map.of("message", "Đã xóa category");
    }
}
