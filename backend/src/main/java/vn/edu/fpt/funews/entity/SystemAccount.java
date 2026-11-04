/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "SystemAccount")
public class SystemAccount {
    @Id
    @Column(name = "AccountID")
    private Short accountId;
    @Size(max = 100)
    @Column(name = "AccountName", length = 100)
    private String accountName;
    @Email
    @Size(max = 70)
    @Column(name = "AccountEmail", length = 70)
    private String accountEmail;
    @Column(name = "AccountRole")
    private Integer accountRole;
    @Size(max = 70)
    @Column(name = "AccountPassword", length = 70)
    private String accountPassword;

    public Short getAccountId() {
        return accountId;
    }

    public void setAccountId(Short accountId) {
        this.accountId = accountId;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getAccountEmail() {
        return accountEmail;
    }

    public void setAccountEmail(String accountEmail) {
        this.accountEmail = accountEmail;
    }

    public Integer getAccountRole() {
        return accountRole;
    }

    public void setAccountRole(Integer accountRole) {
        this.accountRole = accountRole;
    }

    public String getAccountPassword() {
        return accountPassword;
    }

    public void setAccountPassword(String accountPassword) {
        this.accountPassword = accountPassword;
    }
}
