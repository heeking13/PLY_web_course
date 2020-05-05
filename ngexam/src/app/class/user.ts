export class User {
    _id?: string;
    username: string;
    password?: string;
    sex: number;
    info?: string;
    exam: string[];
    lastTime: number;
    loginCount: number;
    auth: string;
}
//user information
export class UserInfo {
    _id: string;
    username: string;
    auth: string;
    token: string;
}

//login information
export class loginUser {
    username: string;
    password: string;
    auth: string;
    remember: boolean;
}

export class UpdateUser {
    _id: string;
    info?: string;
    password?: string;
    sex: number;
    auth: string;
}

export class AddUser {
    username: string;
    sex: number;
    password: string;
    info: string;
    date: number;
    auth: string;
}