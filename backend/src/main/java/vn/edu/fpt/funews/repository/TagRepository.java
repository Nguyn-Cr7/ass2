/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.repository;

import vn.edu.fpt.funews.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository thao tác dữ liệu bảng Tag qua Spring Data JPA.
 */
public interface TagRepository extends JpaRepository<Tag, Integer> {
}
