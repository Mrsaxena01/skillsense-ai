// src/services/assessment.service.js
import { quizAttempts, sampleGeneratedQuiz } from '../mock/assessments.mock';

export async function fetchQuizAttempts() {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return quizAttempts;
}

export async function generateQuizFromMaterial({
    files,
    numberOfQuestions,
    difficulty,
    timeLimitMinutes,
    assessmentType,
}) {
    // FUTURE: send files to the LLM-based Assessment Engine along with
    // numberOfQuestions/difficulty, get back real generated MCQs.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    return {
        ...sampleGeneratedQuiz,
        numberOfQuestions,
        difficulty,
        timeLimitMinutes, // 0 = no limit
        assessmentType, // 'practice' | 'competency'
    };
}

export function evaluateQuiz(quiz, answers) {
    const questionResults = quiz.questions.map((q) => {
        const selectedIndex = answers[q.id];
        const isCorrect = selectedIndex === q.correctIndex;
        return { ...q, selectedIndex, isCorrect };
    });

    const correctCount = questionResults.filter((q) => q.isCorrect).length;
    const scorePercent = Math.round(
        (correctCount / quiz.questions.length) * 100
    );

    return {
        questionResults,
        correctCount,
        total: quiz.questions.length,
        scorePercent,
        assessmentType: quiz.assessmentType,
    };
}

// Score → Level mapping (used only for competency-type assessments)
export function scoreToLevel(scorePercent) {
    if (scorePercent == null) return null;
    if (scorePercent <= 40) return 1;
    if (scorePercent <= 60) return 2;
    if (scorePercent <= 75) return 3;
    if (scorePercent <= 90) return 4;
    return 5;
}

export async function recordCompetencyUpdate(skillName, scorePercent) {
    // FUTURE: this is the actual bridge to competency.service.js —
    // POST the new derived level so Competencies/Skill Gaps reflect it.
    console.log(
        `[stub] Would update competency for "${skillName}" using score ${scorePercent}%`
    );
    return { success: true };
}
