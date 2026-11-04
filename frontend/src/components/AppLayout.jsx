// Author: Khôi Nguyên
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppNavigation from './AppNavigation';
import ErrorAlert from './ErrorAlert';
import SearchToolbar from './SearchToolbar';

const SEARCH_PATHS = ['/news', '/categories', '/accounts', '/history'];

export default function AppLayout({ user, onLogout, error, setError, search, setSearch }) {
  const location = useLocation();
  const showSearch = SEARCH_PATHS.includes(location.pathname);

  useEffect(() => {
    setSearch('');
    setError('');
  }, [location.pathname, setSearch, setError]);

  return (
    <main className="app">
      <AppHeader user={user} onLogout={onLogout} />
      <AppNavigation role={user.accountRole} />
      <ErrorAlert message={error} onClose={() => setError('')} />
      {showSearch && (
        <div className="search-toolbar-wrap">
          <SearchToolbar value={search} onChange={setSearch} canCreate={false} />
          {search && <button type="button" className="secondary clear-search" onClick={() => setSearch('')}>Xóa tìm kiếm</button>}
        </div>
      )}
      <Outlet />
      <footer>FUNewsManagementSystem · Assignment 02 · Author: Khôi Nguyên</footer>
    </main>
  );
}
