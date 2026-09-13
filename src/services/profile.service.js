import { employeeProfile } from '../mock/profile.mock';

export const getEmployeeProfile = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return employeeProfile;
};

export const updateEmployeeProfile = async (updatedProfile) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    Object.assign(employeeProfile, updatedProfile, {
        personal: { ...employeeProfile.personal, ...updatedProfile.personal },
        professional: {
            ...employeeProfile.professional,
            ...updatedProfile.professional,
        },
        education: {
            ...employeeProfile.education,
            ...updatedProfile.education,
        },
        learning: { ...employeeProfile.learning, ...updatedProfile.learning },
    });

    return {
        success: true,
        message: 'Profile updated successfully',
        data: employeeProfile,
    };
};
