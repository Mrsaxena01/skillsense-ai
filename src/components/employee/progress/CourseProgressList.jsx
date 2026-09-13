
import { Progress, Tag } from 'antd';
import {
    BookOutlined,
    CheckCircleFilled,
    PlayCircleFilled,
} from '@ant-design/icons';

const statusConfig = {
    Completed: { color: '#3a7d44', bg: '#eaf6ec', label: 'Completed' },
    'In Progress': { color: '#182630', bg: '#f0fcd0', label: 'In progress' },
    'Not Started': { color: '#879394', bg: '#f4f5f4', label: 'Not started' },
};

const CourseProgressList = ({ courses, onContinue }) => (
    <div className="rounded-lg border border-[var(--line)] bg-white p-5">
        <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-[var(--ink)]">
                Course Progress
            </h3>
            <span className="text-xs text-[var(--muted)]">
                {courses.length} enrolled
            </span>
        </div>

        {courses.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">
                No enrolled courses yet.
            </p>
        ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {courses.map((c) => {
                    const cfg =
                        statusConfig[c.status] || statusConfig['Not Started'];
                    return (
                        <button
                            key={c.id}
                            type="button"
                            onClick={() => onContinue(c.id)}
                            className="group flex flex-col gap-3 rounded-lg border border-[var(--line)] p-4 text-left transition-colors hover:border-[var(--ink)]"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <span
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                                    style={{
                                        backgroundColor: cfg.bg,
                                        color: cfg.color,
                                    }}
                                >
                                    {c.status === 'Completed' ? (
                                        <CheckCircleFilled />
                                    ) : c.status === 'In Progress' ? (
                                        <PlayCircleFilled />
                                    ) : (
                                        <BookOutlined />
                                    )}
                                </span>
                                <Progress
                                    type="circle"
                                    percent={c.progressPercent}
                                    size={40}
                                    strokeColor="#d4f35b"
                                    trailColor="#e4e8e5"
                                    format={(p) => (
                                        <span
                                            style={{
                                                fontSize: 11,
                                                fontWeight: 600,
                                                color: 'var(--ink)',
                                            }}
                                        >
                                            {p}%
                                        </span>
                                    )}
                                />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-[var(--ink)] leading-snug line-clamp-2 group-hover:underline">
                                    {c.title}
                                </p>
                                <p className="text-xs text-[var(--muted)] mt-1">
                                    {c.provider}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-[var(--line)]">
                                <Tag
                                    className="m-0 rounded-full border-0 px-2.5 py-0.5 text-[11px] font-medium"
                                    style={{
                                        backgroundColor: cfg.bg,
                                        color: cfg.color,
                                    }}
                                >
                                    {cfg.label}
                                </Tag>
                                <span className="text-[11px] text-[var(--muted)]">
                                    {c.completedModules}/{c.totalModules}{' '}
                                    modules
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        )}
    </div>
);

export default CourseProgressList;
