import {useEffect, useState} from 'react';
import {formatPhoneNumber} from '@/shared/utils';
import {getUser, updateUser} from '@/entities/user/model';
import Realm from 'realm';
import {UserSessionType} from '@/shared/db/models/user';
import { userStatus } from '@/entities/status';

type InitialValuesType = {
    name: string;
    phone: string;
};

type UseContactDataType = {
    session: UserSessionType;
    database: Realm;
};

export const useContactData = ({session, database}: UseContactDataType) => {
    const [initialValues, setInitialValues] = useState<InitialValuesType>({
        name: '',
        phone: '',
    });
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const userId = session?.userId;
        if (userId) {
            const user = getUser(database, userId);
            if (user) {
                setInitialValues({
                    name: user.name || '',
                    phone: user.phoneNumber || '',
                });
            }
        }
    }, [database, session?.userId]);

    const handleSubmit = (values: InitialValuesType) => {
        const formattedPhone = formatPhoneNumber(values.phone);
        console.log('Сохраненные данные:', {
            name: values.name,
            phone: formattedPhone,
        });

        const userId = session?.userId;

        if (userId) {
            updateUser(database, userId, {
                name: values.name,
                phoneNumber: formattedPhone,
            });
            setIsSuccess(true);
            userStatus(database, userId);
        }
    };

    return {
        initialValues,
        isSuccess,
        setIsSuccess,
        handleSubmit,
    };
};
