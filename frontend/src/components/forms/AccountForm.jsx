// Author: Khôi Nguyên
import React, { useEffect, useState } from 'react';

const EMPTY_ACCOUNT = { accountName: '', accountEmail: '', accountRole: 2, accountPassword: '' };

export default function AccountForm({ initialValue, onSubmit, onCancel, saving = false }) {
  const [form, setForm] = useState(EMPTY_ACCOUNT);
  const isEditing = Boolean(initialValue?.accountId);
  useEffect(() => {
    setForm(initialValue ? {
      accountName: initialValue.accountName || '',
      accountEmail: initialValue.accountEmail || '',
      accountRole: initialValue.accountRole ?? 2,
      accountPassword: '',
    } : EMPTY_ACCOUNT);
  }, [initialValue]);

  function update(name, value) { setForm((current) => ({ ...current, [name]: value })); }
  function submit(event) {
    event.preventDefault();
    const payload = {
      accountName: form.accountName.trim(),
      accountEmail: form.accountEmail.trim(),
      accountRole: Number(form.accountRole),
    };
    if (form.accountPassword) payload.accountPassword = form.accountPassword;
    else if (initialValue?.accountPassword) payload.accountPassword = initialValue.accountPassword;
    onSubmit(payload);
  }

  return (
    <form onSubmit={submit}>
      <label>Họ tên
        <input maxLength={100} value={form.accountName} onChange={(e) => update('accountName', e.target.value)} />
      </label>
      <label>Email *
        <input type="email" required maxLength={70} value={form.accountEmail} onChange={(e) => update('accountEmail', e.target.value)} />
      </label>
      <label>{isEditing ? 'Mật khẩu mới (để trống nếu không đổi)' : 'Mật khẩu *'}
        <input type="password" maxLength={70} required={!isEditing} value={form.accountPassword} onChange={(e) => update('accountPassword', e.target.value)} />
      </label>
      <label>Vai trò
        <select value={form.accountRole} onChange={(e) => update('accountRole', e.target.value)}>
          <option value={1}>Admin</option>
          <option value={2}>Staff</option>
        </select>
      </label>
      <div className="modalactions">
        <button type="button" className="secondary" onClick={onCancel}>Hủy</button>
        <button type="submit" disabled={saving}>{saving ? 'Đang lưu...' : 'Lưu'}</button>
      </div>
    </form>
  );
}
