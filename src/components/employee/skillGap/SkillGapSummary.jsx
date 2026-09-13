
const Card = ({ label, value, tone }) => (
    <div className="rounded-lg border border-[var(--line)] bg-white p-4">
        <p className={`text-2xl font-bold ${tone || 'text-[var(--ink)]'}`}>
            {value}
        </p>
        <p className="text-xs text-[var(--muted)] mt-1">{label}</p>
    </div>
);

const SkillGapSummary = ({ summary }) => (
    <div className="grid grid-cols-3 gap-4">
        <Card label="Total gaps" value={summary.total} />
        <Card label="Critical" value={summary.critical} tone="text-red-600" />
        <Card
            label="Developing"
            value={summary.developing}
            tone="text-amber-600"
        />
    </div>
);

export default SkillGapSummary;
