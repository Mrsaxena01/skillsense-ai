
const {name , email} = localStorage.getItem("app_user") ? JSON.parse(localStorage.getItem("app_user")) : {name: "Sonu Kumar", email: "Sonu.kumar@gov.in"};




export const employeeProfile = {
    id: 'EMP001',

    personal: {
        name: name || 'Sonu Kumar',
        email: email || 'Sonu.kumar@gov.in',
        phone: '+91 98765 43210',
        avatar: null,
    },

    professional: {
        employeeId: 'EMP001',

        designation: 'Statistical Officer',

        department: 'Ministry of Statistics & Programme Implementation',

        // Important for competency and AI skill-gap analysis
        jobRole: 'Survey Data Analyst',

        currentAssignment: 'National Sample Survey',

        experienceYears: 6,

        joiningDate: '2020-07-15',
    },

    education: {
        highestQualification: 'M.Sc. Statistics',

        specialization: 'Applied Statistics',

        institution: 'University of Delhi',

        graduationYear: 2020,
    },

    learning: {
        careerGoals: [
            'Advanced Statistical Analysis',
            'AI for Official Statistics',
            'Data-Driven Decision Making',
        ],

        interests: [
            'Machine Learning',
            'Data Visualization',
            'Survey Methodology',
            'Python',
        ],
    },

    training: [
        {
            id: 'TR001',

            title: 'Official Statistics',

            provider: 'NSSTA',

            completedAt: '2025-08-20',

            status: 'Completed',
        },

        {
            id: 'TR002',

            title: 'Survey Methodology',

            provider: 'NSSTA',

            completedAt: '2025-11-12',

            status: 'Completed',
        },

        {
            id: 'TR003',

            title: 'Data Visualization',

            provider: 'MoSPI',

            completedAt: null,

            status: 'In Progress',
        },
    ],
};
