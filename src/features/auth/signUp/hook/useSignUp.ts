import {useState} from 'react';
import {registerUser} from '../model/registrationUser';
import { useAuth, useDatabase } from '@/provider';

export const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {reloadState, updateRole} = useAuth();
    const database = useDatabase();
    const signUp = async (
        email: string,
        password: string,
        username: string,
    ) => {
        setLoading(true);
        setError(null);
        try {
            await registerUser(email, password, username, database);
            await reloadState();
            await updateRole();
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return {signUp, loading, error};
};
