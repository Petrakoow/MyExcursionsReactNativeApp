import React, { createContext, ReactNode, useEffect } from 'react';
import { SplashScreen } from '@/shared/ui/splashScreen';
import { useAuthStateListener } from '../../hook/useAuthStateListener';
import { ErrorText } from '@/shared/ui/errorText';

export const AuthContext = createContext({
    reloadState: async () => {},
});

type RoleProviderType = {
    children: ReactNode;
};

export const RoleProvider = (props: RoleProviderType) => {
    const { children } = props;

    const { loading, reloadState, error } = useAuthStateListener();

    useEffect(() => {
        reloadState();
    }, [reloadState]);

    if (error) {
        return (
            <ErrorText
                title="RoleProvider Error"
                description={(error as Error).message}
            />
        );
    }

    if (loading) {
        return (
            <SplashScreen titleIndicator="Добро пожаловать, загружаем вашего личного гида..." />
        );
    }

    return (
        <AuthContext.Provider value={{ reloadState }}>
            {children}
        </AuthContext.Provider>
    );
};
