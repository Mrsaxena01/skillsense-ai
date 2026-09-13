// src/pages/employee/AiAssistant.jsx
import { useEffect, useRef } from 'react';
import { RobotOutlined } from '@ant-design/icons';
import { useAiAssistant } from '../../hooks/useAiAssistant';
import { suggestedPrompts } from '../../services/aiAssistant.service';
import ChatMessage from '../../components/employee/aiAssistant/ChatMessage';
import ChatInput from '../../components/employee/aiAssistant/ChatInput';
import SuggestedPrompts from '../../components/employee/aiAssistant/SuggestedPrompts';

const AiAssistant = () => {
    const { messages, sending, sendMessage } = useAiAssistant();
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="p-6 md:p-8 flex flex-col gap-6 h-[calc(100vh-0px)]">
            <div>
                <h1 className="text-2xl font-bold text-[var(--ink)] flex items-center gap-2">
                    <RobotOutlined /> AI Assistant
                </h1>
                <p className="text-sm text-[var(--muted)] mt-1">
                    Ask about your competencies, skill gaps, courses, or
                    assessments
                </p>
            </div>

            <div className="flex-1 rounded-lg border border-[var(--line)] bg-[#fafbfa] flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
                    {messages.map((m) => (
                        <ChatMessage key={m.id} role={m.role} text={m.text} />
                    ))}

                    {sending && (
                        <div className="flex gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0fcd0] text-[var(--ink)]">
                                <RobotOutlined />
                            </span>
                            <div className="rounded-lg rounded-tl-none border border-[var(--line)] bg-white px-4 py-2.5 text-sm text-[var(--muted)]">
                                Thinking...
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                <div className="border-t border-[var(--line)] bg-white p-4 flex flex-col gap-3">
                    {messages.length <= 1 && (
                        <SuggestedPrompts
                            prompts={suggestedPrompts}
                            onSelect={sendMessage}
                            disabled={sending}
                        />
                    )}
                    <ChatInput onSend={sendMessage} disabled={sending} />
                </div>
            </div>
        </div>
    );
};

export default AiAssistant;
