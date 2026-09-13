
const SummaryCard = ({ label, value, accent }) => (
    <div className="rounded-lg border border-[var(--line)] bg-white p-4">
        <p
            className={`text-2xl font-bold ${accent ? 'text-[var(--ink)]' : 'text-[var(--ink)]'}`}
        >
            {value}
        </p>
        <p className="text-xs text-[var(--muted)] mt-1">{label}</p>
    </div>
);

const CompetencySummary = ({ summary }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <SummaryCard
                    label="Overall competency"
                    value={`${summary.overall}%`}
                />
                <SummaryCard
                    label="Competencies assessed"
                    value={summary.total}
                />
                <SummaryCard label="Skill gaps" value={summary.gaps} />
                <SummaryCard label="Strong areas" value={summary.strong} />
            </div>

            <div className="rounded-lg border border-[var(--line)] bg-white p-5">
                <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-semibold text-[var(--ink)]">
                        Overall Competency
                    </h3>
                    <span className="text-2xl font-bold text-[var(--ink)]">
                        {summary.overall}%
                    </span>
                </div>
                <div className="mt-3 h-2.5 w-full rounded-full bg-[var(--line)] overflow-hidden">
                    <div
                        className="h-full rounded-full bg-[var(--lime)] transition-all duration-500"
                        style={{ width: `${summary.overall}%` }}
                    />
                </div>
                <p className="mt-2 text-xs text-[var(--muted)]">
                    {summary.gaps > 0
                        ? `${summary.gaps} competencies need attention across your role requirements.`
                        : 'All tracked competencies currently meet role requirements.'}
                </p>
            </div>
        </div>
    );
};

export default CompetencySummary;
