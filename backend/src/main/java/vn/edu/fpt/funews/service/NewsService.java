/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.service;

import vn.edu.fpt.funews.entity.*;
import vn.edu.fpt.funews.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class NewsService {
    private final NewsRepository repo;
    private final CategoryRepository categories;
    private final AccountRepository accounts;
    private final TagRepository tags;

    public NewsService(NewsRepository repo, CategoryRepository categories, AccountRepository accounts, TagRepository tags) {
        this.repo = repo;
        this.categories = categories;
        this.accounts = accounts;
        this.tags = tags;
    }

    public List<NewsArticle> all(String q) {
        return q == null || q.isBlank() ? repo.findAll() : repo.search(q);
    }

    public List<NewsArticle> publicNews() {
        return repo.findByNewsStatusTrueOrderByCreatedDateDesc();
    }

    public List<NewsArticle> history(short accountId) {
        return repo.findByCreatedBy_AccountIdOrderByCreatedDateDesc(accountId);
    }

    public NewsArticle get(String id) {
        return repo.findById(id).orElseThrow(() -> new NoSuchElementException("Không tìm thấy bài viết"));
    }

    @Transactional
    public NewsArticle save(NewsArticle n) {
        // NewsArticleID is NVARCHAR(20), not a SQL Server IDENTITY column; generate a numeric string on create.
        if (n.getNewsArticleId() == null || n.getNewsArticleId().isBlank()) {
            long next = repo.findAll().stream().map(NewsArticle::getNewsArticleId).filter(Objects::nonNull)
                    .map(String::trim).filter(id -> id.matches("\\d+")).mapToLong(Long::parseLong).max().orElse(0L) + 1L;
            while (repo.existsById(Long.toString(next))) next++;
            n.setNewsArticleId(Long.toString(next));
        }
        // Xác định bài viết cũ (nếu là cập nhật) để cho phép sửa các trường khác
        // khi bài viết đang giữ nguyên một danh mục đã chuyển sang Inactive.
        NewsArticle existing = null;
        if (n.getNewsArticleId() != null && repo.existsById(n.getNewsArticleId())) {
            existing = repo.findById(n.getNewsArticleId()).orElse(null);
        }
        if (n.getCategory() != null && n.getCategory().getCategoryId() != null) {
            Category selectedCategory = categories.findById(n.getCategory().getCategoryId())
                    .orElseThrow(() -> new NoSuchElementException("Category không tồn tại"));
            boolean categoryIsActive = Boolean.TRUE.equals(selectedCategory.getActive());
            boolean keepingExistingInactiveCategory = existing != null
                    && existing.getCategory() != null
                    && Objects.equals(existing.getCategory().getCategoryId(), selectedCategory.getCategoryId());
            if (!categoryIsActive && !keepingExistingInactiveCategory) {
                throw new IllegalArgumentException("Không thể tạo hoặc chuyển bài viết sang danh mục Inactive. Vui lòng chọn danh mục Active.");
            }
            n.setCategory(selectedCategory);
        }
        if (n.getCreatedBy() != null && n.getCreatedBy().getAccountId() != null)
            n.setCreatedBy(accounts.findById(n.getCreatedBy().getAccountId()).orElseThrow(() -> new NoSuchElementException("Account không tồn tại")));
        if (n.getUpdatedBy() != null && n.getUpdatedBy().getAccountId() != null)
            n.setUpdatedBy(accounts.findById(n.getUpdatedBy().getAccountId()).orElseThrow(() -> new NoSuchElementException("Account cập nhật không tồn tại")));
        Set<Tag> resolved = new LinkedHashSet<>();
        if (n.getTags() != null) for (Tag t : n.getTags())
            resolved.add(tags.findById(t.getTagId()).orElseThrow(() -> new NoSuchElementException("Tag không tồn tại: " + t.getTagId())));
        n.setTags(resolved);
        if (n.getCreatedDate() == null) n.setCreatedDate(LocalDateTime.now());
        n.setModifiedDate(LocalDateTime.now());
        return repo.save(n);
    }

    @Transactional
    public void delete(String id) {
        repo.delete(get(id));
    }
}
