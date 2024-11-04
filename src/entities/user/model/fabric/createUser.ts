import {RolesEnum, User} from '../roles/User';
import {Admin} from '../roles/Admin';
import {AuthorizedUser} from '../roles/AuthorizedUser';

export const createUserByRole = (
    uid: string,
    email: string,
    username: string,
    role: RolesEnum,
): User => {
    switch (role) {
        case RolesEnum.ADMIN:
            return new Admin(uid, email, username);
        case RolesEnum.USER:
            return new AuthorizedUser(uid, email, username);
        default:
            return new User(uid, role, username, email);
    }
};
