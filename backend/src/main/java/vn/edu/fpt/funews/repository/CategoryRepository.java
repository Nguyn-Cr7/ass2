/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.repository;

import vn.edu.fpt.funews.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Short> {
    @Query("select c from Category c where lower(c.categoryName) like lower(concat('%',:q,'%'))")
    List<Category> search(@Param("q") String q);
}
