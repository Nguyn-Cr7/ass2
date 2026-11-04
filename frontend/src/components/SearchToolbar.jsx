// Author: Khôi Nguyên
import React from 'react';

export default function SearchToolbar({value, onChange, onCreate, canCreate = true, createLabel = '+ Thêm mới'}) {
    return (
        <section className="search-row">
            <label className="search-field">
                <span>Tìm kiếm</span>
                <input aria-label="Tìm kiếm" placeholder="Nhập từ khóa tìm kiếm..." value={value}
                       onChange={(event) => onChange(event.target.value)}/>
            </label>
            {canCreate && <button type="button" onClick={onCreate}>{createLabel}</button>}
        </section>
    );
}
