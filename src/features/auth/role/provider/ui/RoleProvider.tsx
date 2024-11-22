import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {RolesEnum, User} from '@/entities/user/model';
import {SplashScreen} from '@/shared/ui/splashScreen';
import {useAuthStateListener} from '../../hook/useAuthStateListener';
import {UserSessionType} from '@/shared/db/models/user';
import {ErrorText} from '@/shared/ui/errorText';

export const AuthContext = createContext({
    reloadState: async () => {},
});

type RoleProviderType = {
    children: ReactNode;
};

export const RoleProvider = (props: RoleProviderType) => {
    const {children} = props;
    try {
        const {loading, reloadState} = useAuthStateListener();
        useEffect(() => {
            reloadState();
        }, [reloadState]);

        if (loading) {
            return (
                <SplashScreen titleIndicator="Добро пожаловать, загружаем вашего личного гида..." />
            );
        }

        return (
            <AuthContext.Provider value={{reloadState}}>
                {children}
            </AuthContext.Provider>
        );
    } catch (error) {
        <ErrorText
            title="RoleProvider Error"
            description={(error as Error).message}
        />;
    }
};
