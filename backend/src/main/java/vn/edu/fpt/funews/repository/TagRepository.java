/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.repository;

import vn.edu.fpt.funews.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Integer> {
}
