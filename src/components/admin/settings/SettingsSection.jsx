
const SettingsSection = ({ title, description, children }) => (
    <div className="rounded-lg border border-[var(--line)] bg-white p-5 sm:p-6">
        <h3 className="text-sm font-semibold text-[var(--ink)]">{title}</h3>
        {description && (
            <p className="text-xs text-[var(--muted)] mt-1 mb-4">
                {description}
            </p>
        )}
        <div className={description ? '' : 'mt-4'}>{children}</div>
    </div>
);

export default SettingsSection;
