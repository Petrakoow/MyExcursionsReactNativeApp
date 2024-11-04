export enum RolesEnum {
    GUEST,
    USER,
    ADMIN,
}

export interface UserInterface {
    uid?: string;
    email?: string;
    username: string;
    role: RolesEnum;
}

export class User implements UserInterface {
    protected _uid?: string;
    protected _email?: string;
    protected _username: string;
    protected _role: RolesEnum;

    constructor(
        username: string,
        role: RolesEnum,
        uid?: string,
        email?: string,
    ) {
        this._uid = uid;
        this._email = email;
        this._username = username;
        this._role = role;
    }

    get uid(): string | undefined {
        return this._uid;
    }

    set uid(value: string | undefined) {
        if (value) {
            this._uid = value;
        } else {
            throw new Error('UID cannot be empty for authenticated users');
        }
    }

    get email(): string | undefined {
        return this._email;
    }

    set email(value: string | undefined) {
        if (value && value.includes('@')) {
            this._email = value;
        } else {
            throw new Error('Invalid email format');
        }
    }

    // Геттер и сеттер для username
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

