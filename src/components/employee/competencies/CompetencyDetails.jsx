// src/components/competencies/CompetencyDetails.jsx
import { Drawer, Progress, Tag, Button, Divider } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import CompetencyLevel from './CompetencyLevel';

const CompetencyDetails = ({ competency, onClose }) => {
    return (
        <Drawer
            title={
                competency ? (
                    <div>
                        <p className="text-base font-bold text-[var(--ink)] m-0">
                            {competency.name}
                        </p>
                        <p className="text-xs text-[var(--muted)] m-0 font-normal">
                            {competency.domain}
                        </p>
                    </div>
                ) : null
            }
            placement="right"
            width={420}
            open={!!competency}
            onClose={onClose}
            maskClosable
            destroyOnClose
        >
            {competency && (
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <CompetencyLevel
                            label="Current"
                            level={competency.currentLevel}
                            variant="current"
                        />
                        <CompetencyLevel
                            label="Required"
                            level={competency.requiredLevel}
                            variant="required"
                        />
                    </div>

                    <div>
                        <p className="text-xs text-[var(--muted)] mb-1">
                            Assessment Score
                        </p>
                        <Progress
                            percent={competency.assessmentScore}
                            strokeColor="#d4f35b"
                            trailColor="#e4e8e5"
                        />
                    </div>

                    {competency.evidence?.length > 0 && (
                        <>
                            <Divider className="!my-2" />
                            <div>
                                <h4 className="text-sm font-semibold text-[var(--ink)] mb-2">
                                    Evidence
                                </h4>
                                <ul className="flex flex-col gap-1.5">
                                    {competency.evidence.map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-2 text-sm text-[var(--muted)]"
                                        >
                                            <CheckCircleFilled className="text-green-600 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}

                    {competency.missingCapabilities?.length > 0 && (
                        <>
                            <Divider className="!my-2" />
                            <div>
                                <h4 className="text-sm font-semibold text-[var(--ink)] mb-2">
                                    Missing Capabilities
                                </h4>
                                <ul className="flex flex-col gap-1.5">
                                    {competency.missingCapabilities.map(
                                        (item, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-2 text-sm text-[var(--muted)]"
                                            >
                                                <CloseCircleFilled className="text-red-500 mt-0.5" />
                                                {item}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </>
                    )}

                    {competency.recommendedNextStep && (
                        <>
                            <Divider className="!my-2" />
                            <div className="rounded-lg border border-[var(--line)] p-4">
                                <p className="text-xs text-[var(--muted)]">
                                    Recommended next step
                                </p>
                                <p className="font-semibold text-[var(--ink)] mt-1">
                                    {competency.recommendedNextStep}
                                </p>
                                <Button
                                    block
                                    className="!mt-3 !bg-[var(--lime)] !border-none !text-[var(--ink)] !font-semibold hover:!bg-[#c0e14a]"
                                >
                                    View Recommendations
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </Drawer>
    );
};

export default CompetencyDetails;
