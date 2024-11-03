import { auth, firestore } from '@/shared/api/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const registerUser = async (email: string, password: string, username: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { uid } = userCredential.user!;
    
    await setDoc(doc(firestore, 'users', uid), { username, email });
    
    return uid;
};