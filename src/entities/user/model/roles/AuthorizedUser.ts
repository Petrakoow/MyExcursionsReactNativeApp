import { generateRandomString } from '@/shared/utils';
import {User, RolesEnum} from './User';

export class AuthorizedUser extends User {
    protected _uid: string;
    private _email: string;
    constructor(uid: string, email: string, username: string) {
        super(username, RolesEnum.USER);
        this._email = email;
        this._uid = uid;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        if (value && value.includes('@')) {
            this._email = value;
        } else {
            throw new Error('Invalid email format');
        }
    }
    get uid(): string {
        return this._uid;
    }

    set uid(value: string) {
        if (value) {
            this._uid = value;
        } else {
            throw new Error('UID cannot be empty for authenticated users');
        }
    }

    public createName(length: number) {
        const rolePrefix = RolesEnum[this.role].toString().toLowerCase();
        const randomId = generateRandomString(length); 

        return `${rolePrefix}_${randomId}`;
    }
}
