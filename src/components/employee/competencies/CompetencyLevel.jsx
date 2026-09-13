
import { competencyLevelLabels } from '../../../mock/competencies.mock';

const CompetencyLevel = ({ label, level, variant = 'current' }) => {
    const percentage = (level / 5) * 100;
    const barColor =
        variant === 'current' ? 'bg-[var(--ink)]' : 'bg-[var(--lime)]';

    return (
        <div className="flex items-center gap-3 text-sm">
            <span className="w-16 shrink-0 text-[var(--muted)]">{label}</span>
            <div className="h-2 flex-1 rounded-full bg-[var(--line)] overflow-hidden">
                <div
                    className={`h-full rounded-full ${barColor} transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <span className="w-24 shrink-0 text-right font-medium text-[var(--ink)]">
                {competencyLevelLabels[level]}
            </span>
        </div>
    );
};

export default CompetencyLevel;
