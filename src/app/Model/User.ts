export class User{
    userName:string;
    password:string;
    email:string;
    id:string;
    userRoles:UserRole[];
}

export class UserRole
{
    idRole:number;
    idUser:number;
    role:Role;
}

export class Role
{
    name:string;
}