import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const auth = getAuth();
const firestore = getFirestore();

export const useResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const resetPassword = async (emailOrUsername: string) => {
        setLoading(true);
        setError(null);

        try {
            let email = emailOrUsername;

            if (!emailOrUsername.includes('@')) {
                const usersRef = collection(firestore, 'users');
                const q = query(usersRef, where('username', '==', emailOrUsername));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    throw new Error('User not found');
                }
                
                email = querySnapshot.docs[0].data().email;
            }

            await sendPasswordResetEmail(auth, email);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { resetPassword, loading, error };
};
