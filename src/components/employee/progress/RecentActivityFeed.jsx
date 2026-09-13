
import { BookOutlined, FileTextOutlined } from '@ant-design/icons';

const RecentActivityFeed = ({ activities }) => (
    <div className="rounded-lg border border-[var(--line)] bg-white p-5">
        <h3 className="text-sm font-semibold text-[var(--ink)] mb-4">
            Recent Learning Activity
        </h3>
        <div className="flex flex-col gap-3">
            {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f0fcd0] text-[var(--ink)]">
                        {a.type === 'assessment' ? (
                            <FileTextOutlined />
                        ) : (
                            <BookOutlined />
                        )}
                    </span>
                    <div>
                        <p className="text-sm text-[var(--ink)] m-0">
                            {a.label}
                        </p>
                        <p className="text-xs text-[var(--muted)] m-0">
                            {a.date}
                        </p>
                    </div>
                </div>
            ))}
            {activities.length === 0 && (
                <p className="text-sm text-[var(--muted)]">
                    No recent activity.
                </p>
            )}
        </div>
    </div>
);

export default RecentActivityFeed;
