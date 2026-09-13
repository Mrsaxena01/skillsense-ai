
import { useEffect, useState } from 'react';
import { fetchRecommendations } from '../services/recommendation.service';

export function useRecommendations() {
    const [recommendations, setRecommendations] = useState([]);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        fetchRecommendations()
            .then((data) => {
                if (!isMounted) return;
                setRecommendations(data);
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

    return { recommendations, status, error };
}
