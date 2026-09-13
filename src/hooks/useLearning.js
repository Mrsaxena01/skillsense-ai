
import { useEffect, useMemo, useState } from 'react';
import { fetchEnrolledCourses } from '../services/learning.service';

export function useLearning() {
    const [courses, setCourses] = useState([]);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        fetchEnrolledCourses()
            .then((data) => {
                if (!isMounted) return;
                setCourses(data);
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
        const total = courses.length;
        const completed = courses.filter(
            (c) => c.status === 'Completed'
        ).length;
        const inProgress = courses.filter(
            (c) => c.status === 'In Progress'
        ).length;
        const avgProgress =
            total === 0
                ? 0
                : Math.round(
                      courses.reduce((sum, c) => sum + c.progressPercent, 0) /
                          total
                  );

        return { total, completed, inProgress, avgProgress };
    }, [courses]);

    return { courses, summary, status, error };
}
