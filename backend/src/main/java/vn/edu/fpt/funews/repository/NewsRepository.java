/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.repository;

import vn.edu.fpt.funews.entity.NewsArticle;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Repository thao tác dữ liệu bài viết tin tức (NewsArticle).
 */
public interface NewsRepository extends JpaRepository<NewsArticle, String> {
    // Tìm kiếm bài viết theo tiêu đề, tóm tắt, nội dung hoặc tên thẻ tag
    @Query("select distinct n from NewsArticle n left join n.tags t left join n.category c where " +
            "( :q is null or lower(coalesce(n.newsTitle,'')) like lower(concat('%',:q,'%')) or lower(n.headline) like lower(concat('%',:q,'%')) or lower(coalesce(n.newsContent,'')) like lower(concat('%',:q,'%')) or lower(coalesce(t.tagName,'')) like lower(concat('%',:q,'%')) )")
    List<NewsArticle> search(@Param("q") String q);

    // Lấy danh sách tin tức công khai đang kích hoạt (NewsStatus = true), sắp xếp mới nhất
    List<NewsArticle> findByNewsStatusTrueOrderByCreatedDateDesc();

    // Lấy danh sách bài viết theo ID người tạo (dành cho chức năng lịch sử)
    List<NewsArticle> findByCreatedBy_AccountIdOrderByCreatedDateDesc(Short accountId);

    // Kiểm tra xem có bài viết nào đang sử dụng CategoryID này không (phục vụ ràng buộc khi xóa)
    boolean existsByCategory_CategoryId(Short categoryId);

    // Kiểm tra xem AccountID này đã từng tạo bài viết nào chưa (phục vụ ràng buộc khi xóa tài khoản)
    boolean existsByCreatedBy_AccountId(Short accountId);
}
