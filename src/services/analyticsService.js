
import { orgQuizAttempts } from '../mock/orgAssessments.mock';
import { employees, departments } from '../mock/employees.mock';

export async function fetchSkillGapAnalysis() {
    await new Promise((r) => setTimeout(r, 300));

    const completed = orgQuizAttempts.filter((a) => a.status === 'Completed');

    const bySkill = completed.reduce((acc, a) => {
        if (!acc[a.skillName])
            acc[a.skillName] = { skillName: a.skillName, scores: [] };
        acc[a.skillName].scores.push(a.scorePercent);
        return acc;
    }, {});

    return Object.values(bySkill)
        .map((s) => ({
            skillName: s.skillName,
            avgScore: Math.round(
                s.scores.reduce((sum, v) => sum + v, 0) / s.scores.length
            ),
            attemptCount: s.scores.length,
        }))
        .sort((a, b) => a.avgScore - b.avgScore); 
}

export async function fetchDepartmentComparison() {
    await new Promise((r) => setTimeout(r, 300));

    return departments.map((dept) => {
        const staff = employees.filter(
            (e) => e.professional.department === dept
        );
        const staffIds = staff.map((e) => e.id);
        const deptAttempts = orgQuizAttempts.filter(
            (a) => staffIds.includes(a.employeeId) && a.status === 'Completed'
        );

        const avgCompetency = Math.round(
            staff.reduce((sum, e) => sum + e.overallCompetency, 0) /
                staff.length
        );
        const avgAssessmentScore =
            deptAttempts.length === 0
                ? null
                : Math.round(
                      deptAttempts.reduce((sum, a) => sum + a.scorePercent, 0) /
                          deptAttempts.length
                  );

        return {
            department: dept,
            headcount: staff.length,
            avgCompetency,
            avgAssessmentScore,
            assessmentsCompleted: deptAttempts.length,
        };
    });
}
