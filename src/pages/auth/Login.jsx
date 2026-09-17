import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mospiLogo from '/mospi.svg';
import Logo from '../../components/atoms/Logo.jsx';
import { SlackOutlined, SafetyOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import LoginForm from '../../components/atoms/LoginForm.jsx';
import { useToast } from '../../context/ToastContext.jsx';

const Login = () => {
    const navigate = useNavigate();
    const [isBootChecking, setIsBootChecking] = useState(true);
    const { notify } = useToast();

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('app_user');
            const storedToken = localStorage.getItem('auth_token');

            if (storedUser && storedToken) {
                const user = JSON.parse(storedUser);
                if (user?.role) {
                    navigate(`/${user.role}/dashboard`, { replace: true });
                    return;
                }
            }
        } catch (error) {
            console.error('Failed to restore auth session:', error);
            localStorage.removeItem('app_user');
            localStorage.removeItem('auth_token');
        } finally {
            setIsBootChecking(false);
        }
    }, [navigate]);

    if (isBootChecking) {
        return <div>Checking secure session...</div>;
    }

    return (
        <div className="auth-container flex min-h-screen w-full select-none items-center justify-center bg-gray-50">
            <div className="auth-left relative hidden h-screen w-1/2 flex-col justify-between overflow-hidden p-12 md:p-16 md:flex">
                <div className="absolute inset-0 z-0 bg-black/50" />

                <div className="relative z-10 flex items-center gap-3">
                    <img
                        src={mospiLogo}
                        alt="MoSPI Logo"
                        className="h-12 w-12 rounded-full bg-white object-contain p-2 shadow-md"
                    />
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-300">
                            Ministry of Statistics & PI
                        </p>
                        <h3 className="text-xl font-bold tracking-tight text-white">
                            MoSPI · Government of India
                        </h3>
                    </div>
                </div>

                <div className="relative z-10 my-auto flex flex-col items-start gap-4 py-8">
                    <div className="ai-powered inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wider text-teal-400 backdrop-blur-md">
                        <SlackOutlined className="text-base" />
                        <span>AI-POWERED PLATFORM</span>
                    </div>

                    <div className="origin-left scale-140 transform text-white">
                        <Logo />
                    </div>

                    <h2 className="max-w-md text-xl font-medium text-white mt-2">
                        AI-Powered Competency & Learning Platform for Official
                        Statistics
                    </h2>
                    <p className="text-md max-w-md font-medium text-gray-400">
                        Build the skills required for the future of India's
                        Official Statistical System. Assess your competencies,
                        identify gaps, and follow a personalized learning path
                        aligned with iGOT Karmayogi and NSSTA programmes.
                    </p>
                </div>

                <div className="relative z-10 text-xs text-gray-400">
                    © {new Date().getFullYear()} MoSPI. All rights reserved.
                </div>
            </div>

            <div className="flex min-h-screen w-full md:w-1/2 items-start justify-center bg-[#fff] p-6 sm:p-12 md:p-16">
                <div className="w-full max-w-md">
                    <div className="flex flex-col items-center mb-6 md:hidden">
                        <img
                            src={mospiLogo}
                            alt="MoSPI Logo"
                            className="h-14 w-14 rounded-full bg-white object-contain p-1 shadow-md mb-2"
                        />
                        <p className="text-center text-xs font-bold uppercase tracking-wider text-gray-500">
                            MoSPI · Government of India
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 text-center md:text-left">
                        Sign in to SkillSense AI
                    </h2>
                    <p className="mb-6 mt-1 text-sm text-gray-500 text-center md:text-left">
                        Use your official government credentials
                    </p>

                    <div className="mt-8 text-gray-400">
                        <button
                            type="button"
                            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#d4f35b] py-3 font-semibold text-[#182630] transition-colors duration-200 hover:bg-[#c0e14a]"
                            onClick={() => {
                                notify(
                                    'Government SSO login is currently unavailable. Please use email login.'
                                );
                            }}
                        >
                            <SafetyOutlined />
                            Sign with Government SSO
                        </button>

                        <Divider
                            style={{ color: '#9ca3af', borderColor: '#e5e7eb' }}
                        >
                            or sign in with email
                        </Divider>

                        <LoginForm />

                        <div className="border border-gray-200 text-[12px] p-4 rounded-lg">
                            <p>
                                <span>
                                    <SafetyOutlined />{' '}
                                </span>
                                This platform is for authorized MoSPI officials
                                only. Your activity is logged and subject to
                                Government of India data security policies.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
