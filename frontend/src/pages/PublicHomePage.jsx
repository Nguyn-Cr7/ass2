// Author: Khôi Nguyên
import React, { useState, useMemo } from 'react';
import PublicHeader from '../components/PublicHeader';
import NewsCard from '../components/NewsCard';

export default function PublicHomePage({
  user = null,
  homePath = '/news',
  publicNews = [],
  publicNewsLoading = false,
  publicNewsError = '',
  onRetryPublicNews,
}) {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Lấy danh sách các danh mục duy nhất từ publicNews
  const categories = useMemo(() => {
    const map = new Map();
    publicNews.forEach((item) => {
      if (item.category?.categoryId) {
        map.set(item.category.categoryId, item.category.categoryName);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [publicNews]);

  // Lọc tin tức theo từ khóa và danh mục
  const filteredNews = useMemo(() => {
    return publicNews.filter((item) => {
      const matchKeyword = !keyword.trim() || 
        (item.headline || '').toLowerCase().includes(keyword.toLowerCase()) ||
        (item.newsTitle || '').toLowerCase().includes(keyword.toLowerCase()) ||
        (item.newsContent || '').toLowerCase().includes(keyword.toLowerCase());

      const matchCategory = selectedCategory === 'ALL' || 
        item.category?.categoryId === selectedCategory;

      return matchKeyword && matchCategory;
    });
  }, [publicNews, keyword, selectedCategory]);

  return (
    <div className="homepage-wrapper">
      <PublicHeader user={user} homePath={homePath} />

      {/* HERO BANNER */}
      <section className="homepage-hero">
        <div className="hero-content">
          <span className="hero-eyebrow">FUNews Management System</span>
          <h1>Cổng Thông Tin & Sự Kiện</h1>
          <p>Cập nhật những tin tức học thuật, hoạt động nghiên cứu và sự kiện nổi bật.</p>

          <div className="hero-search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm bài viết, chủ đề sự kiện..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {keyword && (
              <button type="button" className="btn-clear-hero-search" onClick={() => setKeyword('')}>
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* DANH SÁCH BÀI VIẾT */}
      <main className="homepage-main-container">
        {/* BỘ LỌC DANH MỤC */}
        {categories.length > 0 && (
          <div className="category-filter-pills">
            <button
              type="button"
              className={`pill-btn ${selectedCategory === 'ALL' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('ALL')}
            >
              Tất cả chủ đề ({publicNews.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* TRẠNG THÁI TẢI VÀ LỖI */}
        {publicNewsLoading ? (
          <div className="homepage-empty-box">
            <div className="loading-spinner"></div>
            <p>Đang tải dữ liệu tin tức từ hệ thống...</p>
          </div>
        ) : publicNewsError ? (
          <div className="homepage-error-box">
            <strong>Không thể kết nối đến máy chủ tin tức</strong>
            <p>{publicNewsError}</p>
            <button type="button" className="btn-secondary" onClick={onRetryPublicNews}>
              Thử tải lại
            </button>
          </div>
        ) : filteredNews.length > 0 ? (
          <div className="cards">
            {filteredNews.map((news) => (
              <NewsCard key={news.newsArticleId} news={news} publicMode />
            ))}
          </div>
        ) : (
          <div className="homepage-empty-box">
            <p>Không tìm thấy bài viết nào phù hợp với điều kiện tìm kiếm.</p>
          </div>
        )}
      </main>

      <footer className="homepage-footer">
        <p>FUNewsManagementSystem · Assignment 02 · Author: <strong>Khôi Nguyên</strong></p>
      </footer>
    </div>
  );
}
