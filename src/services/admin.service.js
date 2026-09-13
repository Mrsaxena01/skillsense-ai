
import { employees, departments } from '../mock/employees.mock';
import { competencyDomains } from '../mock/competencies.mock';

export async function fetchAllEmployees() {
    await new Promise((r) => setTimeout(r, 300));
    return employees;
}

export async function fetchOrgOverview() {
    await new Promise((r) => setTimeout(r, 300));

    const totalEmployees = employees.length;
    const activeCount = employees.filter((e) => e.status === 'Active').length;

    const avgCompetency = Math.round(
        employees.reduce((sum, e) => sum + e.overallCompetency, 0) /
            totalEmployees
    );

    const departmentBreakdown = departments.map((dept) => {
        const staff = employees.filter(
            (e) => e.professional.department === dept
        );
        return {
            department: dept,
            count: staff.length,
            avgCompetency: Math.round(
                staff.reduce((sum, e) => sum + e.overallCompetency, 0) /
                    staff.length
            ),
        };
    });

    // Bucket employees into competency tiers for a distribution view
    const tiers = [
        { label: 'Below 50%', min: 0, max: 49 },
        { label: '50-69%', min: 50, max: 69 },
        { label: '70-84%', min: 70, max: 84 },
        { label: '85%+', min: 85, max: 100 },
    ];
    const competencyDistribution = tiers.map((t) => ({
        label: t.label,
        count: employees.filter(
            (e) => e.overallCompetency >= t.min && e.overallCompetency <= t.max
        ).length,
    }));

    const lowestPerformers = [...employees]
        .sort((a, b) => a.overallCompetency - b.overallCompetency)
        .slice(0, 3);

    return {
        totalEmployees,
        activeCount,
        onLeaveCount: totalEmployees - activeCount,
        avgCompetency,
        departmentBreakdown,
        competencyDistribution,
        lowestPerformers,
        domainCount: competencyDomains.length,
    };

    
}
