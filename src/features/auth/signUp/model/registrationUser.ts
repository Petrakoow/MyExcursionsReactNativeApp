import {
    setDoc,
    doc,
    collection,
    query,
    where,
    getDocs,
    auth,
    firestore,
} from '@/shared/api/firebase';

export const registerUser = async (
    email: string,
    password: string,
    username: string,
) => {
    const usersRef = collection(firestore(), 'users');
    const usernameQuery = query(usersRef, where('username', '==', username));
    const querySnapshot = await getDocs(usernameQuery);

    if (!querySnapshot.empty) {
        throw new Error('Username already exists');
    }

    const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
    );
    const {uid} = userCredential.user;

    await setDoc(doc(firestore(), 'users', uid), {username, email});
    console.log('User data saved to Firestore');

    return uid;
};
