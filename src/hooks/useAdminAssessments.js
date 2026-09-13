
import { useCallback, useEffect, useState } from 'react';
import {
    fetchOrgAssessments,
    fetchQuestionBanks,
    reviewQuestionBank,
} from '../services/adminAssessmentService';

export function useAdminAssessments() {
    const [attempts, setAttempts] = useState([]);
    const [banks, setBanks] = useState([]);
    const [status, setStatus] = useState('loading');

    const load = useCallback(() => {
        setStatus('loading');
        Promise.all([fetchOrgAssessments(), fetchQuestionBanks()])
            .then(([a, b]) => {
                setAttempts(a);
                setBanks(b);
                setStatus('success');
            })
            .catch(() => setStatus('error'));
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const review = async (id, decision) => {
        await reviewQuestionBank(id, decision);
        load();
    };

    return { attempts, banks, status, review };
}
