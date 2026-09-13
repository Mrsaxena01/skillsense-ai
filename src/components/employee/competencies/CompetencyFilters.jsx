
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { competencyDomains } from '../../../mock/competencies.mock';

const statusOptions = ['All', 'Meets', 'Developing', 'Critical Gap'];

const CompetencyFilters = ({
    search,
    onSearchChange,
    domain,
    onDomainChange,
    status,
    onStatusChange,
}) => {
    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search competencies..."
                prefix={<SearchOutlined className="text-[var(--muted)]" />}
                className="w-full md:max-w-xs !py-2"
                allowClear
            />

            <div className="flex gap-2">
                <Select
                    value={domain}
                    onChange={onDomainChange}
                    className="w-full md:w-48 !py-2"
                    options={[
                        { value: 'All', label: 'All Domains' },
                        ...competencyDomains.map((d) => ({
                            value: d,
                            label: d,
                        })),
                    ]}
                />

                <Select
                    value={status}
                    onChange={onStatusChange}
                    className="w-full md:w-40"
                    options={statusOptions.map((s) => ({
                        value: s,
                        label: s === 'All' ? 'All Status' : s,
                    }))}
                />
            </div>
        </div>
    );
};

export default CompetencyFilters;
