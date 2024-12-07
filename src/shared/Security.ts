import ISecurity from "@interfaces/shared/ISecurity"
import bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

export default class Security implements ISecurity
{
    createJWT(userId: string, secret: string, options: object):string
    {
        const token:string = jwt.sign({'sub':userId}, secret, options)
        return token
    }

    verifyJWT(token: string, secret: string):string|null
    {
        try {
            const payload = jwt.verify(token, secret)
            if(payload.sub === undefined) throw new Error('sub not found in token')
            return payload.sub.toString()
        } catch (error) {
            return null
        }
    }

    async generateSalt(rounds: number):Promise<string>
    {
        return await bcrypt.genSalt(rounds)
    }

    async createHash(plainPassword: string, salt: string):Promise<string>
    {
        const hashedPassword:string = await bcrypt.hash(plainPassword, salt)
        return hashedPassword
    }

    async compareHash(plainPassword: string, hashPassword: string):Promise<boolean>
    {
        const result:boolean = await bcrypt.compare(plainPassword, hashPassword)
        return result
    }
    
}
