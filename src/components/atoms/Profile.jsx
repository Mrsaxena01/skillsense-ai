import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { useAuth } from '../../context/AuthContext';

const Profile = ({ collapsed, onLogout }) => {

    const { user } = useAuth();

    const userName = user?.name || 'Authorized Official';
    const userRole = user?.role || 'Employee';

    const getRoleLabel = (role) => {
        if (role === 'admin') return 'Admin Account';
        return 'Employee Account';
    };


    return (
        <div
            className={`flex flex-col gap-3 border-t border-white/10 p-4 text-white transition-all duration-200
            ${collapsed ? 'items-center justify-center' : 'items-start'}`}
        >
            {/* Avatar Section */}
            <div
                className={`flex items-center w-full gap-3 ${collapsed ? 'justify-center' : 'justify-start'}`}
            >
                <Avatar
                    icon={<UserOutlined />}
                    className="shrink-0 transition-all"
                />
                {!collapsed && (
                    <div className="min-w-0 flex-1 animate-fade-in">
                        <strong className="block truncate text-sm font-medium">
                            {userName}
                        </strong>
                        <small className="block truncate text-white/50 text-xs">
                            {getRoleLabel(userRole)}
                        </small>
                    </div>
                )}
            </div>

            {/* Centered Modern Logout Button */}
            <Button
                type="text"
                aria-label="Log out"
                icon={<LogoutOutlined style={{ fontSize: '15px' }} />}
                onClick={onLogout}
                style={{
                    width: '100%',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center', // Always center the content inside the button container
                    gap: collapsed ? '0px' : '8px',
                    borderRadius: '6px',
                    color: '#f43f5e',
                    background: '#1e293b',
                    border: '1px solid rgba(244, 63, 94, 0.15)',
                    transition: 'all 0.2s ease',
                }}
                className="hover:!bg-[#e11d48] hover:!text-white hover:!border-transparent active:scale-[0.97]"
            >
                {!collapsed && (
                    <span style={{ fontSize: '13px', fontWeight: 500 }}>
                        Sign out
                    </span>
                )}
            </Button>
        </div>
    );
};

export default Profile;
