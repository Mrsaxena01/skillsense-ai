
import { useEffect, useState } from 'react';
import { fetchDashboardData } from '../services/dashboard.service';

export function useDashboard() {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        fetchDashboardData()
            .then((result) => {
                if (!isMounted) return;
                setData(result);
                setStatus('success');
            })
            .catch((err) => {
                if (!isMounted) return;
                setError(err);
                setStatus('error');
            });
        return () => {
            isMounted = false;
        };
    }, []);

    return { data, status, error };
}
