
import { Select } from 'antd';
import { competencyDomains } from '../../../mock/competencies.mock';

const severityOptions = ['All', 'Critical Gap', 'Developing'];

const SkillGapFilters = ({
    domain,
    onDomainChange,
    severity,
    onSeverityChange,
}) => (
    <div className="flex gap-2">
        <Select
            value={domain}
            onChange={onDomainChange}
            className="w-full md:w-48 !py-2"
            options={[
                { value: 'All', label: 'All Domains' },
                ...competencyDomains.map((d) => ({ value: d, label: d })),
            ]}
        />
        <Select
            value={severity}
            onChange={onSeverityChange}
            className="w-full md:w-44 !py-2"
            options={severityOptions.map((s) => ({
                value: s,
                label: s === 'All' ? 'All Severity' : s,
            }))}
        />
    </div>
);

export default SkillGapFilters;
