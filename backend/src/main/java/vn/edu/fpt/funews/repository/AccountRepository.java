/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.repository;

import vn.edu.fpt.funews.entity.SystemAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

/**
 * Repository thao tác dữ liệu bảng SystemAccount qua Spring Data JPA.
 */
public interface AccountRepository extends JpaRepository<SystemAccount, Short> {
    // Tìm kiếm tài khoản theo email (không phân biệt chữ hoa, chữ thường)
    Optional<SystemAccount> findByAccountEmailIgnoreCase(String email);

    // Lấy danh sách tài khoản theo email để tránh lỗi khi có trùng lặp
    List<SystemAccount> findAllByAccountEmailIgnoreCase(String email);

    // Tìm kiếm tài khoản theo tên hoặc email khớp từ khóa
    @Query("select a from SystemAccount a where lower(coalesce(a.accountName,'')) like lower(concat('%',:q,'%')) or lower(coalesce(a.accountEmail,'')) like lower(concat('%',:q,'%'))")
    List<SystemAccount> search(@Param("q") String q);
}
