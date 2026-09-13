import { useCallback, useEffect, useRef, useState } from 'react';

export function useToast(duration = 2500) {
    const [message, setMessage] = useState('');
    const timeoutRef = useRef(null);

    const notify = useCallback(
        (nextMessage) => {
            setMessage(nextMessage);
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(
                () => setMessage(''),
                duration
            );
        },
        [duration]
    );

    useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

    return { message, notify };
}
