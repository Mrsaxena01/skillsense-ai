// src/pages/admin/UserDirectory.jsx
import { useMemo, useState } from 'react';
import { useEmployeeDirectory } from '../../hooks/useEmployeeDirectory';
import DirectoryFilters from '../../components/admin/directory/DirectoryFilters';
import EmployeeTable from '../../components/admin/directory/EmployeeTable';
import EmployeeDetailDrawer from '../../components/admin/directory/EmployeeDetailDrawer';

const Users = () => {
    const { employees, departments, status } = useEmployeeDirectory();
    const [search, setSearch] = useState('');
    const [department, setDepartment] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selected, setSelected] = useState(null);

    const filtered = useMemo(() => {
        return employees.filter((e) => {
            const q = search.toLowerCase();
            const matchesSearch =
                e.personal.name.toLowerCase().includes(q) ||
                e.professional.jobRole.toLowerCase().includes(q);
            const matchesDept =
                department === 'All' ||
                e.professional.department === department;
            const matchesStatus =
                statusFilter === 'All' || e.status === statusFilter;
            return matchesSearch && matchesDept && matchesStatus;
        });
    }, [employees, search, department, statusFilter]);

    if (status === 'loading') {
        return (
            <div className="p-8 text-sm text-[var(--muted)]">
                Loading employee directory...
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="p-8 text-sm text-red-600">
                Failed to load employees.
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-[var(--ink)]">
                    User Directory
                </h1>
                <p className="text-sm text-[var(--muted)] mt-1">
                    {employees.length} officials across {departments.length}{' '}
                    departments
                </p>
            </div>

            <DirectoryFilters
                search={search}
                onSearchChange={setSearch}
                department={department}
                onDepartmentChange={setDepartment}
                status={statusFilter}
                onStatusChange={setStatusFilter}
                departments={departments}
            />

            <EmployeeTable employees={filtered} onSelect={setSelected} />

            <EmployeeDetailDrawer
                employee={selected}
                onClose={() => setSelected(null)}
            />
        </div>
    );
};

export default Users;
