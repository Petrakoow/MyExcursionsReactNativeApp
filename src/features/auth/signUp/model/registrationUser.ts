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
import {addUser, AuthorizedUser} from '@/entities/user/model';
import {useDatabase} from '@/app/providers';
import {LENGTH_DEFAULT_PROFILE_PREFIX} from '@/shared/config/constants';
import Realm from 'realm';
export const registerUser = async (
    email: string,
    password: string,
    username: string,
    database: Realm,
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

    addUser(database, {
        userId: uid,
        username: newUser.username,
        name: newUser.createName(LENGTH_DEFAULT_PROFILE_PREFIX),
        email: newUser.email,
        role: newUser.role,
    });

    await auth().signInWithEmailAndPassword(email, password);
};
