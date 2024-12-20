import React from 'react';
import {useEffect, useState} from 'react';
import {UserStack} from '@/app/providers';
import {GuestStack} from '@/app/providers';
import {RolesEnum} from '@/entities/user/model';
import {getUserSession} from '@/shared/db/models/user';

export const AppNavigator = () => {
    const [role, setRole] = useState<RolesEnum | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const session = getUserSession();
        if (session) {
            setRole(session.role);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return null;
    }

    switch (role) {
        case RolesEnum.USER:
            return <UserStack />;
        default:
            return <GuestStack />;
    }
};
