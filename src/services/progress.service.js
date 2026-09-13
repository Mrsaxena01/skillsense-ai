
import { fetchCompetencies } from './competency.service';
import { fetchEnrolledCourses } from './learning.service';
import { fetchQuizAttempts } from './assessment.service';

const domainColors = {
    Statistical: '#182630',
    Technical: '#178f85',
    'Digital Governance': '#b67b25',
    'Behavioural & Managerial': '#7b5ea7',
};

export async function fetchProgressOverview() {
    const [competencies, courses, quizzes] = await Promise.all([
        fetchCompetencies(),
        fetchEnrolledCourses(),
        fetchQuizAttempts(),
    ]);

    const overallCompetency =
        competencies.length === 0
            ? 0
            : Math.round(
                  competencies.reduce((sum, c) => sum + c.assessmentScore, 0) /
                      competencies.length
              );

    const domainMap = competencies.reduce((acc, c) => {
        if (!acc[c.domain])
            acc[c.domain] = { domain: c.domain, total: 0, sum: 0 };
        acc[c.domain].total += 1;
        acc[c.domain].sum += c.assessmentScore;
        return acc;
    }, {});

    const domains = Object.values(domainMap).map((d) => ({
        domain: d.domain,
        score: Math.round(d.sum / d.total),
        color: domainColors[d.domain] || '#879394',
    }));

    const learningCompletion =
        courses.length === 0
            ? 0
            : Math.round(
                  courses.reduce((sum, c) => sum + c.progressPercent, 0) /
                      courses.length
              );

    const completedQuizzes = quizzes.filter((q) => q.status === 'Completed');
    const avgAssessmentScore =
        completedQuizzes.length === 0
            ? 0
            : Math.round(
                  completedQuizzes.reduce((sum, q) => sum + q.scorePercent, 0) /
                      completedQuizzes.length
              );

    const recentActivity = [
        ...completedQuizzes.map((q) => ({
            type: 'assessment',
            label: `Scored ${q.scorePercent}% in ${q.skillName}`,
            date: q.attemptedAt,
        })),
        ...courses
            .filter((c) => c.lastAccessedAt)
            .map((c) => ({
                type: 'learning',
                label: `${c.status === 'Completed' ? 'Completed' : 'Progressed in'} ${c.title}`,
                date: c.lastAccessedAt,
            })),
    ]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);

    return {
        overallCompetency,
        domains,
        learningCompletion,
        avgAssessmentScore,
        gapsCount: competencies.filter((c) => c.status !== 'Meets').length,
        strongCount: competencies.filter((c) => c.status === 'Meets').length,
        recentActivity,
    };

    // FUTURE: replace with a single backend aggregation endpoint.
}
