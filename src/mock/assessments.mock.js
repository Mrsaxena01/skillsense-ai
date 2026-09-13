
export const quizAttempts = [
    {
        id: 'QZ001',
        skillName: 'Python',
        sourceTitle: 'Statistical Python Libraries (Pandas, NumPy)',
        totalQuestions: 10,
        correctAnswers: 7,
        scorePercent: 70,
        attemptedAt: '2026-09-01',
        status: 'Completed',
    },
    {
        id: 'QZ002',
        skillName: 'Data Privacy',
        sourceTitle: 'Data Privacy Essentials for Govt Officials',
        totalQuestions: 8,
        correctAnswers: 6,
        scorePercent: 75,
        attemptedAt: '2026-07-29',
        status: 'Completed',
    },
    {
        id: 'QZ003',
        skillName: 'AI / Machine Learning',
        sourceTitle: 'AI for Official Statistics',
        totalQuestions: 12,
        correctAnswers: 0,
        scorePercent: null,
        attemptedAt: null,
        status: 'Not Attempted',
    },
];

// A sample AI-generated quiz — what the engine would produce from an
// uploaded document/PPT/video for a given course/skill.
export const sampleGeneratedQuiz = {
    quizId: 'GENQ_CRS002',
    skillName: 'Python',
    sourceTitle: 'Statistical Python Libraries (Pandas, NumPy)',
    questions: [
        {
            id: 'Q1',
            prompt: 'Which Pandas function is used to read a CSV file into a DataFrame?',
            options: ['read_csv()', 'load_csv()', 'import_csv()', 'open_csv()'],
            correctIndex: 0,
            explanation:
                'pandas.read_csv() is the standard function to load CSV data into a DataFrame.',
        },
        {
            id: 'Q2',
            prompt: "What does NumPy's ndarray primarily optimize for?",
            options: [
                'String manipulation',
                'Numerical array operations',
                'File I/O',
                'Web requests',
            ],
            correctIndex: 1,
            explanation:
                "NumPy's ndarray is built for efficient numerical/array computation.",
        },
    ],
};
