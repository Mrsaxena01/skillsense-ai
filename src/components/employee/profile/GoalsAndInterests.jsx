
import { Empty, Tag, Typography } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';

const { Text } = Typography;

const GoalsAndInterests = ({ careerGoals, interests }) => (
    <div className="space-y-8">
        <div>
            <div className="mb-3 flex items-center gap-2">
                <TrophyOutlined className="text-[var(--ink)]" />
                <Text
                    strong
                    className="text-xs uppercase tracking-wider text-[var(--muted)]"
                >
                    Career Milestones & Goals
                </Text>
            </div>
            {careerGoals.length ? (
                <div className="flex flex-wrap gap-2">
                    {careerGoals.map((goal) => (
                        <Tag
                            key={goal}
                            className="m-0 rounded-lg border border-[var(--line)] !bg-white px-3 py-1.5 text-sm font-semibold !text-[var(--ink)] shadow-2xs"
                        >
                            {goal}
                        </Tag>
                    ))}
                </div>
            ) : (
                <Empty description="No career goals listed" />
            )}
        </div>

        <div>
            <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--lime)] ring-4 ring-[#f0fcd0]" />
                <Text
                    strong
                    className="text-xs uppercase tracking-wider text-[var(--muted)]"
                >
                    Identified Areas of Interest
                </Text>
            </div>
            {interests.length ? (
                <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                        <Tag
                            key={interest}
                            className="m-0 rounded-lg !border-0 !bg-[#eef8cb] px-3 py-1.5 text-sm font-medium !text-[var(--ink)]"
                        >
                            {interest}
                        </Tag>
                    ))}
                </div>
            ) : (
                <Empty description="No interest areas recorded" />
            )}
        </div>
    </div>
);

export default GoalsAndInterests;
