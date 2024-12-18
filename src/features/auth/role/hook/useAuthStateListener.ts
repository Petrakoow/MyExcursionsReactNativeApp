import {useCallback, useState} from 'react';
import {auth, firestore, doc, getDoc} from '@/shared/api/firebase';
import {RolesEnum} from '@/entities/user/model';
import {saveUserSession} from '@/shared/db/models/user';
import {FIRESTORE_AUTH_DB, UNAUTHORIZED_USER} from '@/shared/config/constants';

type AuthState = {
    loading: boolean;
    reloadState: () => Promise<void>;
};

export const useAuthStateListener = (): AuthState => {
    const [loading, setLoading] = useState(true);
    const reloadState = useCallback(async () => {
        try {
            setLoading(true);
            const authUser = auth().currentUser;
            if (authUser) {
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
                }
            } else {
                saveUserSession({
                    userId: UNAUTHORIZED_USER,
                    username: UNAUTHORIZED_USER,
                    role: RolesEnum.GUEST,
                });
            }
        } catch (error) {
            throw new Error(
                `Error in reloadState: ${(error as Error).message}`,
            );
        } finally {
            setLoading(false);
        }
    }, []);

    return {loading, reloadState};
};
