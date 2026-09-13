
const Card = ({ label, value }) => (
    <div className="rounded-lg border border-[var(--line)] bg-white p-4">
        <p className="text-2xl font-bold text-[var(--ink)]">{value}</p>
        <p className="text-xs text-[var(--muted)] mt-1">{label}</p>
    </div>
);

const LearningSummary = ({ summary }) => (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card label="Enrolled" value={summary.total} />
        <Card label="Completed" value={summary.completed} />
        <Card label="In Progress" value={summary.inProgress} />
        <Card label="Avg. Progress" value={`${summary.avgProgress}%`} />
    </div>
);

export default LearningSummary;
