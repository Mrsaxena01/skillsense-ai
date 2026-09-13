
import { Select } from 'antd';

const priorityOptions = ['All', 'High', 'Medium'];

const RecommendationFilters = ({ priority, onPriorityChange }) => (
    <Select
        value={priority}
        onChange={onPriorityChange}
        className="w-full md:w-48 !py-2"
        options={priorityOptions.map((p) => ({
            value: p,
            label: p === 'All' ? 'All Priorities' : `${p} Priority`,
        }))}
    />
);

export default RecommendationFilters;
