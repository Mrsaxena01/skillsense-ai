
import { useState } from 'react';
import { Empty, Form, Skeleton, Typography, message } from 'antd';

export const SECTIONS = [
    { key: 'personal', label: 'Personal particulars', countKey: null },
    { key: 'service', label: 'Service details', countKey: null },
    { key: 'education', label: 'Education', countKey: null },
    { key: 'goals', label: 'Goals & interests', countKey: 'goalsCount' },
    { key: 'training', label: 'Training record', countKey: 'trainingCount' },
];

import useProfile from '../../hooks/useProfile'

import ProfileHero from '../../components/employee/profile/ProfileHero';
import ProfileNav from '../../components/employee/profile/ProfileNav';
import ProfileSectionBody from '../../components/employee/profile/ProfileSectionBody';
import EditProfileModal from '../../components/employee/profile/EditProfileModal';

const { Text } = Typography;

const Profile = () => {
    const { profile, loading, error, saveProfile } = useProfile();
    const [editMode, setEditMode] = useState(false);
    const [saving, setSaving] = useState(false);
    const [activeSection, setActiveSection] = useState('personal');
    const [form] = Form.useForm();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fafbfa] px-4 py-10 sm:px-8">
                <div className="mx-auto flex max-w-6xl gap-8">
                    <div className="w-80 shrink-0">
                        <Skeleton.Avatar active size={84} shape="square" />
                        <Skeleton
                            active
                            title
                            paragraph={{ rows: 5 }}
                            className="mt-4"
                        />
                    </div>
                    <div className="flex-1">
                        <Skeleton active paragraph={{ rows: 8 }} />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="flex min-h-[500px] items-center justify-center bg-[#fafbfa]">
                <Empty
                    description={
                        error ||
                        "This record couldn't be loaded. Try refreshing the page."
                    }
                />
            </div>
        );
    }

    const {
        personal = {},
        professional = {},
        education = {},
        learning = {},
        training = [],
    } = profile;
    const careerGoals = learning.careerGoals ?? [];
    const interests = learning.interests ?? [];
    const trainingList = training ?? [];
    const completedTrainings = trainingList.filter(
        (t) => t.status === 'Completed'
    ).length;

    const openEdit = () => {
        form.setFieldsValue({ ...personal, ...professional, ...education });
        setEditMode(true);
    };

    const handleSave = async (values) => {
        setSaving(true);
        try {
            await saveProfile({
                ...profile,
                personal: {
                    ...profile.personal,
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    avatar: values.avatar,
                },
                professional: {
                    ...profile.professional,
                    designation: values.designation,
                    currentAssignment: values.currentAssignment,
                },
                education: {
                    ...profile.education,
                    highestQualification: values.highestQualification,
                    specialization: values.specialization,
                    institution: values.institution,
                },
            });
            message.success('Profile updated');
            setEditMode(false);
        } catch {
            message.error("Couldn't save your changes. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fafbfa] px-4 py-8 text-[var(--ink)] sm:px-6 lg:px-10">
            <div className="mx-auto max-w-6xl space-y-6">
                <ProfileHero
                    personal={personal}
                    professional={professional}
                    education={education}
                    completedTrainings={completedTrainings}
                    totalTrainings={trainingList.length}
                    goalsCount={careerGoals.length}
                    onEdit={openEdit}
                />

                <div className="flex flex-col gap-6 lg:flex-row">
                    <aside className="w-full shrink-0 lg:w-64">
                        <ProfileNav
                            activeSection={activeSection}
                            onChange={setActiveSection}
                            goalsCount={careerGoals.length}
                            trainingCount={trainingList.length}
                        />
                    </aside>

                    <main className="min-w-0 flex-1">
                        <div className="rounded-xl border border-[var(--line)] bg-white p-6 shadow-xs sm:p-8">
                            <div className="mb-6 flex items-center justify-between border-b border-[var(--line)] pb-4">
                                <div>
                                    <h2 className="text-lg font-bold text-[var(--ink)]">
                                        {
                                            SECTIONS.find(
                                                (s) => s.key === activeSection
                                            )?.label
                                        }
                                    </h2>
                                    <Text className="text-xs !text-[var(--muted)]">
                                        Official verified record information
                                    </Text>
                                </div>
                            </div>

                            <ProfileSectionBody
                                activeSection={activeSection}
                                personal={personal}
                                professional={professional}
                                education={education}
                                careerGoals={careerGoals}
                                interests={interests}
                                trainingList={trainingList}
                            />
                        </div>
                    </main>
                </div>

                {editMode && (
                    <EditProfileModal
                        form={form}
                        saving={saving}
                        onClose={() => setEditMode(false)}
                        onSave={handleSave}
                    />
                )}
            </div>
        </div>
    );
};

export default Profile;
