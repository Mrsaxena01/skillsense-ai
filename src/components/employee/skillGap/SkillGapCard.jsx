
import { Tag, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import CompetencyLevel from '../competencies/CompetencyLevel';

const severityColor = {
    'Critical Gap': 'red',
    Developing: 'gold',
};

const SkillGapCard = ({ gap }) => {
    const {
        name,
        domain,
        currentLevel,
        requiredLevel,
        status,
        recommendedNextStep,
    } = gap;

    return (
        <div className="rounded-lg border border-[var(--line)] bg-white p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between">
                <div>
                    <h4 className="font-semibold text-[var(--ink)]">{name}</h4>
                    <p className="text-xs text-[var(--muted)]">{domain}</p>
                </div>
                <Tag color={severityColor[status]}>{status}</Tag>
            </div>

            <div className="flex flex-col gap-2">
                <CompetencyLevel
                    label="Current"
                    level={currentLevel}
                    variant="current"
                />
                <CompetencyLevel
                    label="Required"
                    level={requiredLevel}
                    variant="required"
                />
            </div>

            <div className="flex items-center justify-between text-xs text-[var(--muted)] pt-2 border-t border-[var(--line)]">
                <span>
                    Gap: {requiredLevel - currentLevel} level
                    {requiredLevel - currentLevel > 1 ? 's' : ''}
                </span>
            </div>

            {recommendedNextStep && (
                <Button
                    block
                    className="!bg-[var(--lime)] !border-none !text-[var(--ink)] !font-semibold hover:!bg-[#c0e14a]"
                    icon={<ArrowRightOutlined />}
                    iconPosition="end"
                >
                    {recommendedNextStep}
                </Button>
            )}
        </div>
    );
};

export default SkillGapCard;
