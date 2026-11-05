/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.service;

import vn.edu.fpt.funews.entity.*;
import vn.edu.fpt.funews.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

/**
 * Service xử lý các nghiệp vụ logic bài viết tin tức (NewsArticle).
 */
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

    // Lấy tất cả bài viết hoặc tìm kiếm theo từ khóa
    public List<NewsArticle> all(String q) {
        return q == null || q.isBlank() ? repo.findAll() : repo.search(q);
    }

    // Lấy danh sách tin tức công khai đang kích hoạt (NewsStatus = true)
    public List<NewsArticle> publicNews() {
        return repo.findByNewsStatusTrueOrderByCreatedDateDesc();
    }

    // Lấy danh sách bài viết theo tài khoản tạo (chức năng lịch sử bài viết)
    public List<NewsArticle> history(short accountId) {
        return repo.findByCreatedBy_AccountIdOrderByCreatedDateDesc(accountId);
    }

    // Lấy chi tiết bài viết theo ID
    public NewsArticle get(String id) {
        return repo.findById(id).orElseThrow(() -> new NoSuchElementException("Không tìm thấy bài viết"));
    }

    // Tạo mới hoặc cập nhật bài viết
    @Transactional
    public NewsArticle save(NewsArticle n) {
        // Tự sinh mã NewsArticleID (chuỗi số tăng dần) nếu là bài viết mới
        if (n.getNewsArticleId() == null || n.getNewsArticleId().isBlank()) {
            long next = repo.findAll().stream().map(NewsArticle::getNewsArticleId).filter(Objects::nonNull)
                    .map(String::trim).filter(id -> id.matches("\\d+")).mapToLong(Long::parseLong).max().orElse(0L) + 1L;
            while (repo.existsById(Long.toString(next))) next++;
            n.setNewsArticleId(Long.toString(next));
        }

        // Lấy thông tin bài viết cũ (nếu là cập nhật)
        NewsArticle existing = null;
        if (n.getNewsArticleId() != null && repo.existsById(n.getNewsArticleId())) {
            existing = repo.findById(n.getNewsArticleId()).orElse(null);
        }

        // Ràng buộc nghiệp vụ: Không cho phép tạo mới hoặc chuyển bài viết sang danh mục đang Inactive
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

        // Gán tài khoản tạo và tài khoản cập nhật
        if (n.getCreatedBy() != null && n.getCreatedBy().getAccountId() != null)
            n.setCreatedBy(accounts.findById(n.getCreatedBy().getAccountId()).orElseThrow(() -> new NoSuchElementException("Account không tồn tại")));
        if (n.getUpdatedBy() != null && n.getUpdatedBy().getAccountId() != null)
            n.setUpdatedBy(accounts.findById(n.getUpdatedBy().getAccountId()).orElseThrow(() -> new NoSuchElementException("Account cập nhật không tồn tại")));

        // Gán danh sách thẻ Tag
        Set<Tag> resolved = new LinkedHashSet<>();
        if (n.getTags() != null) for (Tag t : n.getTags())
            resolved.add(tags.findById(t.getTagId()).orElseThrow(() -> new NoSuchElementException("Tag không tồn tại: " + t.getTagId())));
        n.setTags(resolved);

        // Thiết lập ngày tạo và ngày sửa đổi
        if (n.getCreatedDate() == null) n.setCreatedDate(LocalDateTime.now());
        n.setModifiedDate(LocalDateTime.now());
        return repo.save(n);
    }

    // Xóa bài viết theo ID
    @Transactional
    public void delete(String id) {
        repo.delete(get(id));
    }
}
