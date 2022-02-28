import React from 'react'
import ErrorBoundary from '../../Error/ErrorBoundary'
import Admin from '../Admin'
import AdminUser from '../Manage/Admin'
const AdminIndex = () => {
    return (
        <Admin>
            <ErrorBoundary>
            <AdminUser />
            </ErrorBoundary>
        </Admin>
    )
}

export default AdminIndex
