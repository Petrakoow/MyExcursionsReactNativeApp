export enum RolesEnum {
    UNKNOWN,
    GUEST,
    USER,
    ADMIN,
}

export interface UserInterface {
    uid?: string;
    username: string;
    role: RolesEnum;
}

export class User implements UserInterface {
    protected _username: string;
    protected _role: RolesEnum;

    constructor(username: string, role: RolesEnum) {
        this._username = username;
        this._role = role;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        if (value.trim().length > 0) {
            this._username = value;
        } else {
            throw new Error('Username cannot be empty');
        }
    }

    get role(): RolesEnum {
        return this._role;
    }

    set role(value: RolesEnum) {
        if (Object.values(RolesEnum).includes(value)) {
            this._role = value;
        } else {
            throw new Error('Invalid role');
        }
    }
}
