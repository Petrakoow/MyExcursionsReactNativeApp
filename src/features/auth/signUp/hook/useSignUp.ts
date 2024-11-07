import {useState} from 'react';
import {registerUser} from '../model/registrationUser';
import {auth} from '@/shared/api/firebase';
import {useAuth} from '@/features/auth/role';
export const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {setRole, user} = useAuth();

    const signUp = async (
        email: string,
        password: string,
        username: string,
    ) => {
        setLoading(true);
        setError(null);
        try {
            const newUser = await registerUser(email, password, username);
            if (newUser) {
                await auth().signInWithEmailAndPassword(email, password);
                setRole(newUser.role);
            }
            return user;
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return {signUp, loading, error};
};
