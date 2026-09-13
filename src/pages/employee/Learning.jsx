// src/pages/employee/Learning.jsx
import { useMemo, useState } from 'react';
import { useLearning } from '../../hooks/useLearning';
import LearningSummary from '../../components/employee/learning/LearningSummary';
import LearningFilters from '../../components/employee/learning/LearningFilters';
import CourseProgressCard from '../../components/employee/learning/CourseProgressCard';

const Learning = () => {
    const { courses, summary, status } = useLearning();
    const [statusFilter, setStatusFilter] = useState('All');

    const filtered = useMemo(() => {
        return courses.filter(
            (c) => statusFilter === 'All' || c.status === statusFilter
        );
    }, [courses, statusFilter]);

    if (status === 'loading') {
        return (
            <div className="p-8 text-sm text-[var(--muted)]">
                Loading your learning...
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="p-8 text-sm text-red-600">
                Failed to load learning data.
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--ink)]">
                        My Learning
                    </h1>
                    <p className="text-sm text-[var(--muted)] mt-1">
                        Track progress on your enrolled courses
                    </p>
                </div>
                <LearningFilters
                    status={statusFilter}
                    onStatusChange={setStatusFilter}
                />
            </div>

            <LearningSummary summary={summary} />

            {filtered.length === 0 ? (
                <p className="text-sm text-[var(--muted)]">
                    No courses match this filter.
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filtered.map((c) => (
                        <CourseProgressCard key={c.id} course={c} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Learning;
