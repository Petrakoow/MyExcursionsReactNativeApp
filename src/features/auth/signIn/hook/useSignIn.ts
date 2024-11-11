import {useState} from 'react';
import {loginUser} from '../model/loginUser';
import {useAuth} from '@/features/auth/role';

export const useSignIn = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {reloadState} = useAuth();
    const signIn = async (emailOrUsername: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            await loginUser(emailOrUsername, password);
            await reloadState();
        } catch (err) {
            console.log(err);
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return {signIn, loading, error};
};
