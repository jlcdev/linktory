import { PrismaClient } from "@prisma/client"
import IUser from "@interfaces/user/IUser"
import IUserRepository from "@interfaces/user/IUserRepository"

export default class UserRepository implements IUserRepository
{

    constructor(
        private readonly prisma:PrismaClient
    ){}

    async findById(userId:string):Promise<IUser|null>
    {
        try {
            const user:IUser|null = await this.prisma.user.findUnique({where:{id:userId}})
            return user
        } catch (error) {
            return null
        }
    }

    async findByEmail(email: string):Promise<IUser|null>
    {
        try {
            const user:IUser|null = await this.prisma.user.findUnique({ where:{ email } })
            return user
        } catch (error) {
            return null
        }
    }

    async create(email: string, password: string, isAdmin: boolean):Promise<IUser|null>
    {
        try {
            const user:IUser = await this.prisma.user.create({
                data:{
                    email,
                    password,
                    isAdmin
                }
            })
            return user
        } catch (error) {
            return null
        }
    }
    
}
