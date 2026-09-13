
import { Progress } from 'antd';

const statusColor = {
    Meets: '#3a7d44',
    Developing: '#b67b25',
    'Critical Gap': '#c73636',
};

const SkillsBreakdown = ({ skills }) => (
    <div className="rounded-lg border border-[var(--line)] bg-white p-5">
        <h3 className="text-sm font-semibold text-[var(--ink)] mb-4">
            Skills Overview
        </h3>
        <div className="flex flex-col gap-4">
            {skills.map((s) => (
                <div key={s.id}>
                    <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium text-[var(--ink)]">
                            {s.name}
                        </span>
                        <span className="text-xs text-[var(--muted)]">
                            {s.assessmentScore}%
                        </span>
                    </div>
                    <Progress
                        percent={s.assessmentScore}
                        showInfo={false}
                        strokeColor={statusColor[s.status]}
                        trailColor="#e4e8e5"
                    />
                </div>
            ))}
            {skills.length === 0 && (
                <p className="text-sm text-[var(--muted)]">
                    No competency data yet.
                </p>
            )}
        </div>
    </div>
);

export default SkillsBreakdown;
