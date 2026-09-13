import { Select, Tag } from 'antd';

const levelConfig = {
    0: { label: 'Not required', color: 'default' },
    1: { label: 'Beginner', color: 'blue' },
    2: { label: 'Basic', color: 'cyan' },
    3: { label: 'Intermediate', color: 'orange' },
    4: { label: 'Advanced', color: 'purple' },
    5: { label: 'Expert', color: 'magenta' },
};

const RequirementLevelPicker = ({ value, onChange }) => {
    // Custom render for the selected option to show a nice colored tag
    const tagRender = (props) => {
        const { value, label } = props;
        const color = levelConfig[value]?.color || 'default';
        return (
            <Tag color={color} className="m-0 mr-1">
                {label}
            </Tag>
        );
    };

    return (
        <Select
            value={value ?? 0}
            onChange={onChange}
            className="w-48"
            tagRender={tagRender}
            options={Object.entries(levelConfig).map(([v, config]) => ({
                value: Number(v),
                label: config.label,
            }))}
        />
    );
};

export default RequirementLevelPicker;
