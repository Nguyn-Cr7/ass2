/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.repository;

import vn.edu.fpt.funews.entity.NewsArticle;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NewsRepository extends JpaRepository<NewsArticle, String> {
    @Query("select distinct n from NewsArticle n left join n.tags t left join n.category c where " +
            "( :q is null or lower(coalesce(n.newsTitle,'')) like lower(concat('%',:q,'%')) or lower(n.headline) like lower(concat('%',:q,'%')) or lower(coalesce(n.newsContent,'')) like lower(concat('%',:q,'%')) or lower(coalesce(t.tagName,'')) like lower(concat('%',:q,'%')) )")
    List<NewsArticle> search(@Param("q") String q);

    List<NewsArticle> findByNewsStatusTrueOrderByCreatedDateDesc();

    List<NewsArticle> findByCreatedBy_AccountIdOrderByCreatedDateDesc(Short accountId);

    boolean existsByCategory_CategoryId(Short categoryId);

    boolean existsByCreatedBy_AccountId(Short accountId);
}
