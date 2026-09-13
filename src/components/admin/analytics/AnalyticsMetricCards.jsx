
import { Row, Col, Card, Typography } from 'antd';
import {
    AimOutlined,
    TrophyOutlined,
    RiseOutlined,
    FundOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

const MetricCard = ({ icon, label, value, detail, tone }) => (
    <Col xs={24} sm={12} xl={6}>
        <Card
            bordered={false}
            className="h-full rounded-xl border border-[var(--line)] shadow-sm"
        >
            <div className="mb-4 flex items-center gap-3">
                <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--ink)]"
                    style={{ backgroundColor: tone }}
                >
                    {icon}
                </span>
                <Text className="text-sm !text-[var(--muted)] fontApply">
                    {label}
                </Text>
            </div>
            <div className="text-3xl font-bold text-[var(--ink)]">{value}</div>
            <Text className="text-xs !text-[var(--muted)] fontApply">
                {detail}
            </Text>
        </Card>
    </Col>
);

const AnalyticsMetricCards = ({ skillGaps, departmentData }) => {
    const weakest = skillGaps[0];
    const strongest = skillGaps[skillGaps.length - 1];
    const totalAssessments = skillGaps.reduce((s, g) => s + g.attemptCount, 0);
    const topDept = [...departmentData].sort(
        (a, b) => b.avgCompetency - a.avgCompetency
    )[0];

    return (
        <Row gutter={[16, 16]}>
            <MetricCard
                icon={<AimOutlined />}
                label="Weakest skill org-wide"
                value={weakest ? `${weakest.avgScore}%` : '—'}
                detail={weakest?.skillName || 'No data'}
                tone="#f6c6c6"
            />
            <MetricCard
                icon={<TrophyOutlined />}
                label="Strongest skill"
                value={strongest ? `${strongest.avgScore}%` : '—'}
                detail={strongest?.skillName || 'No data'}
                tone="#bfe3dd"
            />
            <MetricCard
                icon={<FundOutlined />}
                label="Top department"
                value={topDept ? `${topDept.avgCompetency}%` : '—'}
                detail={topDept?.department || 'No data'}
                tone="#d4f35b"
            />
            <MetricCard
                icon={<RiseOutlined />}
                label="Assessments analyzed"
                value={totalAssessments}
                detail="Across all skills"
                tone="#d8cbee"
            />
        </Row>
    );
};

export default AnalyticsMetricCards;
