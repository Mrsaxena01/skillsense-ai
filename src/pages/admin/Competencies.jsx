import { useState } from 'react';
import { message } from 'antd';
import { useFramework } from '../../hooks/useFramework';
import { updateRequirement } from '../../services/frameworkService';
import FrameworkFilters from '../../components/admin/competencies/FrameworkFilters';
import FrameworkMatrix from '../../components/admin/competencies/FrameworkMatrix';

const Competencies = () => {
    const { data, status } = useFramework();
    const [role, setRole] = useState(null);
    const [domain, setDomain] = useState('All');
    const [requirements, setRequirements] = useState(null);

    const activeRole = role ?? data?.roles?.[0];
    const activeRequirements = requirements ?? data?.requirements ?? {};

    const handleUpdate = async (roleKey, skillName, newLevel) => {
        setRequirements((prev) => ({
            ...prev,
            [roleKey]: {
                ...(prev ?? data.requirements)[roleKey],
                [skillName]: newLevel || undefined,
            },
        }));
        await updateRequirement(roleKey, skillName, newLevel);
        message.success(`Updated ${skillName} requirement for ${roleKey}`);
    };

    if (status === 'loading' || !data || !activeRole) {
        return (
            <div className="flex h-screen items-center justify-center text-sm text-slate-500">
                Loading competency framework...
            </div>
        );
    }

    const filteredSkills =
        domain === 'All'
            ? data.skills
            : data.skills.filter((s) => s.domain === domain);

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10">
            <div className="mx-auto max-w-6xl space-y-6">
                {/* Header Section */}
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                        Global Competencies
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Define required competency levels per job role — this
                        drives every employee's skill gap calculation.
                    </p>
                </div>

                {/* Main Content Card */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 bg-slate-50/50 p-4">
                        <FrameworkFilters
                            role={activeRole}
                            onRoleChange={setRole}
                            domain={domain}
                            onDomainChange={setDomain}
                            roles={data.roles}
                            domains={data.domains}
                        />
                    </div>

                    <FrameworkMatrix
                        role={activeRole}
                        skills={filteredSkills}
                        requirements={activeRequirements}
                        onUpdate={handleUpdate}
                    />
                </div>
            </div>
        </div>
    );
};

export default Competencies;
