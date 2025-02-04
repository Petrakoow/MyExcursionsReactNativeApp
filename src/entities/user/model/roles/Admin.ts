import {User, RolesEnum} from './User';

export class Admin extends User {
    constructor(uid: string, username: string) {
        super(username, RolesEnum.ADMIN);
    }
}
