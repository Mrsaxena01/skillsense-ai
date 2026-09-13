
import { Card, Button, Typography } from 'antd';
import { ArrowRightOutlined, BulbFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const FocusAreaSpotlight = ({ weakestSkill }) => {
    const navigate = useNavigate();
    if (!weakestSkill) return null;

    return (
        <Card
            bordered={false}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--ink)] text-white shadow-md"
            styles={{ body: { padding: '24px' } }}
        >
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--lime)] opacity-[0.07] blur-3xl" />

            <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--lime)] text-[var(--ink)]">
                    <BulbFilled />
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-[var(--lime)]">
                    RECOMMENDED FOCUS
                </span>
            </div>

            <Title level={4} className="!mt-4 !mb-1 !text-white !font-bold">
                {weakestSkill.skillName}
            </Title>
            <Text className="!text-[#cbd5d1] text-sm fontApply">
                Lowest org-wide average at {weakestSkill.avgScore}% across{' '}
                {weakestSkill.attemptCount} assessments. Prioritize this in the
                next training cycle.
            </Text>

            <Button
                icon={<ArrowRightOutlined />}
                onClick={() => navigate('/admin/courses')}
                className="mt-5 !h-10 !rounded-lg !border-0 !bg-[var(--lime)] !font-bold !text-[var(--ink)]"
            >
                Find matching courses
            </Button>
        </Card>
    );
};

export default FocusAreaSpotlight;
