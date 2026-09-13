
import { Col, Row, Card, Typography } from 'antd';
import {
    TeamOutlined,
    SafetyCertificateOutlined,
    UserSwitchOutlined,
    ApartmentOutlined,
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
                <Text className="text-sm !text-[var(--muted)]">{label}</Text>
            </div>
            <div className="text-3xl font-bold text-[var(--ink)]">{value}</div>
            <Text className="text-xs !text-[var(--muted)]">{detail}</Text>
        </Card>
    </Col>
);

const OrgMetricCards = ({ data }) => (
    <Row gutter={[16, 16]}>
        <MetricCard
            icon={<TeamOutlined />}
            label="Total employees"
            value={data.totalEmployees}
            detail={`Across ${data.departmentBreakdown.length} departments`}
            tone="#d4f35b"
        />
        <MetricCard
            icon={<SafetyCertificateOutlined />}
            label="Avg. competency"
            value={`${data.avgCompetency}%`}
            detail="Organization-wide"
            tone="#bfe3dd"
        />
        <MetricCard
            icon={<UserSwitchOutlined />}
            label="On leave"
            value={data.onLeaveCount}
            detail={`${data.activeCount} currently active`}
            tone="#f6c6c6"
        />
        <MetricCard
            icon={<ApartmentOutlined />}
            label="Tracked domains"
            value={data.domainCount}
            detail="Statistical, Technical & more"
            tone="#d8cbee"
        />
    </Row>
);

export default OrgMetricCards;
