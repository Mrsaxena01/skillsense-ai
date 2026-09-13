
import { InputNumber, Tag } from 'antd';

const ThresholdSettings = ({ thresholds, onChange }) => (
    <div className="flex flex-col gap-5">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
                <label className="text-xs font-medium text-[var(--ink)] block mb-1.5">
                    "Developing" gap size (levels below required)
                </label>
                <InputNumber
                    min={1}
                    max={3}
                    value={thresholds.developingGap}
                    onChange={(v) =>
                        onChange({ ...thresholds, developingGap: v })
                    }
                    className="w-full"
                />
            </div>
        </div>

        <div className="rounded-lg bg-[#fafbfa] border border-[var(--line)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-3">
                Preview
            </p>
            <div className="flex flex-wrap gap-2">
                <Tag color="green">Meets — gap 0</Tag>
                <Tag color="gold">
                    Developing — gap 1 to {thresholds.developingGap}
                </Tag>
                <Tag color="red">
                    Critical Gap — gap {thresholds.developingGap + 1}+
                </Tag>
            </div>
        </div>
    </div>
);

export default ThresholdSettings;
