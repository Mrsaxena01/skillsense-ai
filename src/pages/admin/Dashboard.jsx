// src/pages/admin/Dashboard.jsx
import { Row, Col, Typography } from 'antd';
import { ApartmentOutlined } from '@ant-design/icons';
import { useAdminDashboard } from '../../hooks/useAdminDashboard';
import OrgMetricCards from '../../components/admin/dashboard/OrgMetricCards';
import CompetencyDonut from '../../components/admin/dashboard/CompetencyDonut';
import DepartmentBreakdown from '../../components/admin/dashboard/DepartmentBreakdown';
import AttentionSpotlight from '../../components/admin/dashboard/AttentionSpotlight';

const { Title, Text } = Typography;

const Dashboard = () => {
    const { data, status, error } = useAdminDashboard();

    if (status === 'loading') {
        return (
            <div className="p-8 text-sm text-[var(--muted)]">
                Loading dashboard...
            </div>
        );
    }

    if (status === 'error' || !data) {
        return (
            <div className="p-8 text-sm text-red-600">
                Failed to load dashboard.
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#fafbfa] px-4 py-4 text-[var(--ink)] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <header>
                    {/* <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--lime)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--ink)] fontApply">
                        <ApartmentOutlined /> Workforce intelligence
                    </div> */}
                    <Title
                        level={2}
                        className="!mb-1 !font-bold !text-[var(--ink)] fontApply"
                    >
                        Admin Dashboard
                    </Title>
                    <Text className="!text-[var(--muted)] fontApply">
                        Organization-wide competency and capacity-building
                        overview.
                    </Text>
                </header>

                <OrgMetricCards data={data} />

                <Row gutter={[16, 16]}>
                    <Col xs={24} xl={14}>
                        <CompetencyDonut
                            distribution={data.competencyDistribution}
                            total={data.totalEmployees}
                            avgCompetency={data.avgCompetency}
                        />
                    </Col>
                    <Col xs={24} xl={10}>
                        <AttentionSpotlight employees={data.lowestPerformers} />
                    </Col>
                </Row>

                <DepartmentBreakdown departments={data.departmentBreakdown} />
            </div>
        </main>
    );
};

export default Dashboard;
