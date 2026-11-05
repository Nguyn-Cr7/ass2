/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.service;

import vn.edu.fpt.funews.entity.Category;
import vn.edu.fpt.funews.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Service xử lý các nghiệp vụ logic liên quan đến danh mục tin tức (Category).
 */
@Service
public class CategoryService {
    private final CategoryRepository repo;
    private final NewsRepository news;

    public CategoryService(CategoryRepository repo, NewsRepository news) {
        this.repo = repo;
        this.news = news;
    }

    // Lấy toàn bộ danh mục hoặc tìm kiếm theo tên
    public List<Category> all(String q) {
        return q == null || q.isBlank() ? repo.findAll() : repo.search(q);
    }

    // Lấy danh mục theo ID
    public Category get(short id) {
        return repo.findById(id).orElseThrow(() -> new NoSuchElementException("Không tìm thấy category"));
    }

    // Lưu mới hoặc cập nhật danh mục
    public Category save(Category c) {
        return repo.save(c);
    }

    // Xóa danh mục (ràng buộc: không được xóa danh mục đã được dùng trong bài viết)
    @Transactional
    public void delete(short id) {
        if (news.existsByCategory_CategoryId(id))
            throw new IllegalStateException("Không thể xóa category đã được dùng trong bài viết.");
        repo.delete(get(id));
    }
}
