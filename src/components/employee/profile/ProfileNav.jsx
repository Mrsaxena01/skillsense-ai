
export const SECTIONS = [
    { key: 'personal', label: 'Personal particulars', countKey: null },
    { key: 'service', label: 'Service details', countKey: null },
    { key: 'education', label: 'Education', countKey: null },
    { key: 'goals', label: 'Goals & interests', countKey: 'goalsCount' },
    { key: 'training', label: 'Training record', countKey: 'trainingCount' },
];

const ProfileNav = ({ activeSection, onChange, goalsCount, trainingCount }) => {
    return (
        <div className="rounded-xl border border-[var(--line)] bg-white p-2 shadow-xs">
            <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
                {SECTIONS.map((s) => {
                    const active = activeSection === s.key;
                    const count =
                        s.countKey === 'goalsCount'
                            ? goalsCount
                            : s.countKey === 'trainingCount'
                              ? trainingCount
                              : null;

                    return (
                        <button
                            key={s.key}
                            type="button"
                            onClick={() => onChange(s.key)}
                            className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-left text-sm font-medium transition-all ${
                                active
                                    ? 'bg-[var(--ink)] font-semibold text-[var(--lime)] shadow-xs'
                                    : 'text-[var(--muted)] hover:bg-[#f5f7f5] hover:text-[var(--ink)]'
                            }`}
                        >
                            <span className="whitespace-nowrap">{s.label}</span>
                            {count != null && (
                                <span
                                    className={`ml-2 rounded-full px-2 py-0.5 text-xs font-bold ${
                                        active
                                            ? 'bg-[var(--lime)] text-[var(--ink)]'
                                            : 'bg-[#edf1ed] text-[var(--muted)]'
                                    }`}
                                >
                                    {count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default ProfileNav;
