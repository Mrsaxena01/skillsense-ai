
import { Table, Tag, Progress, Avatar } from 'antd';

const getInitials = (name = '') =>
    name
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

const competencyColor = (score) =>
    score >= 70 ? '#3a7d44' : score >= 50 ? '#b67b25' : '#c73636';

const EmployeeTable = ({ employees, onSelect }) => {
    const columns = [
        {
            title: 'Employee',
            key: 'employee',
            render: (_, e) => (
                <div className="flex items-center gap-3">
                    <Avatar
                        shape="square"
                        className="!rounded-lg !bg-[#f0fcd0] !text-[var(--ink)] !font-bold"
                    >
                        {getInitials(e.personal.name)}
                    </Avatar>
                    <div>
                        <p className="text-sm font-semibold text-[var(--ink)] m-0">
                            {e.personal.name}
                        </p>
                        <p className="text-xs text-[var(--muted)] m-0">
                            {e.professional.employeeId}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: 'Role',
            key: 'role',
            render: (_, e) => (
                <div>
                    <p className="text-sm text-[var(--ink)] m-0">
                        {e.professional.jobRole}
                    </p>
                    <p className="text-xs text-[var(--muted)] m-0">
                        {e.professional.department}
                    </p>
                </div>
            ),
        },
        {
            title: 'Experience',
            key: 'experience',
            render: (_, e) => (
                <span className="text-sm text-[var(--ink)]">
                    {e.professional.experienceYears} yrs
                </span>
            ),
        },
        {
            title: 'Competency',
            key: 'competency',
            render: (_, e) => (
                <div className="flex items-center gap-2 w-32">
                    <Progress
                        percent={e.overallCompetency}
                        showInfo={false}
                        strokeColor={competencyColor(e.overallCompetency)}
                        trailColor="#e4e8e5"
                        className="flex-1"
                    />
                    <span className="text-xs font-medium text-[var(--ink)] w-8">
                        {e.overallCompetency}%
                    </span>
                </div>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, e) => (
                <Tag color={e.status === 'Active' ? 'green' : 'default'}>
                    {e.status}
                </Tag>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={employees}
            rowKey="id"
            pagination={{ pageSize: 8 }}
            onRow={(record) => ({
                onClick: () => onSelect(record),
                className: 'cursor-pointer',
            })}
            className="rounded-lg overflow-hidden [&_.ant-table-thead_th]:!bg-[#fafbfa] [&_.ant-table-thead_th]:!text-[var(--muted)]"
        />
    );
};

export default EmployeeTable;
