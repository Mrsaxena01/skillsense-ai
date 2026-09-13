
import { useCallback, useEffect, useState } from 'react';
import { fetchSettings, updateSettings } from '../services/settingsService';

export function useSettings() {
    const [settings, setSettings] = useState(null);
    const [status, setStatus] = useState('loading');
    const [saving, setSaving] = useState(false);

    const load = useCallback(() => {
        setStatus('loading');
        fetchSettings().then((data) => {
            setSettings(data);
            setStatus('success');
        });
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const save = async (updates) => {
        setSaving(true);
        try {
            const result = await updateSettings(updates);
            setSettings(result);
            return true;
        } finally {
            setSaving(false);
        }
    };

    return { settings, status, saving, save };
}
