import React, {createContext, useContext, useEffect, useState} from 'react';
import {RolesEnum} from '@/entities/user/model';
import {useAuthStateListener} from '../hook/useAuthStateListener';
import {getUserSession} from '@/shared/db/models/user';

type AuthContextType = {
    role: RolesEnum;
    loading: boolean;
    reloadState: () => Promise<void>;
    updateRole: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({children}: AuthProviderProps) => {
    const {loading, reloadState} = useAuthStateListener();
    const [role, setRole] = useState<RolesEnum>(RolesEnum.GUEST);

    const updateRole = async () => {
        await reloadState();
        const session = getUserSession();
        if (session) {
            setRole(session.role);
        } else {
            throw new Error('No session available for the current user');
        }
    };

    useEffect(() => {
        updateRole();
    }, [reloadState]);

    return (
        <AuthContext.Provider value={{role, loading, reloadState, updateRole}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};
