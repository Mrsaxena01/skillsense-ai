// src/components/employee/assessments/QuizAttempt.jsx
import { useEffect, useState } from 'react';
import { Button, Progress, Tag } from 'antd';
import { ClockCircleOutlined, LeftOutlined } from '@ant-design/icons';
import { evaluateQuiz } from '../../../services/assessment.service';

const QuizAttempt = ({ quiz, onSubmit, onExit }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [secondsLeft, setSecondsLeft] = useState(
        quiz.timeLimitMinutes > 0 ? quiz.timeLimitMinutes * 60 : null
    );

    const question = quiz.questions[step];
    const isLast = step === quiz.questions.length - 1;
    const progressPercent = Math.round(
        ((step + 1) / quiz.questions.length) * 100
    );

    const handleSubmit = () => {
        const result = evaluateQuiz(quiz, answers);
        onSubmit(result);
    };

    useEffect(() => {
        if (secondsLeft === null) return;
        if (secondsLeft <= 0) {
            handleSubmit();
            return;
        }
        const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [secondsLeft]);

    const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const rem = s % 60;
        return `${String(m).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
    };

    const handleSelect = (optionIndex) => {
        setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
    };

    const handleNext = () => {
        if (isLast) handleSubmit();
        else setStep((s) => s + 1);
    };

    return (
        <div className="p-6 md:p-8 flex justify-center">
            <div className="w-full max-w-2xl rounded-lg border border-[var(--line)] bg-white p-5 sm:p-8">
                <div className="flex items-center justify-between">
                    <Button
                        type="text"
                        icon={<LeftOutlined />}
                        onClick={onExit}
                        className="!text-[var(--muted)] !px-0"
                    >
                        Exit
                    </Button>

                    {secondsLeft !== null && (
                        <Tag
                            icon={<ClockCircleOutlined />}
                            className={`m-0 rounded-full border-0 px-3 py-1 text-xs font-semibold ${
                                secondsLeft <= 30
                                    ? 'bg-red-50 text-red-600'
                                    : 'bg-[#eef8cb] text-[var(--ink)]'
                            }`}
                        >
                            {formatTime(secondsLeft)}
                        </Tag>
                    )}
                </div>

                <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-1.5">
                        <span>
                            Question {step + 1} of {quiz.questions.length}
                        </span>
                        <span>{progressPercent}%</span>
                    </div>
                    <Progress
                        percent={progressPercent}
                        showInfo={false}
                        strokeColor="#d4f35b"
                        trailColor="#e4e8e5"
                    />
                </div>

                <h2 className="mt-6 text-lg font-bold text-[var(--ink)] leading-snug">
                    {question.prompt}
                </h2>

                <div className="mt-5 flex flex-col gap-2.5">
                    {question.options.map((opt, i) => {
                        const selected = answers[question.id] === i;
                        return (
                            <button
                                key={i}
                                type="button"
                                onClick={() => handleSelect(i)}
                                className={`text-left rounded-lg border p-3.5 text-sm font-medium transition-colors ${
                                    selected
                                        ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--lime)]'
                                        : 'border-[var(--line)] bg-white text-[var(--ink)] hover:border-[var(--ink)]'
                                }`}
                            >
                                {opt}
                            </button>
                        );
                    })}
                </div>

                <Button
                    type="primary"
                    block
                    disabled={answers[question.id] === undefined}
                    onClick={handleNext}
                    className="!h-12 !rounded-lg !border-none !bg-[var(--lime)] !font-semibold !text-[var(--ink)] hover:!bg-[#c0e14a] !mt-7"
                >
                    {isLast ? 'Submit Quiz' : 'Next Question'}
                </Button>
            </div>
        </div>
    );
};

export default QuizAttempt;
