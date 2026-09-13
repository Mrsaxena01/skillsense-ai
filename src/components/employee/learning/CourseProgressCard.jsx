
import { Progress, Tag, Button } from 'antd';
import {
    BankOutlined,
    PlayCircleOutlined,
    CheckCircleFilled,
} from '@ant-design/icons';

const statusColor = {
    'In Progress': 'blue',
    Completed: 'green',
    'Not Started': 'default',
};

const CourseProgressCard = ({ course }) => {
    const {
        title,
        provider,
        skillName,
        progressPercent,
        status,
        completedModules,
        totalModules,
        lastAccessedAt,
    } = course;

    return (
        <div className="rounded-lg border border-[var(--line)] bg-white p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
                <div>
                    <h4 className="font-semibold text-[var(--ink)]">{title}</h4>
                    <p className="text-xs text-[var(--muted)] flex items-center gap-1 mt-0.5">
                        <BankOutlined /> {provider} · {skillName}
                    </p>
                </div>
                <Tag color={statusColor[status]}>{status}</Tag>
            </div>

            <div>
                <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-1">
                    <span>
                        {completedModules}/{totalModules} modules
                    </span>
                    <span>{progressPercent}%</span>
                </div>
                <Progress
                    percent={progressPercent}
                    strokeColor="#d4f35b"
                    trailColor="#e4e8e5"
                    showInfo={false}
                />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[var(--line)]">
                <span className="text-xs text-[var(--muted)]">
                    {lastAccessedAt
                        ? `Last accessed: ${lastAccessedAt}`
                        : 'Not started yet'}
                </span>
                <Button
                    size="small"
                    icon={
                        status === 'Completed' ? (
                            <CheckCircleFilled />
                        ) : (
                            <PlayCircleOutlined />
                        )
                    }
                    className={
                        status === 'Completed'
                            ? '!rounded-md !border-[var(--line)] !text-[var(--ink)]'
                            : '!rounded-md !border-none !bg-[var(--ink)] !text-[var(--lime)] !font-semibold'
                    }
                >
                    {status === 'Completed'
                        ? 'Review'
                        : status === 'Not Started'
                          ? 'Start'
                          : 'Continue'}
                </Button>
            </div>
        </div>
    );
};

export default CourseProgressCard;
