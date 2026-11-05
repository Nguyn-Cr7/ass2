// Author: Khôi Nguyên
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../components/forms/ProfileForm';

/**
 * ProfilePage: Trang xem và cập nhật hồ sơ cá nhân (Tên, mật khẩu mới)
 */
export default function ProfilePage({ user, onSave }) {
  // State quản lý trạng thái lưu, thông báo lỗi và thông báo thành công
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Xử lý lưu thông tin cập nhật thông qua hàm onSave của component cha (App.jsx)
  async function submit(payload) {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await onSave(payload);
      setSuccess('Cập nhật hồ sơ thành công.');
    } catch (saveError) {
      setError(saveError?.message || 'Không thể cập nhật hồ sơ. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="page-section">
      {/* Tiêu đề trang hồ sơ */}
      <div className="section-heading">
        <div><p className="eyebrow">Tài khoản của tôi</p><h2>Hồ sơ cá nhân</h2></div>
      </div>

      {/* Panel chứa ProfileForm và thông báo kết quả */}
      <div className="panel profile-panel">
        {error && <p className="error" role="alert">{error}</p>}
        {success && <p className="success-message" role="status">{success}</p>}
        {/* Form nhập liệu thông tin cá nhân; nút hủy sẽ quay lại trang chính theo vai trò */}
        <ProfileForm user={user} onSubmit={submit} onCancel={() => navigate(Number(user.accountRole) === 1 ? '/accounts' : '/news')} saving={saving} />
      </div>
    </section>
  );
}
