
import { Card, Progress, Typography } from 'antd';

const { Title, Text } = Typography;

const DepartmentBreakdown = ({ departments }) => (
    <Card
        bordered={false}
        className="rounded-xl border border-[var(--line)] shadow-sm h-full"
    >
        <Title level={4} className="!mb-1 !font-bold !text-[var(--ink)]">
            Department-wise competency
        </Title>
        <Text className="!text-[var(--muted)]">
            Average score by department, ranked highest to lowest.
        </Text>

        <div className="mt-5 flex flex-col gap-4">
            {[...departments]
                .sort((a, b) => b.avgCompetency - a.avgCompetency)
                .map((d) => (
                    <div key={d.department}>
                        <div className="flex items-center justify-between text-sm mb-1.5">
                            <span className="font-medium text-[var(--ink)]">
                                {d.department}
                            </span>
                            <span className="text-xs text-[var(--muted)]">
                                {d.count} staff · {d.avgCompetency}%
                            </span>
                        </div>
                        <Progress
                            percent={d.avgCompetency}
                            showInfo={false}
                            strokeColor="#d4f35b"
                            trailColor="#e4e8e5"
                        />
                    </div>
                ))}
        </div>
    </Card>
);

export default DepartmentBreakdown;
