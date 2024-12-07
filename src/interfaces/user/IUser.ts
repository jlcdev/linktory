export default interface IUser
{
    readonly id:string,
    readonly email:string,
    readonly password?:string,
    readonly isAdmin:boolean,
    readonly createdAt:Date,
    readonly updatedAt:Date
}