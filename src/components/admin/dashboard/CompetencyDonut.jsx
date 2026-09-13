
import { Typography } from 'antd';

const { Title, Text } = Typography;

const TIER_COLORS = ['#c73636', '#b67b25', '#178f85', '#182630'];

const CompetencyDonut = ({ distribution, total, avgCompetency }) => {
    const chartGradient = (() => {
        const sum = distribution.reduce((s, d) => s + d.count, 0);
        if (sum === 0) return '#edf0ed 0% 100%';
        let start = 0;
        return distribution
            .map((d, i) => {
                const share = (d.count / sum) * 100;
                const end = start + share;
                const segment = `${TIER_COLORS[i]} ${start}% ${end}%`;
                start = end;
                return segment;
            })
            .join(', ');
    })();

    return (
        <div className="rounded-xl border border-[var(--line)] bg-white p-6 shadow-sm h-full">
            <Title level={4} className="!mb-1 !font-bold !text-[var(--ink)]">
                Competency distribution
            </Title>
            <Text className="!text-[var(--muted)]">
                How the workforce spreads across performance tiers.
            </Text>

            <div className="mt-6 grid items-center gap-8 md:grid-cols-[160px_1fr]">
                <div className="flex justify-center">
                    <div
                        className="relative flex h-40 w-40 items-center justify-center rounded-full"
                        style={{
                            background: `conic-gradient(${chartGradient})`,
                        }}
                        role="img"
                        aria-label="Employee competency tier distribution"
                    >
                        <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
                            <span className="text-xl font-bold text-[var(--ink)]">
                                {avgCompetency}%
                            </span>
                            <span className="text-[11px] text-[var(--muted)]">
                                avg score
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {distribution.map((d, i) => (
                        <div
                            key={d.label}
                            className="flex items-center justify-between text-sm"
                        >
                            <span className="flex items-center gap-2 font-medium text-[var(--ink)]">
                                <span
                                    className="h-2.5 w-2.5 rounded-full"
                                    style={{ backgroundColor: TIER_COLORS[i] }}
                                />
                                {d.label}
                            </span>
                            <span className="text-[var(--muted)]">
                                {d.count} employees
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompetencyDonut;
