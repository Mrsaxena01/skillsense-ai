import { employeeCompetencies } from '../mock/competencies.mock';

function deriveStatus(currentLevel, requiredLevel) {
    const diff = currentLevel - requiredLevel;
    if (diff >= 0) return 'Meets';
    if (diff === -1) return 'Developing';
    return 'Critical Gap';
}

export async function fetchCompetencies() {
    await new Promise((resolve) => setTimeout(resolve, 400));

    return employeeCompetencies.map((c) => ({
        ...c,
        status: deriveStatus(c.currentLevel, c.requiredLevel),
        gap: Math.max(c.requiredLevel - c.currentLevel, 0),
    }));
}
