import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {auth, firestore, doc, getDoc} from '@/shared/api/firebase';
import {RolesEnum, User} from '@/entities/user/model';
import {SplashScreen} from '@/shared/ui/splashScreen';
import {createUserByRole} from '@/entities/user/model';

interface AuthContextType {
    user: User | null;
    role: RolesEnum;
    setRole: (role: RolesEnum) => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    role: RolesEnum.GUEST,
    setRole: () => {},
});

export const RoleProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<RolesEnum>(RolesEnum.GUEST);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async authUser => {
            if (authUser) {
                const userDoc = await getDoc(
                    doc(firestore(), 'users', authUser.uid),
                );
                const userData = userDoc.data();
                if (userData) {
                    setUser(
                        createUserByRole(
                            authUser.uid,
                            userData.email,
                            userData.username,
                            userData.role,
                        ),
                    );
                    setRole(userData.role as RolesEnum);
                }
            } else {
                setUser(null);
                setRole(RolesEnum.GUEST);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

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
