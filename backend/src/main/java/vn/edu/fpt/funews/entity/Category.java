/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

/**
 * Thực thể ánh xạ bảng Category trong cơ sở dữ liệu.
 */
@Entity
@Table(name = "Category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CategoryID")
    private Short categoryId;

    @NotBlank
    @Size(max = 100)
    @Column(name = "CategoryName", length = 100, nullable = false)
    private String categoryName;

    @NotBlank
    @Size(max = 250)
    @Column(name = "CategoryDesciption", length = 250, nullable = false)
    private String categoryDescription;

    // ID danh mục cha (phục vụ cấu trúc phân cấp danh mục)
    @Column(name = "ParentCategoryID")
    private Short parentCategoryId;

    // Trạng thái kích hoạt (true = Active, false = Inactive)
    @Column(name = "IsActive")
    private Boolean active;

    public Short getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Short categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryDescription() {
        return categoryDescription;
    }

    public void setCategoryDescription(String categoryDescription) {
        this.categoryDescription = categoryDescription;
    }

    public Short getParentCategoryId() {
        return parentCategoryId;
    }

    public void setParentCategoryId(Short parentCategoryId) {
        this.parentCategoryId = parentCategoryId;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
