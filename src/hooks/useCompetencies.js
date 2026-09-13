import { useEffect, useState, useMemo } from 'react';
import { fetchCompetencies } from '../services/competency.service';

export function useCompetencies() {
    const [competencies, setCompetencies] = useState([]);
    const [status, setStatus] = useState('loading'); // loading | success | error
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        fetchCompetencies()
            .then((data) => {
                if (!isMounted) return;
                setCompetencies(data);
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
        const total = competencies.length;
        const gaps = competencies.filter((c) => c.status !== 'Meets').length;
        const strong = total - gaps;
        const overall =
            total === 0
                ? 0
                : Math.round(
                      competencies.reduce(
                          (sum, c) => sum + c.assessmentScore,
                          0
                      ) / total
                  );

        return { total, gaps, strong, overall };
    }, [competencies]);

    return { competencies, summary, status, error };
}
