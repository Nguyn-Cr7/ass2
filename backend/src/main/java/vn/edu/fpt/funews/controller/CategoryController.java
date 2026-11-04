/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.controller;

import vn.edu.fpt.funews.entity.Category;
import vn.edu.fpt.funews.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService service;

    public CategoryController(CategoryService s) {
        service = s;
    }

    @GetMapping
    public List<Category> all(@RequestParam(required = false) String search) {
        return service.all(search);
    }

    @GetMapping("/{id}")
    public Category get(@PathVariable short id) {
        return service.get(id);
    }

    @PostMapping
    public Category create(@Valid @RequestBody Category c) {
        return service.save(c);
    }

    @PutMapping("/{id}")
    public Category update(@PathVariable short id, @Valid @RequestBody Category c) {
        c.setCategoryId(id);
        return service.save(c);
    }

    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable short id) {
        service.delete(id);
        return Map.of("message", "Đã xóa category");
    }
}
