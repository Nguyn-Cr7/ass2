// Author: Khôi Nguyên
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../components/forms/ProfileForm';

export default function ProfilePage({ user, onSave }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

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
      <div className="section-heading">
        <div><p className="eyebrow">Tài khoản của tôi</p><h2>Hồ sơ cá nhân</h2></div>
      </div>
      <div className="panel profile-panel">
        {error && <p className="error" role="alert">{error}</p>}
        {success && <p className="success-message" role="status">{success}</p>}
        <ProfileForm user={user} onSubmit={submit} onCancel={() => navigate(Number(user.accountRole) === 1 ? '/accounts' : '/news')} saving={saving} />
      </div>
    </section>
  );
}
