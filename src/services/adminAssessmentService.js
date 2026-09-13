
import {
    orgQuizAttempts,
    questionBankReviews,
} from '../mock/orgAssessments.mock';

export async function fetchOrgAssessments() {
    await new Promise((r) => setTimeout(r, 300));
    return orgQuizAttempts;
}

export async function fetchQuestionBanks() {
    await new Promise((r) => setTimeout(r, 300));
    return questionBankReviews;
}

export async function reviewQuestionBank(id, decision) {
    // decision: 'Approved' | 'Rejected'
    await new Promise((r) => setTimeout(r, 200));
    const bank = questionBankReviews.find((b) => b.id === id);
    if (bank) bank.reviewStatus = decision;
    return { success: true };
}
