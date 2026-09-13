
const Card = ({ label, value }) => (
    <div className="rounded-lg border border-[var(--line)] bg-white p-4">
        <p className="text-2xl font-bold text-[var(--ink)]">{value}</p>
        <p className="text-xs text-[var(--muted)] mt-1">{label}</p>
    </div>
);

const ProgressStatCards = ({ overview, avgAssessmentScore }) => (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card
            label="Overall competency"
            value={`${overview.overallCompetency}%`}
        />
        <Card
            label="Learning completion"
            value={`${overview.learningCompletion}%`}
        />
        <Card label="Open skill gaps" value={overview.openGaps} />
        <Card label="Avg. assessment score" value={`${avgAssessmentScore}%`} />
    </div>
);

export default ProgressStatCards;
