/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "NewsArticle")
public class NewsArticle {
    @Id
    @Size(max = 20)
    @Column(name = "NewsArticleID", length = 20)
    private String newsArticleId;
    @Size(max = 400)
    @Column(name = "NewsTitle", length = 400)
    private String newsTitle;
    @NotBlank
    @Size(max = 150)
    @Column(name = "Headline", length = 150, nullable = false)
    private String headline;
    @Column(name = "CreatedDate")
    private LocalDateTime createdDate;
    @Size(max = 4000)
    @Column(name = "NewsContent", length = 4000)
    private String newsContent;
    @Size(max = 400)
    @Column(name = "NewsSource", length = 400)
    private String newsSource;
    @ManyToOne
    @JoinColumn(name = "CategoryID")
    private Category category;
    @Column(name = "NewsStatus")
    private Boolean newsStatus;
    @ManyToOne
    @JoinColumn(name = "CreatedByID")
    private SystemAccount createdBy;
    @ManyToOne
    @JoinColumn(name = "UpdatedByID")
    private SystemAccount updatedBy;
    @Column(name = "ModifiedDate")
    private LocalDateTime modifiedDate;
    @ManyToMany
    @JoinTable(name = "NewsTag", joinColumns = @JoinColumn(name = "NewsArticleID"), inverseJoinColumns = @JoinColumn(name = "TagID"))
    private Set<Tag> tags = new LinkedHashSet<>();

    public String getNewsArticleId() {
        return newsArticleId;
    }

    public void setNewsArticleId(String newsArticleId) {
        this.newsArticleId = newsArticleId;
    }

    public String getNewsTitle() {
        return newsTitle;
    }

    public void setNewsTitle(String newsTitle) {
        this.newsTitle = newsTitle;
    }

    public String getHeadline() {
        return headline;
    }

    public void setHeadline(String headline) {
        this.headline = headline;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getNewsContent() {
        return newsContent;
    }

    public void setNewsContent(String newsContent) {
        this.newsContent = newsContent;
    }

    public String getNewsSource() {
        return newsSource;
    }

    public void setNewsSource(String newsSource) {
        this.newsSource = newsSource;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Boolean getNewsStatus() {
        return newsStatus;
    }

    public void setNewsStatus(Boolean newsStatus) {
        this.newsStatus = newsStatus;
    }

    public SystemAccount getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(SystemAccount createdBy) {
        this.createdBy = createdBy;
    }

    public SystemAccount getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(SystemAccount updatedBy) {
        this.updatedBy = updatedBy;
    }

    public LocalDateTime getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(LocalDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }
}
