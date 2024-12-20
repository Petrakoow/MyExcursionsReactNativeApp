import {User, RolesEnum} from './User';

export class Guest extends User {
    constructor() {
        super('guest', RolesEnum.GUEST);
    }
}
