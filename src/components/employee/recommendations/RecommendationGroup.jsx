
import { Tag } from 'antd';
import CourseTile from './CourseTile';

const priorityColor = { High: 'red', Medium: 'gold' };

const RecommendationGroup = ({ recommendation }) => {
    const { skillName, domain, priority, courses } = recommendation;

    return (
        <div className="rounded-lg border border-[var(--line)] bg-white p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="font-semibold text-[var(--ink)]">
                        {skillName}
                    </h4>
                    <p className="text-xs text-[var(--muted)]">{domain}</p>
                </div>
                <Tag color={priorityColor[priority]}>{priority} Priority</Tag>
            </div>

            <div className="flex flex-col gap-2.5">
                {courses.map((course, i) => (
                    <CourseTile
                        key={course.id}
                        course={course}
                        isBestMatch={i === 0}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecommendationGroup;
