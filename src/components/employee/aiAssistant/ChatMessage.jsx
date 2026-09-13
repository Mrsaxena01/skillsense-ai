// src/components/employee/aiAssistant/ChatMessage.jsx
import { RobotOutlined, UserOutlined } from '@ant-design/icons';

const ChatMessage = ({ role, text }) => {
    const isUser = role === 'user';

    return (
        <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
            <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    isUser
                        ? 'bg-[var(--ink)] text-[var(--lime)]'
                        : 'bg-[#f0fcd0] text-[var(--ink)]'
                }`}
            >
                {isUser ? <UserOutlined /> : <RobotOutlined />}
            </span>
            <div
                className={`max-w-[75%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                    isUser
                        ? 'bg-[var(--ink)] text-white rounded-tr-none'
                        : 'bg-white border border-[var(--line)] text-[var(--ink)] rounded-tl-none'
                }`}
                dangerouslySetInnerHTML={{
                    __html: text.replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong>$1</strong>'
                    ),
                }}
            />
        </div>
    );
};

export default ChatMessage;
