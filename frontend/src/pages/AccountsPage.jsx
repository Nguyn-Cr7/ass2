// Author: Khôi Nguyên
import React, { useEffect, useState } from 'react';
import accountService from '../services/accountService';
import errorMessage from '../utils/errorMessage';
import Modal from '../components/Modal';
import AccountForm from '../components/forms/AccountForm';

/**
 * Màn hình quản lý danh sách tài khoản hệ thống (dành cho Admin).
 */
export default function AccountsPage({ search, onError }) {
  const [accounts, setAccounts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  // Tải danh sách tài khoản mỗi khi từ khóa tìm kiếm hoặc reloadKey thay đổi
  useEffect(() => {
    let active = true;
    setLoading(true);
    accountService.getAll(search)
      .then((data) => active && setAccounts(data))
      .catch((error) => active && onError(errorMessage(error)))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [search, reloadKey, onError]);

  // Xử lý tạo mới hoặc cập nhật tài khoản
  async function save(payload) {
    setSaving(true);
    onError('');
    try {
      if (editing) await accountService.update(editing.accountId, { ...payload, accountPassword: payload.accountPassword ?? editing.accountPassword });
      else await accountService.create(payload);
      setModalOpen(false);
      setReloadKey((key) => key + 1);
    } catch (error) {
      onError(errorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  // Xử lý xóa tài khoản (ràng buộc: không xóa tài khoản đã tạo bài viết)
  async function remove(account) {
    if (!window.confirm(`Bạn có chắc muốn xóa tài khoản “${account.accountEmail}”?`)) return;
    try {
      await accountService.remove(account.accountId);
      setReloadKey((key) => key + 1);
    } catch (error) {
      onError(errorMessage(error));
    }
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Người dùng hệ thống</p>
          <h2>Quản lý tài khoản</h2>
          <span>{accounts.length} tài khoản</span>
        </div>
        <button type="button" onClick={() => { setEditing(null); setModalOpen(true); }}>
          + Thêm tài khoản
        </button>
      </div>

      {loading ? (
        <p className="empty">Đang tải tài khoản...</p>
      ) : (
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.accountId}>
                  <td>{account.accountId}</td>
                  <td>{account.accountName || '—'}</td>
                  <td>{account.accountEmail}</td>
                  <td>
                    <span className={`role-pill ${Number(account.accountRole) === 1 ? 'admin' : ''}`}>
                      {Number(account.accountRole) === 1 ? 'Admin' : 'Staff'}
                    </span>
                  </td>
                  <td className="table-actions">
                    <button type="button" className="secondary" onClick={() => { setEditing(account); setModalOpen(true); }}>
                      Sửa
                    </button>
                    <button type="button" className="danger" onClick={() => remove(account)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal form thêm mới / chỉnh sửa tài khoản */}
      {modalOpen && (
        <Modal title={editing ? 'Chỉnh sửa tài khoản' : 'Thêm tài khoản'} onClose={() => setModalOpen(false)}>
          <AccountForm
            initialValue={editing}
            onSubmit={save}
            onCancel={() => setModalOpen(false)}
            saving={saving}
          />
        </Modal>
      )}
    </section>
  );
}
