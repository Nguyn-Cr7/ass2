/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

/**
 * Thực thể ánh xạ bảng Tag (Thẻ chủ đề gắn vào bài viết).
 */
@Entity
@Table(name = "Tag")
public class Tag {
    @Id
    @Column(name = "TagID")
    private Integer tagId;

    @Size(max = 50)
    @Column(name = "TagName", length = 50)
    private String tagName;

    @Size(max = 400)
    @Column(name = "Note", length = 400)
    private String note;

    public Integer getTagId() {
        return tagId;
    }

    public void setTagId(Integer tagId) {
        this.tagId = tagId;
    }

    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
