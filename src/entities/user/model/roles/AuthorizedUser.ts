import {User, RolesEnum} from './User';

export class AuthorizedUser extends User {
    constructor(uid: string, email: string, username: string) {
        super(username, RolesEnum.USER, uid, email);
    }
}
