import {useState} from 'react';
import {loginAsGuest} from '../model/loginAsGuest';
import {useAuth} from '@/provider';

export const useSignGuestIn = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {reloadState, updateRole} = useAuth();

    const signInAsGuest = async () => {
        setLoading(true);
        setError(null);
        try {
            await loginAsGuest();
            await reloadState();
            await updateRole();
        } catch (err) {
            console.log(err);
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return {signInAsGuest, loading, error};
};
