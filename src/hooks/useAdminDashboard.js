
import { useEffect, useState } from 'react';
import { fetchOrgOverview } from '../services/admin.service';

export function useAdminDashboard() {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        fetchOrgOverview()
            .then((result) => {
                if (isMounted) {
                    setData(result);
                    setStatus('success');
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err);
                    setStatus('error');
                }
            });
        return () => {
            isMounted = false;
        };
    }, []);

    return { data, status, error };
}
