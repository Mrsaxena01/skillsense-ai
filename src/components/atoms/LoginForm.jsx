import { useEffect, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import {
    MailOutlined,
    LockOutlined,
    ArrowRightOutlined,
} from '@ant-design/icons';
import { useToast } from '../../context/ToastContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const fieldStyle = {
    borderRadius: '0.375rem',
    padding: '0.5rem',
    fontSize: '1rem',
    fontWeight: 500,
    borderColor: '#d4f35b',
    backgroundColor: '#f9fafb',
};

const LoginForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form] = Form.useForm(); 
    const { notify } = useToast();
    const { isAuthenticated, loginWithCredentials, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && user?.role) {
            notify('Login successful!');
            navigate(`/${user.role}/dashboard`, { replace: true });
        }
    }, [isAuthenticated, user, navigate, notify]);

    const onFinish = async (values) => {
        setIsSubmitting(true);
        const res = await loginWithCredentials(values.email, values.password);
        if (!res?.success) {
            setIsSubmitting(false);
            notify(res?.error || 'Invalid credentials. Please try again.');
        }
    };

    const handleRoleChange = (value) => {
        if (value === 'employee') {
            form.setFieldsValue({
                email: 'sonu@gmail.com',
                password: '123456789',
            });
        } else {
            form.setFieldsValue({
                email: 'admin@gmail.com',
                password: '123456789', 
            });
        }
    };

    return (
        <Form
            form={form} // 3. Bind the form instance
            name="login-form"
            layout="vertical"
            className="w-full"
            onFinish={onFinish}
            initialValues={{
                role: 'employee', 
                email: 'sonu@gmail.com', 
                password: '123456789',
            }}
        >
            <Form.Item
                label={
                    <span className="text-sm font-medium text-gray-700">
                        {' '}
                        Role{' '}
                    </span>
                }
                name="role"
                validateTrigger="onSubmit"
                rules={[{ required: true }]}
            >
                <Select
                    className="w-full sm:w-64"
                    options={[
                        { value: 'employee', label: 'Employee' },
                        { value: 'admin', label: 'Admin' },
                    ]}
                    style={fieldStyle}
                    disabled={isSubmitting}
                    onChange={handleRoleChange} 
                />
            </Form.Item>

            <Form.Item
                label={
                    <span className="text-sm font-medium text-gray-700">
                        {' '}
                        Official Email{' '}
                    </span>
                }
                name="email"
                validateTrigger="onSubmit"
                rules={[
                    {
                        required: true,
                        message: 'Please input your official email!',
                    },
                    {
                        type: 'email',
                        message: 'Please enter a valid email address!',
                    },
                ]}
            >
                {/* 8. Removed value and onChange, letting Ant Design handle state */}
                <Input
                    autoComplete="off"
                    placeholder="Enter your official email"
                    prefix={<MailOutlined className="mr-1 text-gray-300" />}
                    style={fieldStyle}
                    disabled={isSubmitting}
                />
            </Form.Item>

            <Form.Item
                label={
                    <span className="text-sm font-medium text-gray-700">
                        {' '}
                        Password{' '}
                    </span>
                }
                name="password"
                validateTrigger="onSubmit"
                rules={[
                    { required: true, message: 'Please input your password!' },
                    {
                        min: 8,
                        message: 'Password must be at least 8 characters long!',
                    },
                ]}
                hasFeedback
            >
                {/* 9. Removed value and onChange */}
                <Input.Password
                    placeholder="Enter your password"
                    prefix={<LockOutlined className="mr-1 text-gray-400" />}
                    style={fieldStyle}
                    disabled={isSubmitting}
                />
            </Form.Item>

            <div className="mb-2 flex items-center justify-end">
                <a
                    href="#"
                    className="text-sm font-medium text-[#8fae1f] transition-colors duration-200 hover:text-[#c0e14a]"
                >
                    Forgot password?
                </a>
            </div>

            <Form.Item className="pt-2">
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '0.375rem',
                        border: 'none',
                        background:
                            'linear-gradient(to right, #d4f35b, #a8d94a)',
                        padding: '0.75rem 1rem',
                        fontWeight: '600',
                        color: '#182630',
                        transition: 'all 0.3s ease',
                        fontSize: '1rem',
                    }}
                >
                    {isSubmitting ? 'Signing In...' : 'Sign In'}{' '}
                    {!isSubmitting && (
                        <span className="text-sm">
                            <ArrowRightOutlined />
                        </span>
                    )}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
