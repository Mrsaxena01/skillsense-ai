import { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import Logo from '../atoms/Logo.jsx';
import Header from '../atoms/Header.jsx';
import Profile from '../atoms/Profile.jsx';

import { useAuth } from '../../context/AuthContext.jsx';

import { adminMenu, employeeMenu } from '../../data/appMenu.jsx';

const { Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const currentRole = user?.role || 'employee';

    const getMenuConfig = () => {
        switch (currentRole) {
            case 'admin':
                return adminMenu;
            case 'employee':
            default:
                return employeeMenu;
        }
    };

    const getHomeRedirect = () => {
        switch (currentRole) {
            case 'admin':
                return '/admin/dashboard';

            case 'employee':
            default:
                return '/employee/dashboard';
        }
    };

    // Centralized custom logout controller action
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={230}
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    alignSelf: 'flex-start',
                    overflow: 'auto',
                }}
            >
                <div className="flex min-h-full flex-col">
                    <Link
                        to={getHomeRedirect()}
                        className="block select-none"
                        style={{ cursor: 'pointer' }}
                    >
                        <Logo collapsed={collapsed} />
                    </Link>

                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[location.pathname]}
                        items={getMenuConfig()}
                        onClick={({ key }) => navigate(key)}
                        style={{ flex: 1, fontWeight: '600' }}
                    />

                    <Profile collapsed={collapsed} onLogout={handleLogout} />
                </div>
            </Sider>
            <Layout style={{ minWidth: 0 }}>
                <Header
                    collapsed={collapsed}
                    onToggle={() => setCollapsed(!collapsed)}
                    background={colorBgContainer}
                />

                <Content
                    style={{
                        margin: '0px',
                        padding: currentRole === 'admin' ? 24 : 0,
                        minHeight: 280,
                        minWidth: 0,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
