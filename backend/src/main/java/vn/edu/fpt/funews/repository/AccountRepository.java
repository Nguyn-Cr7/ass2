/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.repository;

import vn.edu.fpt.funews.entity.SystemAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface AccountRepository extends JpaRepository<SystemAccount, Short> {
    Optional<SystemAccount> findByAccountEmailIgnoreCase(String email);

    @Query("select a from SystemAccount a where lower(coalesce(a.accountName,'')) like lower(concat('%',:q,'%')) or lower(coalesce(a.accountEmail,'')) like lower(concat('%',:q,'%'))")
    List<SystemAccount> search(@Param("q") String q);
}
