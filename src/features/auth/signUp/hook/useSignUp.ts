import {useState} from 'react';
import {registerUser} from '../model/registrationUser';

export const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signUp = async (
        email: string,
        password: string,
        username: string,
    ) => {
        setLoading(true);
        setError(null); 
        try {
            const uid = await registerUser(email, password, username);
            return uid;
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return {signUp, loading, error};
};
