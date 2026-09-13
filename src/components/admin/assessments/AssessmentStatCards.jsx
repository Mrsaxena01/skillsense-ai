
const Card = ({ label, value }) => (
    <div className="rounded-lg border border-[var(--line)] bg-white p-4">
        <p className="text-2xl font-bold text-[var(--ink)]">{value}</p>
        <p className="text-xs text-[var(--muted)] mt-1">{label}</p>
    </div>
);

const AssessmentStatCards = ({ attempts, banks }) => {
    const completed = attempts.filter((a) => a.status === 'Completed');
    const avgScore =
        completed.length === 0
            ? 0
            : Math.round(
                  completed.reduce((s, a) => s + a.scorePercent, 0) /
                      completed.length
              );
    const pendingReviews = banks.filter(
        (b) => b.reviewStatus === 'Pending'
    ).length;

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Card label="Total attempts" value={attempts.length} />
            <Card label="Completed" value={completed.length} />
            <Card label="Org avg. score" value={`${avgScore}%`} />
            <Card label="Pending reviews" value={pendingReviews} />
        </div>
    );
};

export default AssessmentStatCards;
