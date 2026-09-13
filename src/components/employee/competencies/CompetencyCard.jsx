
import CompetencyLevel from './CompetencyLevel';

const statusStyles = {
    Meets: 'bg-green-50 text-green-700 border-green-200',
    Developing: 'bg-amber-50 text-amber-700 border-amber-200',
    'Critical Gap': 'bg-red-50 text-red-700 border-red-200',
};

const statusIcon = {
    Meets: 'ri-checkbox-circle-line',
    Developing: 'ri-error-warning-line',
    'Critical Gap': 'ri-alert-line',
};

const CompetencyCard = ({ competency, onViewDetails }) => {
    const {
        name,
        domain,
        currentLevel,
        requiredLevel,
        status,
        assessmentScore,
        lastAssessedAt,
    } = competency;

    return (
        <div className="rounded-lg border border-[var(--line)] bg-white p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between">
                <div>
                    <h4 className="font-semibold text-[var(--ink)]">{name}</h4>
                    <p className="text-xs text-[var(--muted)]">
                        {domain} Competency
                    </p>
                </div>
                <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
                >
                    <i className={statusIcon[status]} />
                    {status}
                </span>
            </div>

            <div className="flex flex-col gap-2">
                <CompetencyLevel
                    label="Current"
                    level={currentLevel}
                    variant="current"
                />
                <CompetencyLevel
                    label="Required"
                    level={requiredLevel}
                    variant="required"
                />
            </div>

            <div className="flex items-center justify-between text-xs text-[var(--muted)] pt-2 border-t border-[var(--line)]">
                <span>Score: {assessmentScore}%</span>
                <span>Last assessed: {lastAssessedAt}</span>
            </div>

            <button
                type="button"
                onClick={() => onViewDetails(competency)}
                className="self-start text-sm font-medium text-[var(--ink)] hover:text-[var(--muted)] transition-colors"
            >
                View Details →
            </button>
        </div>
    );
};

export default CompetencyCard;
