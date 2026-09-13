
import { Avatar, Button } from 'antd';
import {
    BankOutlined,
    CheckCircleFilled,
    EditOutlined,
    IdcardOutlined,
    SafetyCertificateFilled,
} from '@ant-design/icons';
import { getInitials, formatDate } from '../../../utils/profile.utils';

const MetricCell = ({ label, value }) => (
    <div className="px-6 py-3.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
            {label}
        </span>
        <div className="truncate text-lg font-bold text-[var(--ink)]">
            {value}
        </div>
    </div>
);

const ProfileHero = ({
    personal,
    professional,
    education,
    completedTrainings,
    totalTrainings,
    goalsCount,
    onEdit,
}) => {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm">
            <div className="h-2 w-full bg-[var(--lime)]" />
            <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="relative">
                        <Avatar
                            shape="square"
                            size={88}
                            src={personal.avatar}
                            alt={personal.name}
                            className="!rounded-xl !border-2 !border-[var(--ink)] !bg-[#f0fcd0] !font-bold !text-2xl !text-[var(--ink)] shadow-sm"
                        >
                            {!personal.avatar && getInitials(personal.name)}
                        </Avatar>
                        <span className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--lime)] shadow">
                            <SafetyCertificateFilled style={{ fontSize: 12 }} />
                        </span>
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                            <h1 className="text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
                                {personal.name || 'Unnamed User'}
                            </h1>
                            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] bg-[#f6f9f6] px-2.5 py-0.5 text-xs font-semibold text-[var(--ink)]">
                                <CheckCircleFilled className="text-[#3a7d44]" />{' '}
                                Verified Cadre
                            </span>
                        </div>

                        <p className="mt-1 text-sm font-medium text-[var(--muted)]">
                            {professional.designation || 'Designation not set'}{' '}
                            ·{' '}
                            <span className="text-[var(--ink)]">
                                {professional.department ||
                                    'Official Statistics'}
                            </span>
                        </p>

                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[var(--muted)]">
                            <span className="flex items-center gap-1.5">
                                <IdcardOutlined className="text-[var(--ink)]" />
                                ID:{' '}
                                <strong className="font-mono text-[var(--ink)]">
                                    {professional.employeeId || '—'}
                                </strong>
                            </span>
                            <span className="flex items-center gap-1.5">
                                <BankOutlined className="text-[var(--ink)]" />
                                Joined:{' '}
                                <span className="font-medium text-[var(--ink)]">
                                    {formatDate(professional.joiningDate) ||
                                        '—'}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex shrink-0">
                    <Button
                        icon={<EditOutlined />}
                        onClick={onEdit}
                        size="large"
                        className="w-full !rounded-xl !border-[var(--line)] !bg-white !px-6 !font-semibold !text-[var(--ink)] shadow-xs transition-all hover:!border-[var(--ink)] hover:!bg-[var(--lime)] sm:w-auto"
                    >
                        Edit particulars
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-[var(--line)] border-t border-[var(--line)] bg-[#fcfdfc] sm:grid-cols-4">
                <MetricCell
                    label="Experience"
                    value={
                        professional.experienceYears != null
                            ? `${professional.experienceYears} Years`
                            : '—'
                    }
                />
                <MetricCell
                    label="Trainings"
                    value={
                        <>
                            {completedTrainings}{' '}
                            <span className="text-xs font-normal text-[var(--muted)]">
                                / {totalTrainings} done
                            </span>
                        </>
                    }
                />
                <MetricCell label="Career Goals" value={goalsCount} />
                <MetricCell
                    label="Specialization"
                    value={education.specialization || 'Not specified'}
                />
            </div>
        </div>
    );
};

export default ProfileHero;
