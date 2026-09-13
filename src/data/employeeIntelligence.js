export const competencyProfile = [
    {
        id: 'survey-design',
        name: 'Survey Design',
        domain: 'Statistical',
        current: 78,
        target: 85,
        trend: 12,
        status: 'On Track',
    },
    {
        id: 'sampling-methods',
        name: 'Sampling Methods',
        domain: 'Statistical',
        current: 64,
        target: 85,
        trend: 8,
        status: 'Developing',
    },
    {
        id: 'data-quality',
        name: 'Data Quality Frameworks',
        domain: 'Statistical',
        current: 48,
        target: 80,
        trend: 4,
        status: 'Priority Gap',
    },
    {
        id: 'python',
        name: 'Python for Data Science',
        domain: 'Technical',
        current: 72,
        target: 85,
        trend: 15,
        status: 'Developing',
    },
    {
        id: 'machine-learning',
        name: 'Machine Learning Pipelines',
        domain: 'Technical',
        current: 38,
        target: 75,
        trend: 2,
        status: 'Priority Gap',
    },
    {
        id: 'data-privacy',
        name: 'Data Privacy & Ethics',
        domain: 'Digital Governance',
        current: 56,
        target: 80,
        trend: 6,
        status: 'Priority Gap',
    },
    {
        id: 'cybersecurity',
        name: 'Cybersecurity Protocols',
        domain: 'Digital Governance',
        current: 74,
        target: 85,
        trend: 9,
        status: 'Developing',
    },
    {
        id: 'project-delivery',
        name: 'Agile Project Delivery',
        domain: 'Behavioural',
        current: 61,
        target: 80,
        trend: 7,
        status: 'Developing',
    },
];

export const learningPathways = [
    {
        id: 'ai-statistics',
        title: 'Applied Machine Learning for Official Statistics',
        provider: 'NSSTA / iGOT Karmayogi',
        domain: 'Technical',
        gapId: 'machine-learning',
        duration: '24 hours',
        progress: 35,
        priority: 'Critical',
        description:
            'Build capability to use AI responsibly in classification, quality checks, and statistical production.',
    },
    {
        id: 'quality-audit',
        title: 'Data Assurance Standards & Registry Auditing',
        provider: 'National Statistical Academy',
        domain: 'Statistical',
        gapId: 'data-quality',
        duration: '16 hours',
        progress: 0,
        priority: 'High',
        description:
            'Strengthen reliability, lineage, comparability, and auditability of official indicators.',
    },
    {
        id: 'privacy-governance',
        title: 'DPDP Act Compliance for Data Custodians',
        provider: 'iGOT Karmayogi',
        domain: 'Digital Governance',
        gapId: 'data-privacy',
        duration: '12 hours',
        progress: 0,
        priority: 'High',
        description:
            'Protect microdata through collection, anonymization, processing, and delivery.',
    },
    {
        id: 'sampling',
        title: 'Advanced Sample Weighting & Stratification',
        provider: 'NSSTA',
        domain: 'Statistical',
        gapId: 'sampling-methods',
        duration: '18 hours',
        progress: 0,
        priority: 'Medium',
        description:
            'Improve survey precision through advanced sampling and estimation practices.',
    },
];

export const assessmentSummary = {
    completed: 4,
    pending: 2,
    lastScore: 78,
    lastAttempt: 'AI for Official Statistics',
};

export const getPriorityGaps = () =>
    competencyProfile
        .filter((item) => item.target - item.current > 15)
        .sort((a, b) => b.target - b.current - (a.target - a.current));

export const getOverallScore = () =>
    Math.round(
        competencyProfile.reduce((total, item) => total + item.current, 0) /
            competencyProfile.length
    );
