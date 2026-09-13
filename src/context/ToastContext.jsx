import {
    createContext,
    useContext,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    CheckCircleFilled,
    CloseCircleFilled,
    ExclamationCircleFilled,
} from '@ant-design/icons';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export function ToastProvider({ children, duration = 3000 }) {
    const [toast, setToast] = useState({ message: '', type: 'success' });
    const timeoutRef = useRef(null);

    const notify = useCallback(
        (message, type = 'success') => {
            // default type is success
            setToast({ message, type });
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(
                () => setToast({ message: '', type: 'success' }),
                duration
            );
        },
        [duration]
    );

    useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

    // Dynamic Style Configuration Mapper
    const getToastDetails = () => {
        switch (toast.type) {
            case 'error':
                return {
                    borderColor: '#ef4444', // Red border
                    icon: (
                        <CloseCircleFilled
                            style={{
                                color: '#ef4444',
                                marginRight: '8px',
                                fontSize: '14px',
                            }}
                        />
                    ),
                };
            case 'warning':
                return {
                    borderColor: '#f59e0b', // Amber/Yellow border
                    icon: (
                        <ExclamationCircleFilled
                            style={{
                                color: '#f59e0b',
                                marginRight: '8px',
                                fontSize: '14px',
                            }}
                        />
                    ),
                };
            case 'success':
            default:
                return {
                    borderColor: '#d4f35b', // Your original Lime border
                    icon: (
                        <CheckCircleFilled
                            style={{
                                color: '#d4f35b',
                                marginRight: '8px',
                                fontSize: '14px',
                            }}
                        />
                    ),
                };
        }
    };

    const details = getToastDetails();

    return (
        <ToastContext.Provider value={{ notify }}>
            {children}

            {toast.message && (
                <div
                    className="toast"
                    role="status"
                    style={{
                        borderLeft: `4px solid ${details.borderColor}`,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {details.icon}
                    <span>{toast.message}</span>
                </div>
            )}
        </ToastContext.Provider>
    );
}
