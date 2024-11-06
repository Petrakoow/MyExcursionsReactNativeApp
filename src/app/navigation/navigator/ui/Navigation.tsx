import {UserStack} from '@/app/providers';
import {GuestStack} from '@/app/providers';
import {RolesEnum} from '@/entities/user/model';
import {useAuth} from '@/features/auth/role';
export const AppNavigator = () => {
    const {role} = useAuth();

    switch (role) {
        // case RolesEnum.ADMIN:
        //     return <AdminStack />;
        case RolesEnum.USER:
            return <UserStack />;
        default:
            return <GuestStack />;
    }
};
