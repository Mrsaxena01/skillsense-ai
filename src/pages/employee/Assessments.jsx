
import React, { useState } from 'react';
import {
    Button,
    Divider,
    Empty,
    Form,
    Segmented,
    Tag,
    Typography,
    Upload,
} from 'antd';
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    DeleteFilled,
    FileTextOutlined,
    GeminiFilled,
    InboxOutlined,
} from '@ant-design/icons';
import { useToast } from '../../context/ToastContext';
import { generateQuizFromMaterial } from '../../services/assessment.service';
import QuizAttempt from '../../components/employee/assessments/QuizAttempt';
import QuizResult from '../../components/employee/assessments/QuizResult';

const { Text } = Typography;
const { Dragger } = Upload;

const timeOptions = [
    { label: 'No limit', value: 0 },
    { label: '15 min', value: 15 },
    { label: '30 min', value: 30 },
    { label: '45 min', value: 45 },
    { label: '60 min', value: 60 },
];

const assessmentTypeOptions = [
    { label: 'Practice (Self-Study)', value: 'practice' },
    { label: 'Competency Assessment', value: 'competency' },
];

const Assessments = () => {
    const [noOfQuestions, setNoOfQuestions] = useState(5);
    const [level, setLevel] = useState('Mixed');
    const [timeLimit, setTimeLimit] = useState(0); // 0 = no limit, minutes otherwise
    const [assessmentType, setAssessmentType] = useState('competency'); // 'practice' or 'competency'
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [generating, setGenerating] = useState(false);

    // phase: 'config' | 'attempt' | 'result'
    const [phase, setPhase] = useState('config');
    const [quiz, setQuiz] = useState(null);
    const [result, setResult] = useState(null);

    const { notify } = useToast();

    const formatFileSize = (bytes) => {
        if (!bytes) return '0 KB';
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const beforeUpload = (file) => {
        const allowedTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'text/plain',
        ];
        const allowedExtensions = ['.pdf', '.docx', '.pptx', '.txt'];
        const fileExtension = file.name
            .substring(file.name.lastIndexOf('.'))
            .toLowerCase();
        const isValidType =
            allowedTypes.includes(file.type) ||
            allowedExtensions.includes(fileExtension);

        if (!isValidType) {
            notify(`${file.name} is not a supported file type.`, 'error');
            return Upload.LIST_IGNORE;
        }
        return false;
    };

    const handleUploadChange = (info) => setUploadedFiles(info.fileList);
    const handleDelete = (uid) =>
        setUploadedFiles((prev) => prev.filter((f) => f.uid !== uid));

    const handleGenerateQuestions = async () => {
        if (uploadedFiles.length === 0) {
            notify('Please upload at least one learning material.', 'warning');
            return;
        }

        try {
            setGenerating(true);

            const generatedQuiz = await generateQuizFromMaterial({
                files: uploadedFiles.map((item) => item.originFileObj),
                numberOfQuestions: noOfQuestions,
                difficulty: level,
                timeLimitMinutes: timeLimit,
                assessmentType,
            });

            notify('Quiz generated successfully.', 'success');
            setQuiz(generatedQuiz);
            setPhase('attempt');
        } catch (error) {
            console.error(error);
            notify('Failed to generate quiz. Please try again.', 'error');
        } finally {
            setGenerating(false);
        }
    };

    const handleQuizSubmit = (attemptResult) => {
        setResult(attemptResult);
        setPhase('result');
    };

    const handleRestart = () => {
        setPhase('config');
        setQuiz(null);
        setResult(null);
        setUploadedFiles([]);
    };

    if (phase === 'attempt' && quiz) {
        return (
            <QuizAttempt
                quiz={quiz}
                onSubmit={handleQuizSubmit}
                onExit={() => setPhase('config')}
            />
        );
    }

    if (phase === 'result' && result) {
        return (
            <QuizResult quiz={quiz} result={result} onRestart={handleRestart} />
        );
    }

    return (
         <div className="p-6 md:p-8 flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-[var(--ink)]">Assessments</h1>
                <p className="text-sm text-[var(--muted)] mt-1">
                    Generate AI quizzes from your learning material — for self-study, or to update your competency profile
                </p>
            </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
                    {/* LEFT SECTION — unchanged from your version */}
                    <section className="min-w-0">
                        <div className="mb-4 flex items-center justify-between">
                            
                                <h2 className="mt-1 text-xl font-bold text-[#182630]">
                                    Learning content
                                </h2>
                           
                            <Tag className="m-0 rounded-full border-0 bg-white px-3 py-1 text-xs font-medium text-[#182630] shadow-sm">
                                {uploadedFiles.length}{' '}
                                {uploadedFiles.length === 1 ? 'file' : 'files'}
                            </Tag>
                        </div>

                        <div className="rounded-3xl border border-dashed border-[#cfe06d] bg-white p-3 shadow-sm sm:p-4">
                            <Dragger
                                multiple
                                showUploadList={false}
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                beforeUpload={beforeUpload}
                                onChange={handleUploadChange}
                                className="!rounded-2xl"
                            >
                                <div className="px-3 py-5 sm:py-7">
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf7bb]">
                                        <InboxOutlined className="text-2xl text-[#8fae1f]" />
                                    </div>
                                    <p className="!mb-1 text-base font-semibold text-[#182630]">
                                        Drop your learning material here
                                    </p>
                                    <p className="!mb-1 text-sm text-gray-500">
                                        or click to browse files
                                    </p>
                                    <p className="!mb-0 text-xs text-gray-400">
                                        PDF, DOCX, PPTX or TXT
                                    </p>
                                </div>
                            </Dragger>
                        </div>

                        <div className="mt-7">
                            <div className="mb-3 flex items-center justify-between">
                                <h3 className="m-0 text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
                                    Uploaded files
                                </h3>
                                {uploadedFiles.length > 0 && (
                                    <span className="text-xs text-gray-400">
                                        Ready to assess
                                    </span>
                                )}
                            </div>

                            {uploadedFiles.length === 0 ? (
                                <div className="rounded-3xl border border-[#e5eae1] bg-white px-4 py-8">
                                    <Empty
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        description={
                                            <span className="text-sm text-gray-400">
                                                No learning material uploaded
                                                yet
                                            </span>
                                        }
                                    />
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {uploadedFiles.map((file) => (
                                        <div
                                            key={file.uid}
                                            className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-[#e5eae1] bg-white p-3.5 shadow-sm transition hover:border-[#d8e99a]"
                                        >
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf7bb] text-[#182630]">
                                                    <FileTextOutlined />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="truncate text-sm font-semibold text-[#182630]">
                                                        {file.name}
                                                    </div>
                                                    <div className="mt-0.5 text-xs text-gray-400">
                                                        {formatFileSize(
                                                            file.size
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex shrink-0 items-center gap-2">
                                                <Tag className="m-0 hidden rounded-full border-0 bg-[#ecf9c8] px-2.5 py-1 text-[11px] font-medium text-[#182630] sm:block">
                                                    {file.status || 'Ready'}
                                                </Tag>
                                                <Button
                                                    type="text"
                                                    danger
                                                    icon={<DeleteFilled />}
                                                    onClick={() =>
                                                        handleDelete(file.uid)
                                                    }
                                                    className="!flex !h-8 !w-8 !items-center !justify-center !rounded-lg"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-6 rounded-3xl border border-[#e5eae1] bg-white p-4 sm:p-5">
                            <div className="flex items-start gap-3">
                                <CheckCircleOutlined className="mt-0.5 shrink-0 text-[#8fae1f]" />
                                <div>
                                    <div className="text-sm font-semibold text-[#182630]">
                                        AI review is prepared
                                    </div>
                                    <p className="mt-1 mb-0 text-sm leading-6 text-gray-500">
                                        Your selected material will be analyzed
                                        to create relevant MCQs with balanced
                                        topic coverage.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* RIGHT SECTION — config, with new fields */}
                    <section className="min-w-0 m-0 md:mt-11">
                        <div className="rounded-3xl border border-[#e5eae1] bg-white p-5 shadow-sm sm:p-7 lg:p-8">
                            <div className="mb-6">
                                <Text className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                                    Quiz configuration
                                </Text>
                                <p className="mt-1 mb-0 text-sm text-gray-500">
                                    Choose how you want your assessment to be
                                    generated.
                                </p>
                            </div>

                            <Form
                                layout="vertical"
                                onFinish={handleGenerateQuestions}
                            >
                                {/* NEW: Assessment type */}
                                <Form.Item
                                    label={
                                        <span className="text-sm font-semibold text-gray-700">
                                            Assessment type
                                        </span>
                                    }
                                >
                                    <Segmented
                                        block
                                        options={assessmentTypeOptions}
                                        value={assessmentType}
                                        onChange={setAssessmentType}
                                        style={{
                                            background: '#f4f7f1',
                                            borderRadius: '14px',
                                            padding: '8px',
                                            fontWeight: '500',
                                        }}
                                    />
                                    <p className="mt-2 mb-0 text-xs text-gray-400">
                                        {assessmentType === 'competency'
                                            ? 'Result will update your competency profile.'
                                            : 'Just for practice — result won\u2019t affect your competency profile.'}
                                    </p>
                                </Form.Item>

                                <Form.Item
                                    label={
                                        <span className="text-sm font-semibold text-gray-700">
                                            Number of questions
                                        </span>
                                    }
                                >
                                    <Segmented
                                        block
                                        options={[5, 10, 15, 20, 25, 30]}
                                        value={noOfQuestions}
                                        onChange={setNoOfQuestions}
                                        className="w-full md:text-[10px] text-[24px]"
                                        style={{
                                            background: '#f4f7f1',
                                            borderRadius: '14px',
                                            padding: '8px',
                                            fontWeight: '500',
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={
                                        <span className="text-sm font-semibold text-gray-700">
                                            Difficulty level
                                        </span>
                                    }
                                >
                                    <Segmented
                                        block
                                        options={[
                                            'Easy',
                                            'Medium',
                                            'Hard',
                                            'Mixed',
                                        ]}
                                        value={level}
                                        onChange={setLevel}
                                        className="w-full"
                                        style={{
                                            background: '#f4f7f1',
                                            borderRadius: '14px',
                                            padding: '8px',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                        }}
                                    />
                                </Form.Item>

                                {/* NEW: Optional time limit */}
                                <Form.Item
                                    label={
                                        <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                                            <ClockCircleOutlined /> Time limit
                                            (optional)
                                        </span>
                                    }
                                >
                                    <Segmented
                                        block
                                        options={timeOptions}
                                        value={timeLimit}
                                        onChange={setTimeLimit}
                                        style={{
                                            background: '#f4f7f1',
                                            borderRadius: '14px',
                                            padding: '8px',
                                            fontWeight: '500',
                                        }}
                                    />
                                </Form.Item>

                                <div className="rounded-2xl border border-[#e5eae1] bg-[#f9fbf5] p-4 sm:p-5">
                                    <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                                        Output summary
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <Tag className="m-0 rounded-full border-0 bg-white px-3 py-1 text-xs font-medium text-[#182630]">
                                            {noOfQuestions} questions
                                        </Tag>
                                        <Tag className="m-0 rounded-full border-0 bg-white px-3 py-1 text-xs font-medium text-[#182630]">
                                            {level} level
                                        </Tag>
                                        <Tag className="m-0 rounded-full border-0 bg-white px-3 py-1 text-xs font-medium text-[#182630]">
                                            {timeLimit === 0
                                                ? 'No time limit'
                                                : `${timeLimit} min`}
                                        </Tag>
                                        <Tag className="m-0 rounded-full border-0 bg-white px-3 py-1 text-xs font-medium text-[#182630]">
                                            {assessmentType === 'competency'
                                                ? 'Competency Assessment'
                                                : 'Practice Quiz'}
                                        </Tag>
                                        <Tag className="m-0 rounded-full border-0 bg-white px-3 py-1 text-xs font-medium text-[#182630]">
                                            {uploadedFiles.length}{' '}
                                            {uploadedFiles.length === 1
                                                ? 'source file'
                                                : 'source files'}
                                        </Tag>
                                    </div>
                                </div>

                                <Divider className="my-5 border-[#edf1ea]" />

                                <Form.Item className="mb-0">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        loading={generating}
                                        disabled={generating}
                                        style={{
                                            height: '50px',
                                            borderRadius: '14px',
                                            border: 'none',
                                            background:
                                                'linear-gradient(to right, #d4f35b, #a8d94a)',
                                            fontWeight: '700',
                                            color: '#182630',
                                            boxShadow:
                                                '0 10px 20px rgba(212, 243, 91, 0.28)',
                                            fontSize: '15px',
                                        }}
                                    >
                                        {!generating && (
                                            <GeminiFilled className="text-base" />
                                        )}
                                        {generating
                                            ? 'Generating Questions...'
                                            : 'Generate Questions with AI'}
                                    </Button>
                                </Form.Item>

                                <p className="mt-3 mb-0 text-center text-xs text-gray-400">
                                    AI-generated questions can be reviewed
                                    before publishing.
                                </p>
                            </Form>
                        </div>
                    </section>
                </div>
            </div>
        
    );
};

export default Assessments;
