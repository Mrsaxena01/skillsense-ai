
import { useCallback, useEffect, useState } from 'react';
import {
    fetchCourseCatalog,
    createCourse,
    updateCourse,
    deleteCourse,
} from '../services/courseCatalogService';

export function useCourseCatalog() {
    const [courses, setCourses] = useState([]);
    const [status, setStatus] = useState('loading');

    const load = useCallback(() => {
        setStatus('loading');
        fetchCourseCatalog().then((data) => {
            setCourses(data);
            setStatus('success');
        });
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const add = async (course) => {
        await createCourse(course);
        load();
    };
    const edit = async (id, updates) => {
        await updateCourse(id, updates);
        load();
    };
    const remove = async (id) => {
        await deleteCourse(id);
        load();
    };

    return { courses, status, add, edit, remove };
}
