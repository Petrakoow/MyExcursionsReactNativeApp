import {auth, firestore} from '@/shared/api/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {collection, query, where, getDocs} from 'firebase/firestore';

export const loginUser = async (emailOrUsername: string, password: string) => {
    if (emailOrUsername.includes('@')) {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            emailOrUsername,
            password,
        );
        return userCredential.user;
    } else {
        const userQuery = query(
            collection(firestore, 'users'),
            where('username', '==', emailOrUsername),
        );
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
            const email = userSnapshot.docs[0].data().email;
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            return userCredential.user;
        } else {
            throw new Error('User not found');
        }
    }
};
