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
    const { data, status } = useDashboard();
    const [messages, setMessages] = useState([welcomeMessage]);
    const [sending, setSending] = useState(false);

    const sendMessage = useCallback(
        async (text) => {
            if (!text.trim()) return;

            const userMessage = { id: `u-${Date.now()}`, role: 'user', text };
            setMessages((prev) => [...prev, userMessage]);

            if (!data) {
                const reply =
                    status === 'error'
                        ? "I couldn't load your learning data. Please refresh and try again."
                        : "I'm still loading your learning data. Please try again in a moment.";
                setMessages((prev) => [
                    ...prev,
                    { id: `a-${Date.now()}`, role: 'assistant', text: reply },
                ]);
                return;
            }

            setSending(true);

            try {
                const reply = await getAssistantReply(text, data);
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
        [data, status]
    );

    return { messages, sending, sendMessage, contextStatus: status };
}
