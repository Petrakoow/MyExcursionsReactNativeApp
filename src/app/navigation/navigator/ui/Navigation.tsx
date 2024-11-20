import {useEffect, useState} from 'react';
import {UserStack} from '@/app/providers';
import {GuestStack} from '@/app/providers';
import {RolesEnum} from '@/entities/user/model';
import {useAuth} from '@/features/auth/role';
import {SplashScreen} from '@/shared/ui/splashScreen';
import {CustomIndicator} from '@/shared/ui/customIndicator';
import {styles} from './NavigationStyle';

export const AppNavigator = () => {
    const {getSessionState} = useAuth();
    const [role, setRole] = useState<RolesEnum | null>(null);

    useEffect(() => {
        const loadSession = async () => {
            const session = await getSessionState();
            setRole(session?.role || RolesEnum.GUEST);
        };

        loadSession();
    }, [getSessionState]);

    if (role === null) {
        return <CustomIndicator style={styles.indicator} />;
    }

    switch (role) {
        // case RolesEnum.ADMIN:
        //     return <AdminStack />;
        case RolesEnum.USER:
            return <UserStack />;
        default:
            return <GuestStack />;
    }
};
