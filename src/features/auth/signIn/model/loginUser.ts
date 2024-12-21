import {
    auth,
    firestore,
    collection,
    query,
    where,
    getDocs,
    getDoc,
    doc,
} from '@/shared/api/firebase/firebase';

export const loginUser = async (emailOrUsername: string, password: string) => {
    let userCredential;
    try {
        if (emailOrUsername.includes('@')) {
            userCredential = await auth().signInWithEmailAndPassword(
                emailOrUsername,
                password,
            );
        } else {
            const userQuery = query(
                collection(firestore(), 'users'),
                where('username', '==', emailOrUsername),
            );
            const userSnapshot = await getDocs(userQuery);
            if (userSnapshot.empty) {
                throw new Error('User not found');
            }
            const email = userSnapshot.docs[0].data().email;
            userCredential = await auth().signInWithEmailAndPassword(
                email,
                password,
            );
        }
    } catch {
        throw new Error('Authentication failed - firebase');
    }

    const {uid} = userCredential.user;
    const userDoc = await getDoc(doc(firestore(), 'users', uid));
    const userData = userDoc.data();

    if (!userData) {
        throw new Error('User data not found');
    }
};
