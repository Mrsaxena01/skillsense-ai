
import { Tag } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const severityColor = { 'Critical Gap': 'red', Developing: 'gold' };

const DevelopmentAreasList = ({ areas, onExplore }) => (
    <div className="rounded-lg border border-[var(--line)] bg-white p-5">
        <h3 className="text-sm font-semibold text-[var(--ink)] mb-4">
            Development Areas
        </h3>
        <div className="flex flex-col gap-2.5">
            {areas.map((a) => (
                <button
                    key={a.id}
                    type="button"
                    onClick={() => onExplore(a.id)}
                    className="flex w-full items-center justify-between rounded-lg border border-[var(--line)] p-3 text-left transition-colors hover:border-[var(--ink)]"
                >
                    <span>
                        <span className="block text-sm font-medium text-[var(--ink)]">
                            {a.name}
                        </span>
                        <span className="text-xs text-[var(--muted)]">
                            {a.domain}
                        </span>
                    </span>
                    <span className="flex items-center gap-2">
                        <Tag color={severityColor[a.status]} className="m-0">
                            {a.status}
                        </Tag>
                        <ArrowRightOutlined className="text-[var(--muted)] text-xs" />
                    </span>
                </button>
            ))}
            {areas.length === 0 && (
                <p className="text-sm text-[var(--muted)]">
                    No development areas — all competencies on target.
                </p>
            )}
        </div>
    </div>
);

export default DevelopmentAreasList;
