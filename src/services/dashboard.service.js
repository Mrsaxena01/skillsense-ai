
import { fetchCompetencies } from './competency.service';
import { fetchSkillGaps } from './skillGap.service';
import { fetchEnrolledCourses } from './learning.service';
import { fetchQuizAttempts } from './assessment.service';

const DOMAIN_COLORS = {
    Statistical: '#182630',
    Technical: '#178f85',
    'Digital Governance': '#b67b25',
    'Behavioural & Managerial': '#7b5ea7',
};

async function getSharedSnapshot() {
    const [competencies, gaps, courses, quizzes] = await Promise.all([
        fetchCompetencies(),
        fetchSkillGaps(),
        fetchEnrolledCourses(),
        fetchQuizAttempts(),
    ]);

    const overallScore =
        competencies.length === 0
            ? 0
            : Math.round(
                  competencies.reduce((sum, c) => sum + c.assessmentScore, 0) /
                      competencies.length
              );

    const domainSummary = Object.entries(
        competencies.reduce((acc, c) => {
            if (!acc[c.domain]) acc[c.domain] = { total: 0, sum: 0 };
            acc[c.domain].total += 1;
            acc[c.domain].sum += c.assessmentScore;
            return acc;
        }, {})
    ).map(([domain, d]) => ({
        domain,
        score: Math.round(d.sum / d.total),
        color: DOMAIN_COLORS[domain] || '#879394',
    }));

    const activeCourse = courses.find((c) => c.status === 'In Progress');
    const learningProgress =
        courses.length === 0
            ? 0
            : Math.round(
                  courses.reduce((sum, c) => sum + c.progressPercent, 0) /
                      courses.length
              );

    const completedQuizzes = quizzes.filter((q) => q.status === 'Completed');
    const lastQuiz = completedQuizzes.sort(
        (a, b) => new Date(b.attemptedAt) - new Date(a.attemptedAt)
    )[0];

    return {
        competencies,
        gaps,
        courses,
        quizzes,
        overallScore,
        domainSummary,
        activeCourse,
        learningProgress,
        completedQuizzes,
        lastQuiz,
    };
}

export async function fetchDashboardData() {
    const s = await getSharedSnapshot();

    return {
        overallScore: s.overallScore,
        domainSummary: s.domainSummary,
        priorityGaps: s.gaps,
        learningProgress: s.learningProgress,
        activeCourse: s.activeCourse,
        lastAssessmentScore: s.lastQuiz?.scorePercent ?? null,
        completedSkillsCount: s.competencies.filter((c) => c.status === 'Meets')
            .length,
    };
}

export async function fetchProgressData() {
    const s = await getSharedSnapshot();
    return {
        overview: {
            overallCompetency: s.overallScore,
            learningCompletion: s.learningProgress,
            openGaps: s.gaps.length,
            assessmentsCompleted: s.completedQuizzes.length,
        },
        courses: s.courses,
        assessments: s.quizzes,
        skills: s.competencies,
        developmentAreas: s.gaps,
        recentActivity: [
            ...s.completedQuizzes.map((q) => ({
                type: 'assessment',
                label: `Scored ${q.scorePercent}% in ${q.skillName}`,
                date: q.attemptedAt,
            })),
            ...s.courses
                .filter((c) => c.lastAccessedAt)
                .map((c) => ({
                    type: 'learning',
                    label: `${c.status === 'Completed' ? 'Completed' : 'Progressed in'} ${c.title}`,
                    date: c.lastAccessedAt,
                })),
        ]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 6),
        achievements: s.courses
            .filter((c) => c.status === 'Completed')
            .map((c) => ({ id: c.id, title: c.title, date: c.lastAccessedAt })),
        avgAssessmentScore:
            s.completedQuizzes.length === 0
                ? 0
                : Math.round(
                      s.completedQuizzes.reduce(
                          (sum, q) => sum + q.scorePercent,
                          0
                      ) / s.completedQuizzes.length
                  ),
    };
}
