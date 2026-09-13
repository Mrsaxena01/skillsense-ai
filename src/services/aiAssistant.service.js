// src/services/aiAssistant.service.js

export async function getAssistantReply(message, context) {
    await new Promise((resolve) => setTimeout(resolve, 700)); // simulate thinking

    const msg = message.toLowerCase();
    const {
        competencySummary,
        gaps,
        activeCourse,
        lastQuiz,
        learningCompletion,
    } = context;

    if (
        msg.includes('gap') ||
        msg.includes('weak') ||
        msg.includes('improve')
    ) {
        if (gaps.length === 0) {
            return 'You currently have no open skill gaps — nice work! All your tracked competencies meet or exceed the required level for your role.';
        }
        const top = gaps[0];
        return `You have ${gaps.length} skill gap${gaps.length > 1 ? 's' : ''} right now. The highest priority is **${top.name}** (${top.domain}) — you're ${top.requiredLevel - top.currentLevel} level(s) below what's required. I'd suggest starting there; you can find recommended courses for it on the Skill Gaps page.`;
    }

    if (
        msg.includes('course') ||
        msg.includes('learn') ||
        msg.includes('training')
    ) {
        if (activeCourse) {
            return `You're currently ${activeCourse.progressPercent}% through **${activeCourse.title}** (${activeCourse.provider}). Want me to take you to it, or suggest something new based on your gaps?`;
        }
        return "You don't have any course in progress right now. Based on your skill gaps, I can point you to a few recommended ones — just ask me to suggest courses.";
    }

    if (
        msg.includes('score') ||
        msg.includes('assessment') ||
        msg.includes('quiz')
    ) {
        if (lastQuiz) {
            return `Your most recent assessment score was **${lastQuiz.scorePercent}%** in ${lastQuiz.skillName}. Want to take another quiz to keep your competency profile up to date?`;
        }
        return "You haven't completed any assessments yet. Taking a quick quiz is the fastest way to get an accurate read on your current skill level.";
    }

    if (
        msg.includes('competen') ||
        msg.includes('level') ||
        msg.includes('overall')
    ) {
        return `Your overall competency score is currently **${competencySummary.overall}%**, based on ${competencySummary.total} tracked skills. ${competencySummary.strong} of them meet your role's requirement, and ${competencySummary.gaps} still need attention.`;
    }

    if (msg.includes('progress') || msg.includes('how am i doing')) {
        return `Here's a quick snapshot: your overall competency is **${competencySummary.overall}%**, your learning completion across enrolled courses is **${learningCompletion}%**, and you have **${gaps.length}** open skill gap${gaps.length === 1 ? '' : 's'}. Want me to dig into any of these?`;
    }

    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        return 'Hi! I can help you understand your competencies, skill gaps, learning progress, or recommend what to focus on next. What would you like to know?';
    }

    return 'I\'m not entirely sure about that one yet — but I can tell you about your skill gaps, course progress, assessment scores, or overall competency. Try asking me something like "what should I improve?"';

}

export const suggestedPrompts = [
    'What should I improve?',
    "How's my overall progress?",
    'Suggest a course for me',
    'What was my last assessment score?',
];
