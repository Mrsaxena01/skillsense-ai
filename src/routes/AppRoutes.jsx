import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import Your Unified Layout
import MainLayout from '../components/common/MainLayout';

// Auth Pages
import Login from '../pages/auth/Login';
import SSOCallback from '../pages/auth/SSOCallback';

// Employee Pages
import EmployeeDashboard from '../pages/employee/Dashboard';
import Profile from '../pages/employee/Profile';
import Competencies from '../pages/employee/Competencies';
import SkillGaps from '../pages/employee/SkillGaps';
import Recommendations from '../pages/employee/Recommendations';
import Learning from '../pages/employee/Learning';
import Assessments from '../pages/employee/Assessments';
import Progress from '../pages/employee/Progress';  
import AiAssistant from '../pages/employee/AiAssistant';



// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import Users from '../pages/admin/Users';
import AdminCompetencies from '../pages/admin/Competencies';
import Courses from '../pages/admin/Courses';
import Analytics from '../pages/admin/Analytics';
import AssessmentsAdmin from '../pages/admin/Assessments';
import Settings from '../pages/admin/Settings';


// Role Guard Component
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) return <div>Loading portal...</div>;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to={`/${user.role}/dashboard`} replace />;
    }

    return children;
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* 1. Public Independent Pages (No Sidebar/Header Shell) */}
            <Route path="/login" element={<Login />} />
            <Route path="/sso-callback" element={<SSOCallback />} />

            {/* 2. Authenticated System Pages Wrapped in MainLayout */}
            <Route element={<MainLayout />}>
                {/* Employee Sub-routes */}
                <Route
                    path="/employee/*"
                    element={
                        <ProtectedRoute allowedRoles={['employee']}>
                            <Routes>
                                <Route
                                    path="dashboard"
                                    element={<EmployeeDashboard />}
                                />
                                <Route path="profile" element={<Profile />} />
                                <Route
                                    path="competencies"
                                    element={<Competencies />}
                                />
                                <Route
                                    path="skill-gaps"
                                    element={<SkillGaps />}
                                />
                                <Route
                                    path="recommendations"
                                    element={<Recommendations />}
                                />
                                <Route path="learning" element={<Learning />} />
                                <Route
                                    path="assessments"
                                    element={<Assessments />}
                                />
                                <Route path="progress" element={<Progress />} />
                                <Route
                                    path="ai-assistant"
                                    element={<AiAssistant />}
                                />
                                <Route
                                    path="*"
                                    element={
                                        <Navigate to="dashboard" replace />
                                    }
                                />
                            </Routes>
                        </ProtectedRoute>
                    }
                />

                {/* Admin Sub-routes */}
                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <Routes>
                                <Route
                                    path="dashboard"
                                    element={<AdminDashboard />}
                                />
                                <Route path="users" element={<Users />} />
                                <Route
                                    path="competencies"
                                    element={<AdminCompetencies />}
                                />
                                <Route path="courses" element={<Courses />} />
                                <Route
                                    path="assessments"
                                    element={<AssessmentsAdmin />}
                                />
                                <Route
                                    path="analytics"
                                    element={<Analytics />}
                                />
                                <Route
                                    path="settings"
                                    element={<Settings />}
                                />
                                <Route
                                    path="*"
                                    element={
                                        <Navigate to="dashboard" replace />
                                    }
                                />
                            </Routes>
                        </ProtectedRoute>
                    }
                />
            </Route>

            {/* Global Fallback Catch-All */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default AppRoutes;
