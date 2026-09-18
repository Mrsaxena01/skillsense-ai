import React from 'react';
import {
    DashboardOutlined,
    UserOutlined,
    BookOutlined,
    SolutionOutlined,
    FormOutlined,
    SafetyCertificateOutlined,
    BarChartOutlined,
    AimOutlined,
    OpenAIOutlined,
    SettingOutlined,
} from '@ant-design/icons';

// 1. Employee Navigation
export const employeeMenu = [
    {
        key: '/employee/dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
    },
    {
        key: '/employee/profile',
        icon: <UserOutlined />,
        label: 'My Profile',
    },
    {
        key: '/employee/assessments',
        icon: <FormOutlined />,
        label: 'Assessments',
    },
    {
        key: '/employee/competencies',
        icon: <SafetyCertificateOutlined />,
        label: 'Competencies',
    },
    {
        key: '/employee/skill-gaps',
        icon: <AimOutlined />,
        label: 'Skill Gaps',
    },
    {
        key: '/employee/recommendations',
        icon: <SolutionOutlined />,
        label: 'Recommendations',
    },
    {
        key: '/employee/learning',
        icon: <BookOutlined />,
        label: 'Learning Path',
    },
    {
        key: '/employee/ai-assistant',
        icon: <OpenAIOutlined />,
        label: 'AI Assistant',
    },

    {
        key: '/employee/progress',
        icon: <BarChartOutlined />,
        label: 'Progress',
    },
];

// 3. Admin Navigation
export const adminMenu = [
    {
        key: '/admin/dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
    },
    {
        key: '/admin/users',
        icon: <UserOutlined />,
        label: 'User Directory',
    },
    {
        key: '/admin/competencies',
        icon: <SafetyCertificateOutlined />,
        label: 'Global Competencies',
    },
    {
        key: '/admin/courses',
        icon: <BookOutlined />,
        label: 'Course Catalog',
    },
    {
        key: '/admin/assessments',
        icon: <FormOutlined />,
        label: 'Assessments',
    },
    {
        key: '/admin/analytics',
        icon: <BarChartOutlined />,
        label: 'Analytics',
    },
    {
        key: 'admin/settings',
        icon: <SettingOutlined />,
        label: 'Settings',
    },
];
