
import { fetchCompetencies } from './competency.service';

const priorityWeight = {
    'Critical Gap': 2,
    Developing: 1,
};

export async function fetchSkillGaps() {
    const competencies = await fetchCompetencies();

    return competencies
        .filter((c) => c.status !== 'Meets')
        .map((c) => ({
            ...c,
            priority: c.status === 'Critical Gap' ? 'High' : 'Medium',
        }))
        .sort((a, b) => priorityWeight[b.status] - priorityWeight[a.status]);

}
