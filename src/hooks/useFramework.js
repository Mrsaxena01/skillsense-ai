
import { useEffect, useState } from 'react';
import { fetchFramework } from '../services/frameworkService';

export function useFramework() {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        fetchFramework()
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
