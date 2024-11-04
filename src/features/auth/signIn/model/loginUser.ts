import {
    auth,
    firestore,
    collection,
    query,
    where,
    getDocs,
} from '@/shared/api/firebase';

export const loginUser = async (emailOrUsername: string, password: string) => {
    if (emailOrUsername.includes('@')) {
        const userCredential = await auth().signInWithEmailAndPassword(
            emailOrUsername,
            password,
        );
        return userCredential.user;
    } else {
        const userQuery = query(
            collection(firestore(), 'users'),
            where('username', '==', emailOrUsername),
        );
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
            const email = userSnapshot.docs[0].data().email;
            const userCredential = await auth().signInWithEmailAndPassword(
                email,
                password,
            );
            return userCredential.user;
        } else {
            throw new Error('User not found');
        }
    }
};
