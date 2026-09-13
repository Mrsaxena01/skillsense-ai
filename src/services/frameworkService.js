
import { competencyDomains } from '../mock/competencies.mock';
import {
    jobRoles,
    skillCatalog,
    roleRequirements,
} from '../mock/roleRequirements.mock';

export async function fetchFramework() {
    await new Promise((r) => setTimeout(r, 300));
    return {
        domains: competencyDomains,
        skills: skillCatalog,
        roles: jobRoles,
        requirements: roleRequirements,
    };

    
}

export async function updateRequirement(role, skillName, newLevel) {
    
    await new Promise((r) => setTimeout(r, 200));
    roleRequirements[role] = {
        ...roleRequirements[role],
        [skillName]: newLevel,
    };
    return { success: true };
}
