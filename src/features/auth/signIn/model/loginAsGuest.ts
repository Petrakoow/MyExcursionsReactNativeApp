import {auth} from '@/shared/api/firebase/firebase';

export const loginAsGuest = async () => {
    try {
        await auth().signInAnonymously();
    } catch (error) {
        throw new Error('Failed to login as guest');
    }
};
