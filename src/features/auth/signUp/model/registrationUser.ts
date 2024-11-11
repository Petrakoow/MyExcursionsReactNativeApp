import {
    auth,
    firestore,
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
} from '@/shared/api/firebase';
import {AuthorizedUser} from '@/entities/user/model';
import {useAuth} from '@/features/auth/role';

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

    const newUser = new AuthorizedUser(uid, email, username);

    await setDoc(doc(firestore(), 'users', uid), {
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
    });

    await auth().signInWithEmailAndPassword(email, password);
};
