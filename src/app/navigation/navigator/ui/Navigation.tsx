import React from 'react';
import {UserStack} from '@/app/providers';
import {UnknownStack} from '@/app/providers';
import {useAuth} from '@/provider'; // Import the new useAuth hook
import {RolesEnum} from '@/entities/user/model';
import {CustomIndicator} from '@/shared/ui/customIndicator';

export const AppNavigator = () => {
    const {role, loading} = useAuth();

    if (loading) {
        return <CustomIndicator />;
    }
    switch (role) {
        case RolesEnum.GUEST:
        case RolesEnum.USER:
            return <UserStack />;
        default:
            return <UnknownStack />;
    }
};
