// src/pages/employee/Dashboard.jsx
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
    Col,
    Progress,
    Row,
    Skeleton,
    Tag,
    Typography,
    Result,
} from 'antd';
import {
    AimOutlined,
    ArrowRightOutlined,
    BookOutlined,
    CheckCircleFilled,
    ClockCircleOutlined,
    FileTextOutlined,
    RobotOutlined,
    SafetyCertificateOutlined,
    ThunderboltFilled,
} from '@ant-design/icons';
import useProfile from '../../hooks/useProfile';
import { useDashboard } from '../../hooks/useDashboard';

const { Title, Text } = Typography;

const Dashboard = () => {
    const navigate = useNavigate();
    const { profile } = useProfile();
    const { data, status, error } = useDashboard();

    if (status === 'loading') {
        return (
            <main className="min-h-screen bg-[#fafbfa] px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    <Skeleton active paragraph={{ rows: 1 }} />
                    <Skeleton active paragraph={{ rows: 6 }} />
                </div>
            </main>
        );
    }

    if (status === 'error' || !data) {
        return (
            <main className="min-h-screen flex items-center justify-center px-4">
                <Result
                    status="error"
                    title="Couldn't load your dashboard"
                    subTitle={error?.message || 'Please try again.'}
                />
            </main>
        );
    }

    const {
        overallScore,
        domainSummary,
        priorityGaps,
        learningProgress,
        activeCourse,
        lastAssessmentScore,
        completedSkillsCount,
    } = data;

    const chartGradient = (() => {
        const totalScore = domainSummary.reduce(
            (sum, item) => sum + item.score,
            0
        );

        if (totalScore === 0) return '#edf0ed 0% 100%'; // fallback: empty gray ring

        let start = 0;
        return domainSummary
            .map((item) => {
                const share = (item.score / totalScore) * 100; // normalized so all shares sum to 100%
                const end = start + share;
                const segment = `${item.color} ${start}% ${end}%`;
                start = end;
                return segment;
            })
            .join(', ');
    })();

    return (
        <main className="min-h-screen bg-[#fafbfa] px-4 py-8 text-[var(--ink)] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--lime)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--ink)]">
                            <RobotOutlined /> Skill intelligence overview
                        </div>
                        <Title
                            level={2}
                            className="!mb-1 !font-bold !text-[var(--ink)] fontApply"
                        >
                            Good morning,{' '}
                            {profile?.personal?.name?.split(' ')[0] ||
                                'Officer'}
                        </Title>
                        <Text className="!text-[var(--muted)] fontApply">
                            Here is your current capability picture and the next
                            step in your growth journey.
                        </Text>
                    </div>
                </header>

                <Row gutter={[16, 16]}>
                    <MetricCard
                        icon={<SafetyCertificateOutlined />}
                        label="Overall competency"
                        value={`${overallScore}%`}
                        detail={`Across ${domainSummary.length} domains`}
                        tone="#d4f35b"
                    />
                    <MetricCard
                        icon={<AimOutlined />}
                        label="Priority gaps"
                        value={priorityGaps.length}
                        detail="Need focused development"
                        tone="#f6c6c6"
                    />
                    <MetricCard
                        icon={<BookOutlined />}
                        label="Learning progress"
                        value={`${learningProgress}%`}
                        detail="Across enrolled courses"
                        tone="#bfe3dd"
                    />
                    <MetricCard
                        icon={<CheckCircleFilled />}
                        label="Assessment score"
                        value={
                            lastAssessmentScore != null
                                ? `${lastAssessmentScore}%`
                                : '—'
                        }
                        detail="Latest attempt"
                        tone="#d8cbee"
                    />
                </Row>

                <Row gutter={[16, 16]}>
                    <Col xs={24} xl={16}>
                        <Card
                            bordered={false}
                            className="h-full rounded-xl border border-[var(--line)] shadow-sm"
                        >
                            <div className="mb-6 flex items-start justify-between gap-4">
                                <div>
                                    <Title
                                        level={4}
                                        className="!mb-1 !font-bold !text-[var(--ink)]"
                                    >
                                        Your capability snapshot
                                    </Title>
                                    <Text className="!text-[var(--muted)]">
                                        Current performance against role
                                        benchmarks.
                                    </Text>
                                </div>
                                <Button
                                    type="text"
                                    onClick={() =>
                                        navigate('/employee/competencies')
                                    }
                                    className="!font-semibold !text-[var(--ink)]"
                                >
                                    View matrix <ArrowRightOutlined />
                                </Button>
                            </div>
                            <div className="grid items-center gap-8 md:grid-cols-[180px_1fr]">
                                <div className="flex justify-center">
                                    <div
                                        className="relative flex h-44 w-44 items-center justify-center rounded-full"
                                        style={{
                                            background: `conic-gradient(${chartGradient})`,
                                        }}
                                        role="img"
                                        aria-label="Average competency score by domain"
                                    >
                                        <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                                            <span className="text-2xl font-bold text-[var(--ink)]">
                                                {overallScore}%
                                            </span>
                                            <span className="text-xs text-[var(--muted)]">
                                                overall
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
                                    {domainSummary.map((item) => (
                                        <div key={item.domain}>
                                            <div className="mb-2 flex items-center justify-between text-sm">
                                                <span className="flex items-center gap-2 font-semibold text-[var(--ink)]">
                                                    <span
                                                        className="h-2.5 w-2.5 rounded-full"
                                                        style={{
                                                            backgroundColor:
                                                                item.color,
                                                        }}
                                                    />
                                                    {item.domain}
                                                </span>
                                                <span className="text-[var(--muted)]">
                                                    {item.score}%
                                                </span>
                                            </div>
                                            <Progress
                                                percent={item.score}
                                                showInfo={false}
                                                strokeColor={item.color}
                                                trailColor="#edf0ed"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} xl={8}>
                        <Card
                            bordered={false}
                            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[var(--ink)] text-white shadow-md"
                            styles={{
                                body: {
                                    padding: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    justifyContent: 'space-between',
                                },
                            }}
                        >
                            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--lime)] opacity-[0.07] blur-3xl" />
                            <div>
                                <div className="flex items-start justify-between gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--lime)] text-[var(--ink)] shadow-sm">
                                        <ThunderboltFilled className="text-base" />
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-[var(--lime)]">
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--lime)]" />{' '}
                                        ACTIVE TRACK
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <Text className="text-[11px] font-bold uppercase tracking-widest !text-[#879394]">
                                        {activeCourse?.provider ||
                                            'iGOT Karmayogi'}{' '}
                                        · In progress
                                    </Text>
                                    <Title
                                        level={4}
                                        className="!mt-1 !mb-2 !text-lg !font-bold !text-white line-clamp-1"
                                    >
                                        {activeCourse?.title ||
                                            'No active module assigned'}
                                    </Title>
                                    <Text className="block text-xs leading-relaxed !text-[#cbd5d1] line-clamp-2">
                                        {activeCourse
                                            ? `${activeCourse.completedModules}/${activeCourse.totalModules} modules complete`
                                            : 'Enroll in a recommended course to start tracked learning.'}
                                    </Text>
                                </div>
                                <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                                    <div className="mb-2 flex items-center justify-between text-xs">
                                        <span className="font-medium text-[#879394]">
                                            Track Progression
                                        </span>
                                        <span className="font-mono text-xs font-bold text-white">
                                            {activeCourse?.progressPercent ?? 0}
                                            %
                                        </span>
                                    </div>
                                    <Progress
                                        percent={
                                            activeCourse?.progressPercent ?? 0
                                        }
                                        showInfo={false}
                                        strokeColor="var(--lime)"
                                        trailColor="rgba(255, 255, 255, 0.12)"
                                        size={['100%', 6]}
                                    />
                                </div>
                            </div>
                            <Button
                                block
                                size="large"
                                icon={<ArrowRightOutlined />}
                                onClick={() => navigate('/employee/learning')}
                                className="mt-6 !h-11 !rounded-xl !border-0 !bg-[var(--lime)] !font-bold !text-[var(--ink)]"
                            >
                                Resume learning
                            </Button>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={14}>
                        <Card
                            bordered={false}
                            className="rounded-xl border border-[var(--line)] shadow-sm"
                        >
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <Title
                                        level={4}
                                        className="!mb-1 !font-bold !text-[var(--ink)]"
                                    >
                                        Priority attention
                                    </Title>
                                    <Text className="!text-[var(--muted)]">
                                        The largest gaps currently affecting
                                        your role.
                                    </Text>
                                </div>
                                <Tag color="error" className="m-0 rounded-full">
                                    {priorityGaps.length} gaps
                                </Tag>
                            </div>
                            <div className="space-y-3">
                                {priorityGaps.slice(0, 3).map((gap) => (
                                    <button
                                        type="button"
                                        key={gap.id}
                                        onClick={() =>
                                            navigate('/employee/skill-gaps')
                                        }
                                        className="flex w-full items-center justify-between rounded-lg border border-[var(--line)] p-3 text-left transition hover:border-[#c73636]"
                                    >
                                        <span>
                                            <strong className="block text-sm text-[var(--ink)]">
                                                {gap.name}
                                            </strong>
                                            <span className="text-xs text-[var(--muted)]">
                                                {gap.domain} ·{' '}
                                                {gap.requiredLevel -
                                                    gap.currentLevel}{' '}
                                                level(s) to close
                                            </span>
                                        </span>
                                        <ArrowRightOutlined className="text-[#c73636]" />
                                    </button>
                                ))}
                                {priorityGaps.length === 0 && (
                                    <Text className="!text-[var(--muted)] text-sm">
                                        No open gaps — great work!
                                    </Text>
                                )}
                            </div>
                            <Button
                                type="link"
                                onClick={() => navigate('/employee/skill-gaps')}
                                className="mt-4 !px-0 !font-semibold !text-[var(--ink)]"
                            >
                                View all skill gaps <ArrowRightOutlined />
                            </Button>
                        </Card>
                    </Col>
                    <Col xs={24} lg={10}>
                        <Card
                            bordered={false}
                            className="rounded-xl border border-[var(--line)] shadow-sm"
                        >
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <Title
                                        level={4}
                                        className="!mb-1 !font-bold !text-[var(--ink)]"
                                    >
                                        Next milestones
                                    </Title>
                                    <Text className="!text-[var(--muted)]">
                                        Keep your development loop moving.
                                    </Text>
                                </div>
                                <ClockCircleOutlined className="text-lg text-[var(--muted)]" />
                            </div>
                            <Milestone
                                icon={<BookOutlined />}
                                title="Continue active course"
                                detail={
                                    activeCourse
                                        ? `${activeCourse.title} · ${100 - activeCourse.progressPercent}% remaining`
                                        : 'No course in progress'
                                }
                                onClick={() => navigate('/employee/learning')}
                            />
                            <Milestone
                                icon={<FileTextOutlined />}
                                title="Take next assessment"
                                detail="Validate your updated capability"
                                onClick={() =>
                                    navigate('/employee/assessments')
                                }
                            />
                            <Milestone
                                icon={<SafetyCertificateOutlined />}
                                title="Review competency map"
                                detail={`${completedSkillsCount} competencies on target`}
                                onClick={() =>
                                    navigate('/employee/competencies')
                                }
                            />
                        </Card>
                    </Col>
                </Row>

                <Card
                    bordered={false}
                    className="rounded-xl bg-[#eef8cb] shadow-sm"
                >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <Title
                                level={4}
                                className="!mb-1 !font-bold !text-[var(--ink)]"
                            >
                                Recommendations are ready
                            </Title>
                            <Text className="!text-[#4d5d35]">
                                Your gaps and learning history have been matched
                                to the most relevant development options.
                            </Text>
                        </div>
                        <Button
                            onClick={() =>
                                navigate('/employee/recommendations')
                            }
                            className="!border-[var(--ink)] !font-semibold !text-[var(--ink)]"
                        >
                            Explore recommendations <ArrowRightOutlined />
                        </Button>
                    </div>
                </Card>
            </div>
        </main>
    );
};

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

const Milestone = ({ icon, title, detail, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center gap-3 border-b border-[var(--line)] py-3 text-left last:border-0"
    >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f1f3f1] text-[var(--ink)]">
            {icon}
        </span>
        <span className="flex-1">
            <strong className="block text-sm text-[var(--ink)]">{title}</strong>
            <span className="text-xs text-[var(--muted)]">{detail}</span>
        </span>
        <ArrowRightOutlined className="text-[var(--muted)]" />
    </button>
);

export default Dashboard;
