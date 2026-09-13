import { useEffect, useState } from 'react';
import {
    getEmployeeProfile,
    updateEmployeeProfile,
} from '../services/profile.service';
import { useToast } from '../context/ToastContext';

const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { notify } = useToast();

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getEmployeeProfile();

            setProfile(data);
        } catch (err) {
            console.error(err);
            setError('Unable to load profile.');
            notify('Unable to load profile.', 'Error');
        } finally {
            setLoading(false);
        }
    };

    const saveProfile = async (updatedProfile) => {
        const response = await updateEmployeeProfile(updatedProfile);
        setProfile(response.data);
        notify(response.message);
        return response.data;
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return {
        profile,
        loading,
        error,
        refetch: fetchProfile,
        saveProfile,
    };
};

export default useProfile;
