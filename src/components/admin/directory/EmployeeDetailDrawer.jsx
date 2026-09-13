
import { Drawer, Avatar, Tag, Progress, Divider } from 'antd';
import {
    MailOutlined,
    PhoneOutlined,
    BankOutlined,
    IdcardOutlined,
} from '@ant-design/icons';

const getInitials = (name = '') =>
    name
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

const EmployeeDetailDrawer = ({ employee, onClose }) => (
    <Drawer
        placement="right"
        width={420}
        open={!!employee}
        onClose={onClose}
        maskClosable
        destroyOnClose
        title={employee ? 'Employee record' : null}
    >
        {employee && (
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                    <Avatar
                        shape="square"
                        size={56}
                        className="!rounded-xl !bg-[#f0fcd0] !text-[var(--ink)] !font-bold !text-lg"
                    >
                        {getInitials(employee.personal.name)}
                    </Avatar>
                    <div>
                        <p className="text-base font-bold text-[var(--ink)] m-0">
                            {employee.personal.name}
                        </p>
                        <p className="text-xs text-[var(--muted)] m-0">
                            {employee.professional.designation}
                        </p>
                        <Tag
                            color={
                                employee.status === 'Active'
                                    ? 'green'
                                    : 'default'
                            }
                            className="mt-1"
                        >
                            {employee.status}
                        </Tag>
                    </div>
                </div>

                <div>
                    <p className="text-xs text-[var(--muted)] mb-1">
                        Overall competency
                    </p>
                    <Progress
                        percent={employee.overallCompetency}
                        strokeColor="#d4f35b"
                        trailColor="#e4e8e5"
                    />
                </div>

                <Divider className="!my-2" />

                <dl className="divide-y divide-[var(--line)]">
                    {[
                        {
                            icon: <MailOutlined />,
                            label: 'Email',
                            value: employee.personal.email,
                        },
                        {
                            icon: <PhoneOutlined />,
                            label: 'Phone',
                            value: employee.personal.phone,
                        },
                        {
                            icon: <IdcardOutlined />,
                            label: 'Employee ID',
                            value: employee.professional.employeeId,
                        },
                        {
                            icon: <BankOutlined />,
                            label: 'Department',
                            value: employee.professional.department,
                        },
                    ].map((row) => (
                        <div
                            key={row.label}
                            className="flex items-center justify-between py-2.5 text-sm"
                        >
                            <span className="flex items-center gap-2 text-[var(--muted)]">
                                {row.icon} {row.label}
                            </span>
                            <span className="text-[var(--ink)] font-medium">
                                {row.value}
                            </span>
                        </div>
                    ))}
                </dl>

                <Divider className="!my-2" />

                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
                        Service details
                    </p>
                    <dl className="divide-y divide-[var(--line)]">
                        {[
                            {
                                label: 'Job role',
                                value: employee.professional.jobRole,
                            },
                            {
                                label: 'Current assignment',
                                value: employee.professional.currentAssignment,
                            },
                            {
                                label: 'Experience',
                                value: `${employee.professional.experienceYears} years`,
                            },
                            {
                                label: 'Joining date',
                                value: employee.professional.joiningDate,
                            },
                        ].map((row) => (
                            <div
                                key={row.label}
                                className="flex items-center justify-between py-2.5 text-sm"
                            >
                                <span className="text-[var(--muted)]">
                                    {row.label}
                                </span>
                                <span className="text-[var(--ink)] font-medium">
                                    {row.value}
                                </span>
                            </div>
                        ))}
                    </dl>
                </div>

                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
                        Education
                    </p>
                    <p className="text-sm text-[var(--ink)] m-0">
                        {employee.education.highestQualification} —{' '}
                        {employee.education.specialization}
                    </p>
                    <p className="text-xs text-[var(--muted)] m-0">
                        {employee.education.institution} ·{' '}
                        {employee.education.graduationYear}
                    </p>
                </div>
            </div>
        )}
    </Drawer>
);

export default EmployeeDetailDrawer;
