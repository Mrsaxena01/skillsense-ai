
import { competencyDomains } from './competencies.mock';

export const jobRoles = [
    'Survey Data Analyst',
    'National Accounts Analyst',
    'Field Data Officer',
    'Labour Statistics Analyst',
    'Data Governance Lead',
];

// Master skill list per domain (drives both employee Competencies and this framework)
export const skillCatalog = [
    { name: 'Survey Methodology', domain: 'Statistical' },
    { name: 'Sampling', domain: 'Statistical' },
    { name: 'National Accounts', domain: 'Statistical' },
    { name: 'Python', domain: 'Technical' },
    { name: 'Data Visualization', domain: 'Technical' },
    { name: 'AI / Machine Learning', domain: 'Technical' },
    { name: 'Data Privacy', domain: 'Digital Governance' },
    { name: 'Communication', domain: 'Behavioural & Managerial' },
];

// requirements[role][skillName] = required level (1-5). Missing = not required for that role.
export const roleRequirements = {
    'Survey Data Analyst': {
        'Survey Methodology': 4,
        Sampling: 4,
        Python: 4,
        'Data Visualization': 4,
        'AI / Machine Learning': 3,
        Communication: 3,
    },
    'National Accounts Analyst': {
        'National Accounts': 5,
        Sampling: 3,
        Python: 3,
        'Data Visualization': 3,
        Communication: 3,
    },
    'Field Data Officer': {
        'Survey Methodology': 3,
        Sampling: 3,
        'Data Privacy': 2,
        Communication: 3,
    },
    'Labour Statistics Analyst': {
        'Survey Methodology': 3,
        'National Accounts': 2,
        Python: 3,
        'Data Visualization': 3,
        Communication: 3,
    },
    'Data Governance Lead': {
        'Data Privacy': 5,
        Python: 4,
        'AI / Machine Learning': 4,
        'Data Visualization': 3,
        Communication: 4,
    },
};
