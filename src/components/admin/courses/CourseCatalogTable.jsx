
import { Table, Tag, Button, Popconfirm } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    ClockCircleOutlined,
    BankOutlined,
} from '@ant-design/icons';

const CourseCatalogTable = ({ courses, onEdit, onDelete }) => {
    const columns = [
        {
            title: 'Course',
            key: 'title',
            render: (_, c) => (
                <div>
                    <p className="text-sm font-semibold text-[var(--ink)] m-0">
                        {c.title}
                    </p>
                    <p className="text-xs text-[var(--muted)] m-0 flex items-center gap-1">
                        <BankOutlined /> {c.provider}
                    </p>
                </div>
            ),
        },
        {
            title: 'Skill',
            key: 'skill',
            render: (_, c) => (
                <div>
                    <p className="text-sm text-[var(--ink)] m-0">
                        {c.skillName}
                    </p>
                    <Tag className="mt-1 m-0 rounded-full border-0 bg-[var(--line)] text-[var(--ink)] text-[11px]">
                        {c.domain}
                    </Tag>
                </div>
            ),
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
            render: (level) => <Tag color="blue">{level}</Tag>,
        },
        {
            title: 'Duration',
            key: 'duration',
            render: (_, c) => (
                <span className="text-sm text-[var(--ink)] flex items-center gap-1">
                    <ClockCircleOutlined /> {c.durationHours}h
                </span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, c) => (
                <div className="flex gap-2">
                    <Button
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(c)}
                        className="!rounded-md"
                    />
                    <Popconfirm
                        title="Delete this course?"
                        onConfirm={() => onDelete(c.id)}
                        okText="Delete"
                        okButtonProps={{ danger: true }}
                    >
                        <Button
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                            className="!rounded-md"
                        />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={courses}
            rowKey="id"
            pagination={{ pageSize: 8 }}
            className="rounded-lg overflow-hidden [&_.ant-table-thead_th]:!bg-[#fafbfa] [&_.ant-table-thead_th]:!text-[var(--muted)]"
        />
    );
};

export default CourseCatalogTable;
