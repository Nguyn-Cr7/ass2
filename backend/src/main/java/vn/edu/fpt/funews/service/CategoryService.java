/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.service;

import vn.edu.fpt.funews.entity.Category;
import vn.edu.fpt.funews.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class CategoryService {
    private final CategoryRepository repo;
    private final NewsRepository news;

    public CategoryService(CategoryRepository repo, NewsRepository news) {
        this.repo = repo;
        this.news = news;
    }

    public List<Category> all(String q) {
        return q == null || q.isBlank() ? repo.findAll() : repo.search(q);
    }

    public Category get(short id) {
        return repo.findById(id).orElseThrow(() -> new NoSuchElementException("Không tìm thấy category"));
    }

    public Category save(Category c) {
        return repo.save(c);
    }

    @Transactional
    public void delete(short id) {
        if (news.existsByCategory_CategoryId(id))
            throw new IllegalStateException("Không thể xóa category đã được dùng trong bài viết.");
        repo.delete(get(id));
    }
}
