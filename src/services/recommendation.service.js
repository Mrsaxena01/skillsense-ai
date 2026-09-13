
import { fetchSkillGaps } from './skillGap.service';
import { courseCatalog } from '../mock/courses.mock';

const levelRank = {
    Beginner: 1,
    Basic: 2,
    Intermediate: 3,
    Advanced: 4,
    Expert: 5,
};


function rankCoursesForGap(gap) {
    const matches = courseCatalog.filter((c) => c.skillName === gap.name);

    return matches
        .map((course) => {
            const courseLevel = levelRank[course.level] ?? 0;
            const distanceFromCurrent = Math.abs(
                courseLevel - gap.currentLevel
            );
            return { ...course, matchScore: 100 - distanceFromCurrent * 15 };
        })
        .sort((a, b) => b.matchScore - a.matchScore);
}

export async function fetchRecommendations() {
    const gaps = await fetchSkillGaps();

    return gaps
        .map((gap) => ({
            gapId: gap.id,
            skillName: gap.name,
            domain: gap.domain,
            priority: gap.priority,
            status: gap.status,
            courses: rankCoursesForGap(gap),
        }))
        .filter((rec) => rec.courses.length > 0); 
}
