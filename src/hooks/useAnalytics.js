
import { useEffect, useState } from 'react';
import {
    fetchSkillGapAnalysis,
    fetchDepartmentComparison,
} from '../services/analyticsService';

export function useAnalytics() {
    const [skillGaps, setSkillGaps] = useState([]);
    const [departmentData, setDepartmentData] = useState([]);
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        let isMounted = true;
        Promise.all([fetchSkillGapAnalysis(), fetchDepartmentComparison()])
            .then(([gaps, depts]) => {
                if (!isMounted) return;
                setSkillGaps(gaps);
                setDepartmentData(depts);
                setStatus('success');
            })
            .catch(() => isMounted && setStatus('error'));
        return () => {
            isMounted = false;
        };
    }, []);

    return { skillGaps, departmentData, status };
}
