import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {RolesEnum, User} from '@/entities/user/model';
import {SplashScreen} from '@/shared/ui/splashScreen';
import {useAuthStateListener} from '../../hook/useAuthStateListener';

type AuthContextType = {
    user: User | null;
    role: RolesEnum;
    setRole: (role: RolesEnum) => void;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    role: RolesEnum.GUEST,
    setRole: () => {},
});

export const RoleProvider = ({children}: {children: ReactNode}) => {
    const {user, role, loading, setRole} = useAuthStateListener();
    
    if (loading) {
        return (
            <SplashScreen titleIndicator="Welcome to the tourism app, wait a minute..." />
        );
    }

    return (
        <AuthContext.Provider value={{user, role, setRole}}>
            {children}
        </AuthContext.Provider>
    );
};
