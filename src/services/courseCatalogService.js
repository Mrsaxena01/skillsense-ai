// src/services/courseCatalogService.js
import { courseCatalog } from '../mock/courses.mock';
import { competencyDomains } from '../mock/competencies.mock';

let catalog = [...courseCatalog]; 

export async function fetchCourseCatalog() {
    await new Promise((r) => setTimeout(r, 300));
    return catalog;
}

export async function createCourse(course) {
    await new Promise((r) => setTimeout(r, 300));
    const newCourse = {
        ...course,
        id: `CRS${String(catalog.length + 1).padStart(3, '0')}`,
    };
    catalog = [...catalog, newCourse];
    return newCourse;
}

export async function updateCourse(id, updates) {
    await new Promise((r) => setTimeout(r, 300));
    catalog = catalog.map((c) => (c.id === id ? { ...c, ...updates } : c));
    return catalog.find((c) => c.id === id);
}

export async function deleteCourse(id) {
    await new Promise((r) => setTimeout(r, 300));
    catalog = catalog.filter((c) => c.id !== id);
    return { success: true };
}

export function getSkillOptions() {
    return [...new Set(catalog.map((c) => c.skillName))];
}

export const domainOptions = competencyDomains;

