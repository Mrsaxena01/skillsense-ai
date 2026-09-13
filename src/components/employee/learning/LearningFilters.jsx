
import { Select } from 'antd';

const statusOptions = ['All', 'In Progress', 'Completed', 'Not Started'];

const LearningFilters = ({ status, onStatusChange }) => (
    <Select
        value={status}
        onChange={onStatusChange}
        className="w-full md:w-48 !py-2"
        options={statusOptions.map((s) => ({
            value: s,
            label: s === 'All' ? 'All Status' : s,
        }))}
    />
);

export default LearningFilters;
