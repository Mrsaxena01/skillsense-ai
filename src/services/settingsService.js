
import { orgSettings } from '../mock/settings.mock';

let settings = { ...orgSettings };

export async function fetchSettings() {
    await new Promise((r) => setTimeout(r, 300));
    return settings;
}

export async function updateSettings(updates) {
    await new Promise((r) => setTimeout(r, 300));
    settings = { ...settings, ...updates };
    return settings;
}
