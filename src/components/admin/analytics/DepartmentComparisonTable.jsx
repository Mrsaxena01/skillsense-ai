
import { Table, Tag } from 'antd';

const DepartmentComparisonTable = ({ data }) => {
    const columns = [
        { title: 'Department', dataIndex: 'department', key: 'department' },
        { title: 'Headcount', dataIndex: 'headcount', key: 'headcount' },
        {
            title: 'Avg. competency',
            dataIndex: 'avgCompetency',
            key: 'avgCompetency',
            render: (v) => (
                <Tag color={v >= 70 ? 'green' : v >= 50 ? 'gold' : 'red'}>
                    {v}%
                </Tag>
            ),
            sorter: (a, b) => a.avgCompetency - b.avgCompetency,
        },
        {
            title: 'Avg. assessment score',
            dataIndex: 'avgAssessmentScore',
            key: 'avgAssessmentScore',
            render: (v) =>
                v == null ? (
                    <span className="text-xs text-[var(--muted)]">No data</span>
                ) : (
                    `${v}%`
                ),
        },
        {
            title: 'Assessments completed',
            dataIndex: 'assessmentsCompleted',
            key: 'assessmentsCompleted',
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="department"
            pagination={false}
            className="rounded-lg overflow-hidden [&_.ant-table-thead_th]:!bg-[#fafbfa] [&_.ant-table-thead_th]:!text-[var(--muted)]"
        />
    );
};

export default DepartmentComparisonTable;
