
import { useMemo, useState } from 'react';
import { Select } from 'antd';
import { useAdminAssessments } from '../../hooks/useAdminAssessments';
import AssessmentStatCards from '../../components/admin/assessments/AssessmentStatCards';
import AttemptsTable from '../../components/admin/assessments/AttemptsTable';
import QuestionBankReviewList from '../../components/admin/assessments/QuestionBankReviewList';

const typeOptions = ['All', 'competency', 'practice'];

const Assessments = () => {
    const { attempts, banks, status, review } = useAdminAssessments();
    const [type, setType] = useState('All');

    const filtered = useMemo(
        () =>
            attempts.filter((a) => type === 'All' || a.assessmentType === type),
        [attempts, type]
    );

    if (status === 'loading') {
        return (
            <div className="p-8 text-sm text-[var(--muted)]">
                Loading assessments...
            </div>
        );
    }

    return (
        <div className="p-4 flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-[var(--ink)]">
                    Assessments
                </h1>
                <p className="text-sm text-[var(--muted)] mt-1">
                    Org-wide assessment performance and AI-generated question
                    bank reviews
                </p>
            </div>

            <AssessmentStatCards attempts={attempts} banks={banks} />

            <QuestionBankReviewList banks={banks} onReview={review} />

            <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-[var(--ink)]">
                    All attempts
                </h2>
                <Select
                    value={type}
                    onChange={setType}
                    className="w-48"
                    options={typeOptions.map((t) => ({
                        value: t,
                        label:
                            t === 'All'
                                ? 'All Types'
                                : t === 'competency'
                                  ? 'Competency'
                                  : 'Practice',
                    }))}
                />
            </div>

            <AttemptsTable attempts={filtered} />
        </div>
    );
};

export default Assessments;
