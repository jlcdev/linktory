export default interface ISecurity
{
    createJWT(userId:string, secret:string, options:object):string
    verifyJWT(token:string, secret:string):string|null
    generateSalt(rounds:number):Promise<string>
    createHash(plainPassword:string, salt:string):Promise<string>
    compareHash(plainPassword:string, hashPassword:string):Promise<boolean>
}