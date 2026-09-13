
import { message } from 'antd';
import { useSettings } from '../../hooks/useSettings';
import SettingsSection from '../../components/admin/settings/SettingsSection';
import OrganizationForm from '../../components/admin/settings/OrganizationForm';
import ThresholdSettings from '../../components/admin/settings/ThresholdSettings';
import NotificationSettings from '../../components/admin/settings/NotificationSettings';

const Settings = () => {
    const { settings, status, saving, save } = useSettings();

    if (status === 'loading' || !settings) {
        return (
            <div className="p-8 text-sm text-[var(--muted)]">
                Loading settings...
            </div>
        );
    }

    const handleOrgSave = async (values) => {
        const ok = await save(values);
        if (ok) message.success('Organization details updated');
    };

    const handleThresholdChange = async (thresholds) => {
        await save({ competencyThresholds: thresholds });
    };

    const handleNotificationChange = async (notifications) => {
        await save({ notifications });
    };

    return (
        <div className="p-6 flex flex-col gap-6 max-w-3xl">
            <div>
                <h1 className="text-2xl font-bold text-[var(--ink)]">
                    Settings
                </h1>
                <p className="text-sm text-[var(--muted)] mt-1">
                    Organization details, competency thresholds, and
                    notification preferences
                </p>
            </div>

            <SettingsSection
                title="Organization"
                description="Basic details shown across the platform."
            >
                <OrganizationForm
                    initialValues={settings}
                    onSave={handleOrgSave}
                    saving={saving}
                />
            </SettingsSection>

            <SettingsSection
                title="Competency thresholds"
                description="Controls how gap severity is calculated for every employee."
            >
                <ThresholdSettings
                    thresholds={settings.competencyThresholds}
                    onChange={handleThresholdChange}
                />
            </SettingsSection>

            <SettingsSection
                title="Notifications"
                description="Choose what admins get alerted about."
            >
                <NotificationSettings
                    notifications={settings.notifications}
                    onChange={handleNotificationChange}
                />
            </SettingsSection>
        </div>
    );
};

export default Settings;
