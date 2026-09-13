
import { useEffect, useMemo, useState } from 'react';
import { fetchAllEmployees } from '../services/admin.service';

export function useEmployeeDirectory() {
    const [employees, setEmployees] = useState([]);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        fetchAllEmployees()
            .then((data) => {
                if (isMounted) {
                    setEmployees(data);
                    setStatus('success');
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err);
                    setStatus('error');
                }
            });
        return () => {
            isMounted = false;
        };
    }, []);

    const departments = useMemo(
        () => [...new Set(employees.map((e) => e.professional.department))],
        [employees]
    );

    return { employees, departments, status, error };
}
