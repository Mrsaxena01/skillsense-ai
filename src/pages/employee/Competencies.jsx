// src/pages/employee/Competencies.jsx
import { useMemo, useState } from 'react';
import { useCompetencies } from '../../hooks/useCompetencies';
import CompetencySummary from '../../components/employee/competencies/CompetencySummary'
import CompetencyFilters from '../../components/employee/competencies/CompetencyFilters';
import CompetencyCard from '../../components/employee/competencies/CompetencyCard';
import CompetencyDetails from '../../components/employee/competencies/CompetencyDetails';

const Competencies = () => {
    const { competencies, summary, status } = useCompetencies();

    const [search, setSearch] = useState('');
    const [domain, setDomain] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selected, setSelected] = useState(null);

    const filtered = useMemo(() => {
        return competencies.filter((c) => {
            const matchesSearch = c.name
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchesDomain = domain === 'All' || c.domain === domain;
            const matchesStatus =
                statusFilter === 'All' || c.status === statusFilter;
            return matchesSearch && matchesDomain && matchesStatus;
        });
    }, [competencies, search, domain, statusFilter]);

    const grouped = useMemo(() => {
        return filtered.reduce((acc, c) => {
            acc[c.domain] = acc[c.domain] || [];
            acc[c.domain].push(c);
            return acc;
        }, {});
    }, [filtered]);

    if (status === 'loading') {
        return (
            <div className="p-8 text-sm text-[var(--muted)]">
                Loading competencies...
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="p-8 text-sm text-red-600">
                Failed to load competencies.
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-[var(--ink)]">
                    Competencies
                </h1>
                <p className="text-sm text-[var(--muted)] mt-1">
                    Your current capabilities compared with role requirements
                </p>
            </div>

            <CompetencySummary summary={summary} />

            <CompetencyFilters
                search={search}
                onSearchChange={setSearch}
                domain={domain}
                onDomainChange={setDomain}
                status={statusFilter}
                onStatusChange={setStatusFilter}
            />

            {Object.keys(grouped).length === 0 && (
                <p className="text-sm text-[var(--muted)]">
                    No competencies match your filters.
                </p>
            )}

            {Object.entries(grouped).map(([domainName, items]) => (
                <div key={domainName} className="flex flex-col gap-3">
                    <h3 className="text-sm font-semibold text-[var(--ink)] uppercase tracking-wide">
                        {domainName}
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {items.map((c) => (
                            <CompetencyCard
                                key={c.id}
                                competency={c}
                                onViewDetails={setSelected}
                            />
                        ))}
                    </div>
                </div>
            ))}

            <CompetencyDetails
                competency={selected}
                onClose={() => setSelected(null)}
            />
        </div>
    );
};

export default Competencies;
