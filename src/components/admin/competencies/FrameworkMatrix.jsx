import { Table } from 'antd';
import RequirementLevelPicker from './RequirementLevelPicker';

const FrameworkMatrix = ({ role, skills, requirements, onUpdate }) => {
    const roleReqs = requirements[role] || {};

    const columns = [
        {
            title: 'SKILL & DOMAIN',
            key: 'skill',
            render: (_, s) => (
                <div className="py-1">
                    <p className="m-0 text-sm font-medium text-slate-900">
                        {s.name}
                    </p>
                    <span className="mt-1 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                        {s.domain}
                    </span>
                </div>
            ),
        },
        {
            title: 'REQUIRED LEVEL',
            key: 'required',
            width: 250,
            render: (_, s) => (
                <RequirementLevelPicker
                    value={roleReqs[s.name]}
                    onChange={(newLevel) => onUpdate(role, s.name, newLevel)}
                />
            ),
        },
    ];

    return (
        <div className="px-4 pb-4">
            <Table
                columns={columns}
                dataSource={skills}
                rowKey="name"
                pagination={false}
                size="middle"
                className="custom-table"
            />
        </div>
    );
};

export default FrameworkMatrix;
