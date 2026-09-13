
import { useEffect, useMemo, useState } from 'react';
import { fetchSkillGaps } from '../services/skillGap.service';

export function useSkillGaps() {
    const [gaps, setGaps] = useState([]);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        fetchSkillGaps()
            .then((data) => {
                if (!isMounted) return;
                setGaps(data);
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

    const summary = useMemo(() => {
        const critical = gaps.filter((g) => g.status === 'Critical Gap').length;
        const developing = gaps.filter((g) => g.status === 'Developing').length;
        return { total: gaps.length, critical, developing };
    }, [gaps]);

    return { gaps, summary, status, error };
}
