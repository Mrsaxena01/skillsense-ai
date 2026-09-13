// src/pages/employee/Recommendations.jsx
import { useMemo, useState } from 'react';
import { useRecommendations } from '../../hooks/useRecommendations';
import RecommendationFilters from '../../components/employee/recommendations/RecommendationFilters';
import RecommendationGroup from '../../components/employee/recommendations/RecommendationGroup';

const Recommendations = () => {
    const { recommendations, status } = useRecommendations();
    const [priority, setPriority] = useState('All');

    const filtered = useMemo(() => {
        return recommendations.filter(
            (r) => priority === 'All' || r.priority === priority
        );
    }, [recommendations, priority]);

    if (status === 'loading') {
        return (
            <div className="p-8 text-sm text-[var(--muted)]">
                Loading recommendations...
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="p-8 text-sm text-red-600">
                Failed to load recommendations.
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--ink)]">
                        Recommended Learning
                    </h1>
                    <p className="text-sm text-[var(--muted)] mt-1">
                        Personalized course suggestions from iGOT Karmayogi &
                        NSSTA, based on your skill gaps
                    </p>
                </div>
                <RecommendationFilters
                    priority={priority}
                    onPriorityChange={setPriority}
                />
            </div>

            {filtered.length === 0 ? (
                <p className="text-sm text-[var(--muted)]">
                    No recommendations for the selected priority.
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {filtered.map((rec) => (
                        <RecommendationGroup
                            key={rec.gapId}
                            recommendation={rec}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Recommendations;
