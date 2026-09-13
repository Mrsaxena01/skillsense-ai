import {
    BellOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout } from 'antd';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const Header = ({ collapsed, onToggle,  background }) => {
    const {notify} = useToast();
    const navigate = useNavigate();
    const {user} = useAuth();
    return (
        <AntHeader
            style={{
                padding: 0,
                background,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 10,
            }}
        >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={onToggle}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    paddingRight: 16,
                }}
            >
                <Button
                    type="text"
                    aria-label="Notifications"
                    title="Notifications"
                    icon={<BellOutlined />}
                    onClick={() => notify('There is no notification available!')}
                    style={{ width: 44, height: 44, fontSize: 18 }}
                />{' '}

                {user?.role == 'employee' && <Button
                    type="text"
                    aria-label="Profile"
                    title="Profile"
                    onClick={() => navigate('employee/profile')}
                    icon={<Avatar size={32} icon={<UserOutlined />} />}
                    style={{ width: 44, height: 44 }}
                />}
            </div>
        </AntHeader>
    );
};

export default Header;
