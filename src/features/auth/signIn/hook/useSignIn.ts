import { useState } from 'react';
import { loginUser } from '../model/loginUser';

export const useSignIn = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signIn = async (emailOrUsername: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const user = await loginUser(emailOrUsername, password);
            return user;
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { signIn, loading, error };
};
