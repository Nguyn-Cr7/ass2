// Author: Khôi Nguyên
import React from 'react';
import PublicHeader from '../components/PublicHeader';
import NewsCard from '../components/NewsCard';

export default function PublicHomePage({
  user = null,
  homePath = '/',
  publicNews = [],
  publicNewsLoading = false,
  publicNewsError = '',
  onRetryPublicNews,
}) {
  return (
    <div className="public-home">
      <PublicHeader user={user} homePath={homePath} />
      <main>
        <section className="public-hero">
          <p className="eyebrow">FU NEWS MANAGEMENT SYSTEM</p>
          <h1>Cập nhật tin tức mới nhất</h1>
          <p>Khám phá các thông báo, hoạt động học thuật và tin tức nổi bật từ FU.</p>
        </section>

        <section className="public-news page-section">
          <div className="section-heading">
            <div><p className="eyebrow">Tin công khai</p><h2>Tin tức mới nhất</h2></div>
            <span>{publicNews.length} bài viết</span>
          </div>
          <p className="section-description">Các bài viết có trạng thái Active có thể xem mà không cần đăng nhập.</p>
          {publicNewsLoading ? (
            <p className="empty public-empty">Đang tải tin công khai...</p>
          ) : publicNewsError ? (
            <div className="error public-api-error" role="alert">
              <strong>Không tải được tin tức công khai.</strong>
              <p>{publicNewsError}</p>
              <p>Kiểm tra API tại <code>http://localhost:8080/api/news/public</code>.</p>
              <button type="button" className="secondary retry-button" onClick={onRetryPublicNews}>Thử tải lại</button>
            </div>
          ) : publicNews.length > 0 ? (
            <div className="cards">{publicNews.map((news) => <NewsCard key={news.newsArticleId} news={news} publicMode />)}</div>
          ) : (
            <p className="empty public-empty">Chưa có bài viết công khai (NewsStatus = 1).</p>
          )}
        </section>
      </main>
      <footer>FUNewsManagementSystem · Assignment 02 · Author: Khôi Nguyên</footer>
    </div>
  );
}
