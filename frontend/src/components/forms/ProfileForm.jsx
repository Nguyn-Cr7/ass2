// Author: Khôi Nguyên
import React, { useState } from 'react';

/**
 * Form cập nhật thông tin hồ sơ cá nhân của người dùng đang đăng nhập.
 */
export default function ProfileForm({ user, onSubmit, onCancel, saving = false }) {
  const [accountName, setAccountName] = useState(user?.accountName || '');
  const [accountEmail, setAccountEmail] = useState(user?.accountEmail || '');
  const [newPassword, setNewPassword] = useState('');

  // Xử lý gửi thông tin cập nhật
  function submit(event) {
    event.preventDefault();
    const payload = {
      accountId: Number(user.accountId),
      accountName: accountName.trim(),
      accountEmail: accountEmail.trim(),
      accountRole: Number(user.accountRole),
    };
    // Giữ nguyên mật khẩu cũ nếu người dùng không nhập mật khẩu mới
    if (newPassword) payload.accountPassword = newPassword;
    else if (user.accountPassword) payload.accountPassword = user.accountPassword;
    onSubmit(payload);
  }

  return (
    <form onSubmit={submit}>
      <label>Họ tên
        <input maxLength={100} value={accountName} onChange={(e) => setAccountName(e.target.value)} />
      </label>
      <label>Email *
        <input type="email" required maxLength={70} value={accountEmail} onChange={(e) => setAccountEmail(e.target.value)} />
      </label>
      <label>Mật khẩu mới (để trống nếu không đổi)
        <input type="password" maxLength={70} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </label>
      <div className="modalactions">
        <button type="button" className="secondary" onClick={onCancel}>Hủy</button>
        <button type="submit" disabled={saving}>{saving ? 'Đang lưu...' : 'Lưu hồ sơ'}</button>
      </div>
    </form>
  );
}
