import {useState} from 'react';
import {registerUser} from '../model/registrationUser';
import {useAuth} from '@/features/auth/role';

export const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {reloadState} = useAuth();

    const signUp = async (
        email: string,
        password: string,
        username: string,
    ) => {
        setLoading(true);
        setError(null);
        try {
            await registerUser(email, password, username);
            await reloadState();
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return {signUp, loading, error};
};
