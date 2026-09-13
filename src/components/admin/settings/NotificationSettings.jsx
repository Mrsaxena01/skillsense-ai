
import { Switch } from 'antd';

const notificationLabels = {
    weeklyDigest: {
        title: 'Weekly digest',
        desc: 'Summary of org-wide competency and learning activity',
    },
    criticalGapAlerts: {
        title: 'Critical gap alerts',
        desc: 'Notify when an employee falls into Critical Gap status',
    },
    newQuestionBankReview: {
        title: 'New question bank reviews',
        desc: 'Notify when AI generates a new quiz awaiting review',
    },
    lowAssessmentScoreAlert: {
        title: 'Low assessment score alerts',
        desc: 'Notify on any assessment attempt scoring below 40%',
    },
};

const NotificationSettings = ({ notifications, onChange }) => (
    <div className="flex flex-col divide-y divide-[var(--line)]">
        {Object.entries(notificationLabels).map(([key, { title, desc }]) => (
            <div
                key={key}
                className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
            >
                <div>
                    <p className="text-sm font-medium text-[var(--ink)] m-0">
                        {title}
                    </p>
                    <p className="text-xs text-[var(--muted)] m-0">{desc}</p>
                </div>
                <Switch
                    checked={notifications[key]}
                    onChange={(checked) =>
                        onChange({ ...notifications, [key]: checked })
                    }
                />
            </div>
        ))}
    </div>
);

export default NotificationSettings;
