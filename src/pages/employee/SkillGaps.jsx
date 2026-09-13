// src/pages/employee/SkillGaps.jsx
import { useMemo, useState } from 'react';
import { useSkillGaps } from '../../hooks/useSkillGaps';
import SkillGapSummary from '../../components/employee/skillGap/SkillGapSummary';
import SkillGapFilters from '../../components/employee/skillGap/SkillGapFilters';
import SkillGapCard from '../../components/employee/skillGap/SkillGapCard';

const SkillGaps = () => {
    const { gaps, summary, status } = useSkillGaps();
    const [domain, setDomain] = useState('All');
    const [severity, setSeverity] = useState('All');

    const filtered = useMemo(() => {
        return gaps.filter((g) => {
            const matchesDomain = domain === 'All' || g.domain === domain;
            const matchesSeverity = severity === 'All' || g.status === severity;
            return matchesDomain && matchesSeverity;
        });
    }, [gaps, domain, severity]);

    if (status === 'loading') {
        return (
            <div className="p-8 text-sm text-[var(--muted)]">
                Loading skill gaps...
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="p-8 text-sm text-red-600">
                Failed to load skill gaps.
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-[var(--ink)]">
                    Skill Gaps
                </h1>
                <p className="text-sm text-[var(--muted)] mt-1">
                    Priority areas where your current level falls short of your
                    role's requirement
                </p>
            </div>

            <SkillGapSummary summary={summary} />

            <SkillGapFilters
                domain={domain}
                onDomainChange={setDomain}
                severity={severity}
                onSeverityChange={setSeverity}
            />

            {filtered.length === 0 ? (
                <p className="text-sm text-[var(--muted)]">
                    No gaps match your filters. 🎉
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filtered.map((gap) => (
                        <SkillGapCard key={gap.id} gap={gap} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SkillGaps;
