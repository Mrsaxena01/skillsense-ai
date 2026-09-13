
import { useNavigate } from 'react-router-dom';
import { Button, Card, Tag, Typography } from 'antd';
import { ArrowRightOutlined, WarningFilled } from '@ant-design/icons';

const { Title, Text } = Typography;

const AttentionSpotlight = ({ employees }) => {
    const navigate = useNavigate();

    return (
        <Card
            bordered={false}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--ink)] text-white shadow-md"
            styles={{ body: { padding: '24px' } }}
        >
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--lime)] opacity-[0.07] blur-3xl" />

            <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--lime)] text-[var(--ink)]">
                    <WarningFilled />
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-[var(--lime)]">
                    {employees.length} FLAGGED
                </span>
            </div>

            <Title level={4} className="!mt-4 !mb-1 !text-white !font-bold">
                Needs attention
            </Title>
            <Text className="!text-[#cbd5d1] text-sm">
                Lowest-scoring employees across the organization.
            </Text>

            <div className="mt-5 flex flex-col gap-2.5">
                {employees.map((e) => (
                    <button
                        key={e.id}
                        type="button"
                        onClick={() => navigate(`/admin/users/${e.id}`)}
                        className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-3 text-left transition-colors hover:border-white/25"
                    >
                        <span>
                            <span className="block text-sm font-semibold text-white">
                                {e.personal.name}
                            </span>
                            <span className="text-xs text-[#879394]">
                                {e.professional.jobRole}
                            </span>
                        </span>
                        <Tag className="m-0 rounded-full border-0 bg-white/10 !text-[var(--lime)] font-semibold">
                            {e.overallCompetency}%
                        </Tag>
                    </button>
                ))}
            </div>

            <Button
                block
                icon={<ArrowRightOutlined />}
                onClick={() => navigate('/admin/users')}
                className="mt-5 !h-10 !rounded-lg !border-0 !bg-[var(--lime)] !font-bold !text-[var(--ink)]"
            >
                View all employees
            </Button>
        </Card>
    );
};

export default AttentionSpotlight;
