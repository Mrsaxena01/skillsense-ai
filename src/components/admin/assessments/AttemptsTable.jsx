
import { Table, Tag } from 'antd';

const scoreColor = (score) =>
    score == null
        ? 'default'
        : score >= 70
          ? 'green'
          : score >= 50
            ? 'gold'
            : 'red';

const AttemptsTable = ({ attempts }) => {
    const columns = [
        {
            title: 'Employee',
            key: 'employee',
            render: (_, a) => (
                <span className="text-sm font-medium text-[var(--ink)]">
                    {a.employeeName}
                </span>
            ),
        },
        { title: 'Skill', dataIndex: 'skillName', key: 'skillName' },
        {
            title: 'Type',
            dataIndex: 'assessmentType',
            key: 'type',
            render: (t) => (
                <Tag color={t === 'competency' ? 'blue' : 'default'}>
                    {t === 'competency' ? 'Competency' : 'Practice'}
                </Tag>
            ),
        },
        {
            title: 'Score',
            key: 'score',
            render: (_, a) => (
                <Tag color={scoreColor(a.scorePercent)}>
                    {a.scorePercent != null
                        ? `${a.scorePercent}%`
                        : 'Not attempted'}
                </Tag>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'attemptedAt',
            key: 'date',
            render: (d) => d || '—',
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={attempts}
            rowKey="id"
            pagination={{ pageSize: 8 }}
            className="rounded-lg overflow-hidden [&_.ant-table-thead_th]:!bg-[#fafbfa] [&_.ant-table-thead_th]:!text-[var(--muted)]"
        />
    );
};

export default AttemptsTable;
