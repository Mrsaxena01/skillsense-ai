
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const statusOptions = ['All', 'Active', 'On Leave'];

const DirectoryFilters = ({
    search,
    onSearchChange,
    department,
    onDepartmentChange,
    status,
    onStatusChange,
    departments,
}) => (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name or role..."
            prefix={<SearchOutlined className="text-[var(--muted)]" />}
            className="w-full md:max-w-xs !py-2"
            allowClear
        />

        <div className="flex gap-2">
            <Select
                value={department}
                onChange={onDepartmentChange}
                className="w-full md:w-56 !py-2"
                options={[
                    { value: 'All', label: 'All Departments' },
                    ...departments.map((d) => ({ value: d, label: d })),
                ]}
            />
            <Select
                value={status}
                onChange={onStatusChange}
                className="w-full md:w-36 !py-2"
                options={statusOptions.map((s) => ({
                    value: s,
                    label: s === 'All' ? 'All Status' : s,
                }))}
            />
        </div>
    </div>
);

export default DirectoryFilters;
