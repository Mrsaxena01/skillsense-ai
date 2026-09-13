
import { Tag } from 'antd';

const AssessmentHistoryList = ({ assessments }) => (
    <div className="rounded-lg border border-[var(--line)] bg-white p-5">
        <h3 className="text-sm font-semibold text-[var(--ink)] mb-4">
            Assessment Performance
        </h3>
        <div className="flex flex-col gap-3">
            {assessments.map((a) => (
                <div
                    key={a.id}
                    className="flex items-center justify-between border-b border-[var(--line)] pb-3 last:border-0 last:pb-0"
                >
                    <div>
                        <p className="text-sm font-medium text-[var(--ink)] m-0">
                            {a.skillName}
                        </p>
                        <p className="text-xs text-[var(--muted)] m-0">
                            {a.sourceTitle}
                        </p>
                    </div>
                    <Tag color={a.status === 'Completed' ? 'green' : 'default'}>
                        {a.status === 'Completed'
                            ? `${a.scorePercent}%`
                            : 'Not attempted'}
                    </Tag>
                </div>
            ))}
            {assessments.length === 0 && (
                <p className="text-sm text-[var(--muted)]">
                    No assessments yet.
                </p>
            )}
        </div>
    </div>
);

export default AssessmentHistoryList;
