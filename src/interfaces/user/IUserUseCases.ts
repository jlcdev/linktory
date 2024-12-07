import IUser from "./IUser"

export interface IUserUseCaseGetByEmail
{
    getByEmail(email:string):Promise<IUser|null>
}

export interface IUserUseCaseGetById
{
    getById(userId:string):Promise<IUser|null>
}

export interface IUserUseCaseLogin
{
    login(email:string, password:string):Promise<IUser|null>
}

export interface IUserUseCaseRegister
{
    register(email:string, password:string):Promise<IUser|null>
}