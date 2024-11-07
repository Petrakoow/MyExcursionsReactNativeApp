import {useEffect, useState} from 'react';
import {auth, firestore, doc, getDoc} from '@/shared/api/firebase';
import {RolesEnum, User} from '@/entities/user/model';
import {createUserByRole} from '@/entities/user/model';

type AuthState = {
    user: User | null;
    role: RolesEnum;
    loading: boolean;
    setRole: (role: RolesEnum) => void;
};

export const useAuthStateListener = (): AuthState => {
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

    return {user, role, loading, setRole};
};
