// src/components/profile/ProfileSectionBody.jsx
import { Empty, Typography } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import LedgerList from './LedgerList';
import GoalsAndInterests from './GoalsAndInterests';
import TrainingTimeline from './TrainingTimeline';
import { formatDate } from '../../../utils/profile.utils';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ProfileSectionBody = ({
    activeSection,
    personal,
    professional,
    education,
    careerGoals,
    interests,
    trainingList,
}) => {
    if (activeSection === 'personal') {
        return (
            <LedgerList
                rows={[
                    { label: 'Full Legal Name', value: personal.name },
                    {
                        label: 'Primary Email',
                        value: personal.email,
                        icon: <MailOutlined />,
                    },
                    {
                        label: 'Contact Phone',
                        value: personal.phone,
                        icon: <PhoneOutlined />,
                    },
                    {
                        label: 'Employee Identifier',
                        value: professional.employeeId,
                    },
                ]}
            />
        );
    }

    if (activeSection === 'service') {
        return (
            <LedgerList
                rows={[
                    {
                        label: 'Designation / Cadre',
                        value: professional.designation,
                    },
                    {
                        label: 'Department / Division',
                        value: professional.department,
                    },
                    {
                        label: 'Current Assignment',
                        value: professional.currentAssignment,
                    },
                    {
                        label: 'Appointment Date',
                        value: formatDate(professional.joiningDate),
                    },
                    {
                        label: 'Total Service Length',
                        value:
                            professional.experienceYears != null
                                ? `${professional.experienceYears} Years`
                                : null,
                    },
                ]}
            />
        );
    }

    if (activeSection === 'education') {
        if (!education.highestQualification && !education.institution) {
            return <Empty description="No qualification record registered" />;
        }
        return (
            <div className="rounded-xl border border-[var(--line)] bg-[#fafbfa] p-5">
                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--ink)] text-[var(--lime)]">
                        <BookOutlined />
                    </div>
                    <div>
                        <Text
                            strong
                            className="!block text-base !text-[var(--ink)]"
                        >
                            {education.highestQualification}
                            {education.specialization
                                ? ` — ${education.specialization}`
                                : ''}
                        </Text>
                        <Text className="mt-1 block text-sm !text-[var(--muted)]">
                            {education.institution}
                            {education.graduationYear
                                ? ` · Conferred in ${education.graduationYear}`
                                : ''}
                        </Text>
                    </div>
                </div>
            </div>
        );
    }

    if (activeSection === 'goals') {
        return (
            <GoalsAndInterests
                careerGoals={careerGoals}
                interests={interests}
            />
        );
    }

    if (activeSection === 'training') {
        return trainingList.length ? (
            <TrainingTimeline items={trainingList} />
        ) : (
            <Empty description="No completed or active training courses" />
        );
    }

    return null;
};

export default ProfileSectionBody;
