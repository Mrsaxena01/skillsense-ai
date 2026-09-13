// src/components/employee/aiAssistant/ChatInput.jsx
import { useState } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const ChatInput = ({ onSend, disabled }) => {
    const [value, setValue] = useState('');

    const handleSend = () => {
        if (!value.trim()) return;
        onSend(value);
        setValue('');
    };

    return (
        <div className="flex items-center gap-2">
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onPressEnter={handleSend}
                placeholder="Ask about your skills, courses, or progress..."
                disabled={disabled}
                className="!rounded-lg !border-[var(--line)] !py-2.5"
            />
            <Button
                icon={<SendOutlined />}
                onClick={handleSend}
                disabled={disabled || !value.trim()}
                className="!h-10 !rounded-lg !border-none !bg-[var(--ink)] !text-[var(--lime)] !font-semibold hover:!brightness-110"
            />
        </div>
    );
};

export default ChatInput;
