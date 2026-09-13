
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import { useProgress } from '../../hooks/useProgress';
import ProgressStatCards from '../../components/employee/progress/ProgressStatCards';
import SkillsBreakdown from '../../components/employee/progress/SkillsBreakdown';
import DevelopmentAreasList from '../../components/employee/progress/DevelopmentAreasList';
import CourseProgressList from '../../components/employee/progress/CourseProgressList';
import AssessmentHistoryList from '../../components/employee/progress/AssessmentHistoryList';
import RecentActivityFeed from '../../components/employee/progress/RecentActivityFeed';
import AchievementsList from '../../components/employee/progress/AchievementsList';

const Progress = () => {
    const navigate = useNavigate();
    const { data, status, error, reload } = useProgress();

    if (status === 'loading') {
        return (
            <div className="p-8 text-sm text-[var(--muted)]">
                Loading your progress...
            </div>
        );
    }

    if (status === 'error' || !data) {
        return (
            <div className="p-8 flex justify-center">
                <Result
                    status="error"
                    title="Unable to load your progress"
                    subTitle={error?.message || 'Please try again.'}
                    extra={
                        <Button type="primary" onClick={reload}>
                            Retry
                        </Button>
                    }
                />
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-[var(--ink)]">
                    My Progress
                </h1>
                <p className="text-sm text-[var(--muted)] mt-1">
                    Track your learning journey, skills, assessments, and
                    training achievements
                </p>
            </div>

            <ProgressStatCards
                overview={data.overview}
                avgAssessmentScore={data.avgAssessmentScore}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <SkillsBreakdown skills={data.skills} />
                <DevelopmentAreasList
                    areas={data.developmentAreas}
                    onExplore={() => navigate('/employee/skill-gaps')}
                />
            </div>

            <CourseProgressList
                courses={data.courses}
                onContinue={() => navigate('/employee/learning')}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <AssessmentHistoryList assessments={data.assessments} />
                <RecentActivityFeed activities={data.recentActivity} />
            </div>

            <AchievementsList achievements={data.achievements} />
        </div>
    );
};

export default Progress;
