
const LedgerList = ({ rows }) => (
    <dl className="divide-y divide-[var(--line)]">
        {rows.map((row) => (
            <div
                key={row.label}
                className="flex flex-col py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
                <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    {row.label}
                </dt>
                <dd className="mt-1 flex items-center gap-2 sm:mt-0">
                    {row.value ? (
                        <>
                            {row.icon && (
                                <span className="text-[var(--muted)]">
                                    {row.icon}
                                </span>
                            )}
                            <span className="text-sm font-medium text-[var(--ink)]">
                                {row.value}
                            </span>
                        </>
                    ) : (
                        <span className="text-xs italic text-[var(--muted)]">
                            Not registered
                        </span>
                    )}
                </dd>
            </div>
        ))}
    </dl>
);

export default LedgerList;
