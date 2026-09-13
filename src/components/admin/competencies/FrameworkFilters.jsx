import { Select } from 'antd';

const FrameworkFilters = ({
    role,
    onRoleChange,
    domain,
    onDomainChange,
    roles,
    domains,
}) => (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Select Role
            </label>
            <Select
                value={role}
                onChange={onRoleChange}
                className="w-full sm:w-64"
                options={[
                    { value: 'All', label: 'All Roles' },
                    ...roles.map((r) => ({ value: r, label: r })),
                ]}
            />
        </div>
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Filter by Domain
            </label>
            <Select
                value={domain}
                onChange={onDomainChange}
                className="w-full sm:w-48"
                options={[
                    { value: 'All', label: 'All Domains' },
                    ...domains.map((d) => ({ value: d, label: d })),
                ]}
            />
        </div>
    </div>
);

export default FrameworkFilters;
