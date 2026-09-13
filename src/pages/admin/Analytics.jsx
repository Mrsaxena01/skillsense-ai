
import { Row, Col, Typography } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import { useAnalytics } from '../../hooks/useAnalytics';
import AnalyticsMetricCards from '../../components/admin/analytics/AnalyticsMetricCards';
import SkillGapRanking from '../../components/admin/analytics/SkillGapRanking';
import DepartmentRadar from '../../components/admin/analytics/DepartmentRadar';
import FocusAreaSpotlight from '../../components/admin/analytics/FocusAreaSpotlight';

const { Title, Text } = Typography;

const Analytics = () => {
    const { skillGaps, departmentData, status } = useAnalytics();

    if (status === 'loading') {
        return (
            <div className="p-8 text-sm text-[var(--muted)]">
                Loading analytics...
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="p-8 text-sm text-red-600">
                Failed to load analytics.
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#fafbfa] px-4 text-[var(--ink)] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <header>
                    {/* <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--lime)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--ink)]">
                        <BarChartOutlined /> Training effectiveness
                    </div> */}
                    <Title
                        level={2}
                        className="!mb-1 !font-bold !text-[var(--ink)] fontApply"
                    >
                        Analytics
                    </Title>
                    <Text className="!text-[var(--muted)] fontApply">
                        Organization-wide training effectiveness and emerging
                        skill requirements.
                    </Text>
                </header>

                <AnalyticsMetricCards
                    skillGaps={skillGaps}
                    departmentData={departmentData}
                />

                <Row gutter={[16, 16]}>
                    <Col xs={24} xl={14}>
                        <SkillGapRanking skillGaps={skillGaps} />
                    </Col>
                    <Col xs={24} xl={10} className="flex flex-col gap-4">
                        <DepartmentRadar data={departmentData} />
                        {/* <FocusAreaSpotlight weakestSkill={skillGaps[0]} /> */}
                    </Col>
                </Row>
            </div>
        </main>
    );
};

export default Analytics;
