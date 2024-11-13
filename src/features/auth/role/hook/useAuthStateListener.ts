import {useCallback, useState} from 'react';
import {auth, firestore, doc, getDoc} from '@/shared/api/firebase';
import {RolesEnum} from '@/entities/user/model';
import {UserSessionType} from '@/shared/db/models/user';

import {
    getUserSession,
    saveUserSession,
    clearUserSession,
} from '@/shared/db/models/user';
import {UNAUTHORIZED_USER} from '@/shared/config/constants';

type AuthState = {
    loading: boolean;
    getSessionState: () => Promise<UserSessionType | null>;
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
                    doc(firestore(), 'users', authUser.uid),
                );
                const userData = userDoc.data();
                if (userData) {
                    console.log(userData);
                    await saveSessionState(
                        authUser.uid,
                        userData.role as RolesEnum,
                    );
                    console.log('User session saved:', await getSessionState());
                }
            } else {
                await saveSessionState(UNAUTHORIZED_USER, RolesEnum.GUEST);
            }
        } catch (error) {
            throw new Error(`Error in reloadState: ${(error as Error).message}`)
        } finally {
            setLoading(false);
        }
    }, []);

    const saveSessionState = async (userId: string, role: RolesEnum) => {
        await saveUserSession({userId, role});
    };

    const getSessionState = async () => {
        const session = await getUserSession();
        return session || null;
    };

    const clearSessionState = async () => {
        try {
            await clearUserSession();
            console.log('Session state cleared');
        } catch (error) {
            console.error('Error clearing session state:', error);
        }
    };

    return {loading, reloadState, getSessionState};
};
