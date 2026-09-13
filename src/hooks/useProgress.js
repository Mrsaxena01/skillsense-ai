// src/hooks/useProgress.js
import { useCallback, useEffect, useState } from 'react';
import { fetchProgressData } from '../services/dashboard.service';

export function useProgress() {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState(null);

    const load = useCallback(() => {
        setStatus('loading');
        fetchProgressData()
            .then((result) => {
                setData(result);
                setStatus('success');
            })
            .catch((err) => {
                setError(err);
                setStatus('error');
            });
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    return { data, status, error, reload: load };
}
