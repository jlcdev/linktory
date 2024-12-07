import IUser from "./IUser"

export default interface IUserRepository
{
    findById(userId:string):Promise<IUser|null>
    findByEmail(email:string):Promise<IUser|null>
    create(email:string, password:string, isAdmin:boolean):Promise<IUser|null>
}