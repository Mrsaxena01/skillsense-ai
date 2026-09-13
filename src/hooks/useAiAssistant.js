// src/hooks/useAiAssistant.js
import { useCallback, useState } from 'react';
import { getAssistantReply } from '../services/aiAssistant.service';
import { useDashboard } from './useDashboard';

const welcomeMessage = {
    id: 'welcome',
    role: 'assistant',
    text: "Hi! I'm your learning assistant. Ask me about your skill gaps, course progress, or what to focus on next.",
};

export function useAiAssistant() {
    const context = useDashboard(); // reuses the same aggregated data as Dashboard
    const [messages, setMessages] = useState([welcomeMessage]);
    const [sending, setSending] = useState(false);

    const sendMessage = useCallback(
        async (text) => {
            if (!text.trim()) return;

            const userMessage = { id: `u-${Date.now()}`, role: 'user', text };
            setMessages((prev) => [...prev, userMessage]);
            setSending(true);

            try {
                const reply = await getAssistantReply(text, context);
                setMessages((prev) => [
                    ...prev,
                    { id: `a-${Date.now()}`, role: 'assistant', text: reply },
                ]);
            } catch {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: `a-${Date.now()}`,
                        role: 'assistant',
                        text: "Sorry, I couldn't process that. Please try again.",
                    },
                ]);
            } finally {
                setSending(false);
            }
        },
        [context]
    );

    return { messages, sending, sendMessage, contextStatus: context.status };
}
