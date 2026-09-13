
import { Typography } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { formatDate } from '../../../utils/profile.utils';

const { Text } = Typography;

const TrainingTimeline = ({ items }) => (
    <ol className="relative space-y-4">
        {items.map((item, idx) => {
            const isCompleted = item.status === 'Completed';
            return (
                <li
                    key={item.id || idx}
                    className="relative flex items-start gap-4 rounded-xl border border-[var(--line)] bg-[#fafbfa] p-4 transition-colors hover:border-[#ccd3d0]"
                >
                    <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                            isCompleted
                                ? 'bg-[var(--ink)] text-[var(--lime)]'
                                : 'border border-[var(--line)] bg-white text-[var(--muted)]'
                        }`}
                    >
                        <BookOutlined />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                            <Text
                                strong
                                className="!text-sm !text-[var(--ink)]"
                            >
                                {item.title}
                            </Text>
                            <span
                                className={`mt-1 inline-flex w-fit items-center rounded-md px-2 py-0.5 text-xs font-semibold sm:mt-0 ${
                                    isCompleted
                                        ? 'bg-[#eef8cb] text-[var(--ink)]'
                                        : 'border border-[var(--line)] bg-white text-[var(--muted)]'
                                }`}
                            >
                                {isCompleted ? 'Completed' : 'In Progress'}
                            </span>
                        </div>
                        <Text className="mt-1 block text-xs !text-[var(--muted)]">
                            {item.provider}
                        </Text>
                        {item.completedAt && (
                            <span className="mt-1 block text-[11px] text-[var(--muted)]">
                                Finished on: {formatDate(item.completedAt)}
                            </span>
                        )}
                    </div>
                </li>
            );
        })}
    </ol>
);

export default TrainingTimeline;
