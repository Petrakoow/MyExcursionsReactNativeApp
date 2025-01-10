import {RolesEnum} from '@/entities/user/model';
import {getUserSession} from '@/shared/db/models/user/shared/userSession';
import {screens} from './screens';

export const filterScreensByRole = () => {
    const session = getUserSession();
    const userRole = session?.role ?? RolesEnum.GUEST;
    return screens.filter(screen => screen.roles.includes(userRole));
};
