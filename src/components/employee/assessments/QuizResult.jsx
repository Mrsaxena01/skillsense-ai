// src/components/employee/assessments/QuizResult.jsx
import { useEffect, useState } from 'react';
import { Button, Progress, Tag } from 'antd';
import {
    CheckCircleFilled,
    CloseCircleFilled,
    TrophyFilled,
} from '@ant-design/icons';
import { recordCompetencyUpdate } from '../../../services/assessment.service';

const QuizResult = ({ quiz, result, onRestart }) => {
    const {
        scorePercent,
        correctCount,
        total,
        questionResults,
        assessmentType,
    } = result;
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        if (assessmentType === 'competency') {
            recordCompetencyUpdate(quiz.skillName, scorePercent).then(() =>
                setUpdated(true)
            );
        }
    }, [assessmentType, quiz.skillName, scorePercent]);

    const scoreColor =
        scorePercent >= 75
            ? '#3a7d44'
            : scorePercent >= 50
              ? '#a8d94a'
              : '#e05252';

    return (
        <div className="p-6 md:p-8 flex justify-center">
            <div className="w-full max-w-2xl flex flex-col gap-5">
                <div className="rounded-lg border border-[var(--line)] bg-white p-6 sm:p-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-[#f0fcd0]">
                        <TrophyFilled className="text-2xl text-[var(--ink)]" />
                    </div>

                    <h2 className="text-xl font-bold text-[var(--ink)]">
                        Quiz Completed
                    </h2>
                    <p className="text-sm text-[var(--muted)] mt-1">
                        {quiz.sourceTitle}
                    </p>

                    <div className="mt-6 flex justify-center">
                        <Progress
                            type="circle"
                            percent={scorePercent}
                            size={120}
                            strokeColor={scoreColor}
                            format={(p) => (
                                <span className="text-2xl font-bold text-[var(--ink)]">
                                    {p}%
                                </span>
                            )}
                        />
                    </div>

                    <p className="mt-4 text-sm text-[var(--muted)]">
                        {correctCount} out of {total} correct
                    </p>

                    <Tag
                        className={`mt-3 rounded-full border-0 px-3 py-1 text-xs font-semibold ${
                            assessmentType === 'competency'
                                ? 'bg-[#eef8cb] text-[var(--ink)]'
                                : 'bg-[var(--line)] text-[var(--muted)]'
                        }`}
                    >
                        {assessmentType === 'competency'
                            ? 'Competency Assessment'
                            : 'Practice Quiz'}
                    </Tag>

                    <div className="mt-5 rounded-lg bg-[#fafbfa] border border-[var(--line)] p-4 text-sm">
                        {assessmentType === 'competency' ? (
                            <span className="text-[var(--ink)]">
                                {updated
                                    ? '✓ Your competency profile has been updated with this result.'
                                    : 'Updating your competency profile…'}
                            </span>
                        ) : (
                            <span className="text-[var(--muted)]">
                                This was a practice quiz — it won't affect your
                                competency profile.
                            </span>
                        )}
                    </div>

                    <Button
                        block
                        onClick={onRestart}
                        className="!h-12 !rounded-lg !border-none !bg-[var(--lime)] !font-semibold !text-[var(--ink)] hover:!bg-[#c0e14a] !mt-5"
                    >
                        Generate Another Quiz
                    </Button>
                </div>

                <div className="rounded-lg border border-[var(--line)] bg-white p-5 sm:p-6">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-4">
                        Review Answers
                    </h3>

                    <div className="flex flex-col gap-4">
                        {questionResults.map((q, idx) => (
                            <div
                                key={q.id}
                                className="rounded-lg border border-[var(--line)] p-4"
                            >
                                <div className="flex items-start gap-2">
                                    {q.isCorrect ? (
                                        <CheckCircleFilled className="text-[#3a7d44] mt-0.5" />
                                    ) : (
                                        <CloseCircleFilled className="text-red-500 mt-0.5" />
                                    )}
                                    <p className="text-sm font-semibold text-[var(--ink)]">
                                        {idx + 1}. {q.prompt}
                                    </p>
                                </div>

                                <div className="mt-2 ml-6 flex flex-col gap-1 text-sm">
                                    <span className="text-[var(--muted)]">
                                        Your answer:{' '}
                                        <span className="text-[var(--ink)] font-medium">
                                            {q.options[q.selectedIndex] ??
                                                'Not answered'}
                                        </span>
                                    </span>
                                    {!q.isCorrect && (
                                        <span className="text-[var(--muted)]">
                                            Correct answer:{' '}
                                            <span className="text-[#3a7d44] font-medium">
                                                {q.options[q.correctIndex]}
                                            </span>
                                        </span>
                                    )}
                                    <span className="text-[var(--muted)] text-xs mt-1">
                                        {q.explanation}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizResult;
