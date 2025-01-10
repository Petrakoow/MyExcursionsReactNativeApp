import {useCallback, useState} from 'react';
import {auth, firestore, doc, getDoc} from '@/shared/api/firebase/firebase';
import {RolesEnum} from '@/entities/user/model';
import {saveUserSession} from '@/shared/db/models/user';
import {FIRESTORE_AUTH_DB, UNKNOWN_USER} from '@/shared/config/constants';

type AuthState = {
    loading: boolean;
    error: Error | null;
    reloadState: () => Promise<void>;
};

export const useAuthStateListener = (): AuthState => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const reloadState = useCallback(async () => {
        try {
            setLoading(true);
            const authUser = auth().currentUser;
            if (authUser?.isAnonymous) {
                saveUserSession({
                    userId: authUser.uid,
                    username: 'Guest',
                    role: RolesEnum.GUEST,
                });
            } else if (authUser) {
                const userDoc = await getDoc(
                    doc(firestore(), FIRESTORE_AUTH_DB, authUser.uid),
                );
                const userData = userDoc.data();
                if (userData) {
                    saveUserSession({
                        userId: authUser.uid,
                        username: userData.username,
                        role: userData.role as RolesEnum,
                    });
                } else {
                    throw new Error('Authenticated user data not found');
                }
            } else {
                saveUserSession({
                    userId: UNKNOWN_USER,
                    username: UNKNOWN_USER,
                    role: RolesEnum.UNKNOWN,
                });
            }
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    return {loading, error, reloadState};
};
