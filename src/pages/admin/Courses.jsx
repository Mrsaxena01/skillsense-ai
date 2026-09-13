// src/pages/admin/CourseCatalog.jsx
import { useMemo, useState } from 'react';
import { Button, Input, Select } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useCourseCatalog } from '../../hooks/useCourseCatalog';
import { domainOptions } from '../../services/courseCatalogService';
import CourseCatalogTable from '../../components/admin/courses/CourseCatalogTable';
import CourseFormModal from '../../components/admin/courses/CourseFormModal';

const Courses = () => {
    const { courses, status, add, edit, remove } = useCourseCatalog();
    const [search, setSearch] = useState('');
    const [domain, setDomain] = useState('All');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);

    const filtered = useMemo(() => {
        return courses.filter((c) => {
            const matchesSearch = c.title
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchesDomain = domain === 'All' || c.domain === domain;
            return matchesSearch && matchesDomain;
        });
    }, [courses, search, domain]);

    const openAdd = () => {
        setEditingCourse(null);
        setModalOpen(true);
    };
    const openEdit = (course) => {
        setEditingCourse(course);
        setModalOpen(true);
    };

    const handleSubmit = async (values) => {
        if (editingCourse) await edit(editingCourse.id, values);
        else await add(values);
        setModalOpen(false);
    };

    if (status === 'loading') {
        return (
            <div className="p-8 text-sm text-[var(--muted)]">
                Loading course catalog...
            </div>
        );
    }

    return (
        <div className="p-4 md:p-4 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--ink)]">
                        Course Catalog
                    </h1>
                    <p className="text-sm text-[var(--muted)] mt-1">
                        Manage iGOT Karmayogi and NSSTA courses used for
                        recommendations
                    </p>
                </div>
                <Button
                    icon={<PlusOutlined />}
                    onClick={openAdd}
                    className="!rounded-lg !py-4 !border-0 !bg-[var(--lime)] !font-semibold !text-[var(--ink)] hover:!bg-[#c0e14a]"
                >
                    Add course
                </Button>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search courses..."
                    prefix={<SearchOutlined className="text-[var(--muted)]" />}
                    className="w-full md:max-w-xs !py-2 "
                    allowClear
                />
                <Select
                    value={domain}
                    onChange={setDomain}
                    className="w-full md:w-48 !py-2"
                    options={[
                        { value: 'All', label: 'All Domains' },
                        ...domainOptions.map((d) => ({ value: d, label: d })),
                    ]}
                />
            </div>

            <CourseCatalogTable
                courses={filtered}
                onEdit={openEdit}
                onDelete={remove}
            />

            <CourseFormModal
                open={modalOpen}
                initialValues={editingCourse}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default Courses;
