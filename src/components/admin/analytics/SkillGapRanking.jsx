
import { Card, Typography, Tag } from 'antd';
import { WarningFilled, CheckCircleFilled } from '@ant-design/icons';

const { Title, Text } = Typography;

const tierColor = (score) =>
    score < 50 ? '#c73636' : score < 70 ? '#b67b25' : '#178f85';
const tierBg = (score) =>
    score < 50 ? '#fbe9e9' : score < 70 ? '#faf1e0' : '#e5f3f0';

const SkillGapRanking = ({ skillGaps }) => (
    <Card
        bordered={false}
        className="rounded-xl border border-[var(--line)] shadow-sm"
    >
        <div className="mb-5 flex items-start justify-between">
            <div>
                <Title
                    level={4}
                    className="!mb-1 !font-bold !text-[var(--ink)] fontApply"
                >
                    Org-wide skill gap ranking
                </Title>
                <Text className="!text-[var(--muted)] fontApply">
                    Average assessment score per skill — weakest first, signals
                    where to focus capacity building.
                </Text>
            </div>
            <Tag color="error" className="m-0 rounded-full">
                {skillGaps.filter((s) => s.avgScore < 50).length} critical
            </Tag>
        </div>

        {skillGaps.length === 0 ? (
            <Text className="!text-[var(--muted)] text-sm fontApply">
                No completed assessments yet to analyze.
            </Text>
        ) : (
            <div className="flex flex-col gap-3">
                {skillGaps.map((s, i) => (
                    <div
                        key={s.skillName}
                        className="flex items-center gap-4 rounded-lg border border-[var(--line)] p-3.5"
                        style={{
                            backgroundColor:
                                i === 0 ? tierBg(s.avgScore) : 'white',
                        }}
                    >
                        <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-bold text-sm"
                            style={{
                                backgroundColor: tierBg(s.avgScore),
                                color: tierColor(s.avgScore),
                            }}
                        >
                            {s.avgScore < 50 ? (
                                <WarningFilled />
                            ) : i === skillGaps.length - 1 ? (
                                <CheckCircleFilled />
                            ) : (
                                `#${i + 1}`
                            )}
                        </span>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between text-sm mb-1.5">
                                <span className="font-semibold text-[var(--ink)]">
                                    {s.skillName}
                                </span>
                                <span className="text-xs text-[var(--muted)]">
                                    {s.attemptCount} attempts
                                </span>
                            </div>
                            <div className="h-2 rounded-full bg-[var(--line)] overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                        width: `${s.avgScore}%`,
                                        backgroundColor: tierColor(s.avgScore),
                                    }}
                                />
                            </div>
                        </div>

                        <span
                            className="text-lg font-bold shrink-0"
                            style={{ color: tierColor(s.avgScore) }}
                        >
                            {s.avgScore}%
                        </span>
                    </div>
                ))}
            </div>
        )}
    </Card>
);

export default SkillGapRanking;
