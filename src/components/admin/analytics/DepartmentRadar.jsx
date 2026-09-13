
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;
const COLORS = ['#182630', '#178f85', '#b67b25', '#7b5ea7', '#c73636'];

const DepartmentRadar = ({ data }) => {
    const chartGradient = (() => {
        const total = data.reduce((s, d) => s + d.avgCompetency, 0);
        if (total === 0) return '#edf0ed 0% 100%';
        let start = 0;
        return data
            .map((d, i) => {
                const share = (d.avgCompetency / total) * 100;
                const end = start + share;
                const segment = `${COLORS[i % COLORS.length]} ${start}% ${end}%`;
                start = end;
                return segment;
            })
            .join(', ');
    })();

    const overallAvg = Math.round(
        data.reduce((s, d) => s + d.avgCompetency, 0) / data.length
    );

    return (
        <Card
            bordered={false}
            className="rounded-xl border border-[var(--line)] shadow-sm h-full"
        >
            <Title
                level={4}
                className="!mb-1 !font-bold !text-[var(--ink)] fontApply"
            >
                Department comparison
            </Title>
            <Text className="!text-[var(--muted)] fontApply">
                Competency share across departments.
            </Text>

            <div className="mt-10 flex flex-col items-center gap-12">
                <div className="flex justify-center">
                    <div
                        className="relative flex h-36 w-36 items-center justify-center rounded-full"
                        style={{
                            background: `conic-gradient(${chartGradient})`,
                        }}
                        role="img"
                        aria-label="Department competency comparison"
                    >
                        <div
                            className="flex h-22 w-22 flex-col items-center justify-center rounded-full bg-white"
                            style={{ height: 88, width: 88 }}
                        >
                            <span className="text-lg font-bold text-[var(--ink)]">
                                {overallAvg}%
                            </span>
                            <span className="text-[10px] text-[var(--muted)]">
                                org avg
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {data.map((d, i) => (
                        <div key={d.department}>
                            <div className="flex items-center justify-between text-xs mb-1">
                                <span className="flex items-center gap-1.5 font-medium text-[var(--ink)] truncate">
                                    <span
                                        className="h-2 w-2 shrink-0 rounded-full"
                                        style={{
                                            backgroundColor:
                                                COLORS[i % COLORS.length],
                                        }}
                                    />
                                    {d.department}
                                </span>
                                <span className="text-[var(--muted)] shrink-0 ml-2">
                                    {d.avgCompetency}%
                                </span>
                            </div>
                            <div className="h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${d.avgCompetency}%`,
                                        backgroundColor:
                                            COLORS[i % COLORS.length],
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default DepartmentRadar;
