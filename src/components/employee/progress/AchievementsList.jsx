
import { TrophyFilled } from '@ant-design/icons';

const AchievementsList = ({ achievements }) => (
    <div className="rounded-lg border border-[var(--line)] bg-white p-5">
        <h3 className="text-sm font-semibold text-[var(--ink)] mb-4">
            Learning Milestones
        </h3>
        {achievements.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">
                Complete a course to earn your first milestone.
            </p>
        ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {achievements.map((a) => (
                    <div
                        key={a.id}
                        className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3"
                    >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--lime)] text-[var(--ink)]">
                            <TrophyFilled />
                        </span>
                        <div>
                            <p className="text-sm font-medium text-[var(--ink)] m-0">
                                {a.title}
                            </p>
                            <p className="text-xs text-[var(--muted)] m-0">
                                {a.date}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default AchievementsList;
