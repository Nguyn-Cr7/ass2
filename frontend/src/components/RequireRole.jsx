// Author: Khôi Nguyên
import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

export default function RequireRole({user, allowedRole, redirectTo = '/news'}) {
    if (!user) return <Navigate to="/login" replace/>;
    if (Number(user.accountRole) !== Number(allowedRole)) {
        return <Navigate to={redirectTo} replace/>;
    }
    return <Outlet/>;
}
