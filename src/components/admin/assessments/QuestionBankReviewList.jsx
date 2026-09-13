
import { Tag, Button } from 'antd';
import {
    CheckOutlined,
    CloseOutlined,
    FileTextOutlined,
} from '@ant-design/icons';

const statusColor = { Approved: 'green', Pending: 'gold', Rejected: 'red' };

const QuestionBankReviewList = ({ banks, onReview }) => (
    <div className="rounded-lg border border-[var(--line)] bg-white p-5">
        <h3 className="text-sm font-semibold text-[var(--ink)] mb-4">
            AI-generated question banks
        </h3>
        <div className="flex flex-col gap-3">
            {banks.map((b) => (
                <div
                    key={b.id}
                    className="flex items-center justify-between rounded-lg border border-[var(--line)] p-3"
                >
                    <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f0fcd0] text-[var(--ink)]">
                            <FileTextOutlined />
                        </span>
                        <div>
                            <p className="text-sm font-medium text-[var(--ink)] m-0">
                                {b.sourceTitle}
                            </p>
                            <p className="text-xs text-[var(--muted)] m-0">
                                {b.skillName} · {b.questionCount} questions ·{' '}
                                {b.generatedAt}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Tag
                            color={statusColor[b.reviewStatus]}
                            className="m-0"
                        >
                            {b.reviewStatus}
                        </Tag>
                        {b.reviewStatus === 'Pending' && (
                            <>
                                <Button
                                    size="small"
                                    icon={<CheckOutlined />}
                                    onClick={() => onReview(b.id, 'Approved')}
                                    className="!rounded-md !border-none !bg-[var(--lime)] !text-[var(--ink)] !font-semibold"
                                />
                                <Button
                                    size="small"
                                    danger
                                    icon={<CloseOutlined />}
                                    onClick={() => onReview(b.id, 'Rejected')}
                                    className="!rounded-md"
                                />
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default QuestionBankReviewList;
