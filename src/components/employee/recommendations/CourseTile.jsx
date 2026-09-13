
import { Tag, Button } from 'antd';
import { ClockCircleOutlined, BankOutlined } from '@ant-design/icons';

const CourseTile = ({ course, isBestMatch }) => (
    <div
        className={`rounded-lg border p-3.5 flex flex-col gap-2 ${
            isBestMatch
                ? 'border-[var(--ink)] bg-[#fafdf2]'
                : 'border-[var(--line)] bg-white'
        }`}
    >
        <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold text-[var(--ink)]">
                {course.title}
            </p>
            {isBestMatch && (
                <Tag className="!m-0 !bg-[var(--lime)] !border-none !text-[var(--ink)] !text-[10px] !font-bold">
                    BEST MATCH
                </Tag>
            )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--muted)]">
            <span className="flex items-center gap-1">
                <BankOutlined /> {course.provider}
            </span>
            <span className="flex items-center gap-1">
                <ClockCircleOutlined /> {course.durationHours}h
            </span>
            <span>{course.level}</span>
        </div>

        <Button
            size="small"
            className="self-start !rounded-md !border-[var(--line)] !text-[var(--ink)] !font-medium hover:!border-[var(--ink)]"
        >
            View course
        </Button>
    </div>
);

export default CourseTile;
