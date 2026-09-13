import { enrolledCourses } from '../mock/learning.mock';

function computeProgress(course) {
    const percent = Math.round(
        (course.completedModules / course.totalModules) * 100
    );
    return { ...course, progressPercent: percent };
}

export async function fetchEnrolledCourses() {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return enrolledCourses.map(computeProgress);
}

export async function enrollInCourse(course) {
    console.log('Enrolling in course:', course.id);
    return { success: true };
}
